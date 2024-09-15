import {
	addDoc,
	collection,
	doc,
	getDocs,
	query,
	serverTimestamp,
	setDoc,
	where,
} from 'firebase/firestore';
import { db } from '../config/firebase';
import { generateImageURL } from './fileServices';

export const uploadDocument = async ({ userId, file, docName, docType }) => {
	try {
		const documentsCollectionRef = collection(db, 'documents');

		const q = query(documentsCollectionRef, where('userId', '==', userId));
		const querySnapshot = await getDocs(q);
		let docRef;

		if (!querySnapshot.empty) {
			docRef = querySnapshot.docs[0].ref;
		} else {
			docRef = await addDoc(documentsCollectionRef, {
				userId,
			});
			console.log(`Nuevo documento creado con ID: ${docRef.id}`);
		}

		// Subcolección
		const documentsSubcollectionRef = collection(docRef, docType);

		const docNameQuery = query(
			documentsSubcollectionRef,
			where('docName', '==', docName)
		);
		const nameQuerySnapshot = await getDocs(docNameQuery);

		if (!nameQuerySnapshot.empty) {
			console.error(`Error: Ya existe un documento con el nombre ${docName}.`);
			return;
		}

		const newDocRef = doc(documentsSubcollectionRef);
		const docId = newDocRef.id;

		let fileUrl;
		if (file) {
			fileUrl = await generateImageURL({ file, docType });
		} else {
			console.error(`Error: No hay archivo para procesar.`);
			return;
		}

		await setDoc(
			newDocRef,
			{
				docName,
				fileUrl: fileUrl,
				updatedAt: serverTimestamp(),
			},
			{ merge: true }
		);

		console.log(`Documento creado con ID: ${docId}`);
	} catch (error) {
		console.error('Error creating or updating document:', error);
	}
};

export const getDocumentsByUserAndSubcollection = async (userId, docType) => {
	try {
		const generalDocsCollectionRef = collection(db, 'documents');

		const q = query(generalDocsCollectionRef, where('userId', '==', userId));
		const querySnapshot = await getDocs(q);

		if (querySnapshot.empty) {
			console.error(
				`No se encontró ningún documento para el usuario con ID: ${userId}`
			);
			return [];
		}

		const docRef = querySnapshot.docs[0].ref;

		const subcollectionRef = collection(docRef, docType);

		const subcollectionSnapshot = await getDocs(subcollectionRef);

		if (subcollectionSnapshot.empty) {
			console.log(
				`No se encontraron documentos en la subcolección ${docType} para el usuario ${userId}.`
			);
			return [];
		}

		const documents = subcollectionSnapshot.docs.map(doc => ({
			id: doc.id,
			...doc.data(),
		}));

		return documents;
	} catch (error) {
		console.error(
			'Error obteniendo documentos por usuario y subcolección:',
			error
		);
		return [];
	}
};
