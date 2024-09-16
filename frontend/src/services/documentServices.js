import {
	addDoc,
	arrayRemove,
	arrayUnion,
	collection,
	deleteDoc,
	doc,
	getDoc,
	getDocs,
	orderBy,
	query,
	serverTimestamp,
	setDoc,
	updateDoc,
	where,
} from 'firebase/firestore';
import { db } from '../config/firebase';
import { generateDocURL, storage } from './fileServices';
import { deleteObject, ref } from 'firebase/storage';
import { GEN_DOCS_DICTIONARY, MONTHS_DICTIONARY } from '../utils/consts';

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
				allowDeleteDocs: [],
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

		let fileData;
		if (file) {
			fileData = await generateDocURL({ file, docType });
		} else {
			console.error(`Error: No hay archivo para procesar.`);
			return;
		}

		const docIndex =
			docType === 'general'
				? GEN_DOCS_DICTIONARY[docName]
				: MONTHS_DICTIONARY[docName];

		await setDoc(
			newDocRef,
			{
				docName,
				docIndex,
				fileUrl: fileData.fileUrl,
				filePath: fileData.filePath,
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
			return { docs: [], allowDeleteDocs: [] };
		}

		const mainDoc = querySnapshot.docs[0];
		const docRef = mainDoc.ref;

		const allowDeleteDocs = mainDoc.data().allowDeleteDocs || [];

		const subcollectionRef = collection(docRef, docType);
		const orderedQuery = query(subcollectionRef, orderBy('docIndex'));

		const subcollectionSnapshot = await getDocs(orderedQuery);

		if (subcollectionSnapshot.empty) {
			return { docs: [], allowDeleteDocs };
		}

		const documents = subcollectionSnapshot.docs.map(doc => ({
			id: doc.id,
			...doc.data(),
		}));

		return {
			docs: documents,
			allowDeleteDocs,
		};
	} catch (error) {
		console.error(
			'Error obteniendo documentos por usuario y subcolección:',
			error
		);
		return [];
	}
};

export const deleteDocumentAndFile = async ({ userId, docType, docId }) => {
	try {
		const generalDocsCollectionRef = collection(db, 'documents');

		const q = query(generalDocsCollectionRef, where('userId', '==', userId));
		const querySnapshot = await getDocs(q);

		if (querySnapshot.empty) {
			console.error(
				`No se encontró ningún documento para el usuario con ID: ${userId}`
			);
			return;
		}

		const docRef = querySnapshot.docs[0].ref;
		const documentRef = doc(docRef, docType, docId);

		const documentSnapshot = await getDoc(documentRef);
		const documentData = documentSnapshot.data();

		const filePath = documentData.filePath;

		if (filePath) {
			const storageRef = ref(storage, filePath);

			await deleteObject(storageRef);
		}

		await deleteDoc(documentRef);
		console.log(
			`Documento con ID: ${docId} eliminado exitosamente de Firestore y su archivo de Storage.`
		);
	} catch (error) {
		console.error('Error al eliminar el documento o el archivo:', error);
	}
};

export const toggleAllowDeleteDocType = async ({ userId, docType }) => {
	try {
		const documentsCollectionRef = collection(db, 'documents');

		const q = query(documentsCollectionRef, where('userId', '==', userId));
		const querySnapshot = await getDocs(q);

		if (querySnapshot.empty) {
			console.error(
				`No se encontró ningún documento para el usuario con ID: ${userId}`
			);
			return;
		}

		const docRef = querySnapshot.docs[0].ref;
		const docData = querySnapshot.docs[0].data();
		const allowDeleteDocs = docData.allowDeleteDocs || [];

		const isDocTypePresent = allowDeleteDocs.includes(docType);

		await updateDoc(docRef, {
			allowDeleteDocs: isDocTypePresent
				? arrayRemove(docType)
				: arrayUnion(docType),
		});

		console.log(
			`El docType: ${docType} ha sido ${
				isDocTypePresent ? 'eliminado de' : 'agregado a'
			} allowDeleteDocs.`
		);
	} catch (error) {
		console.error('Error manipulando el campo allowDeleteDocs:', error);
	}
};
