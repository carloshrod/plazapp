import {
	addDoc,
	arrayUnion,
	collection,
	doc,
	getDoc,
	orderBy,
	query,
	serverTimestamp,
	updateDoc,
	where,
} from 'firebase/firestore';
import { db } from '../config/firebase';
import { fetchData } from '../utils/fetchData';

const plazasCollectionRef = collection(db, 'plazas');

export const addPlaza = async (plaza, adminId) => {
	try {
		const plazaToCreate = {
			...plaza,
			stores: [],
			disabled: false,
			createdAt: serverTimestamp(),
			lastUpdate: serverTimestamp(),
		};
		const plazaDocRef = await addDoc(plazasCollectionRef, plazaToCreate);
		const userDocRef = doc(db, 'users', adminId);

		const createdPlaza = {
			...plazaToCreate,
			id: plazaDocRef.id,
			adminId: userDocRef.id,
		};
		await updateDoc(doc(plazasCollectionRef, plazaDocRef.id), createdPlaza);

		await updateDoc(userDocRef, {
			plazas: arrayUnion(plazaDocRef.id),
		});

		return createdPlaza;
	} catch (error) {
		console.error(error);
	}
};

export const getPlazas = async adminId => {
	try {
		const q = query(
			plazasCollectionRef,
			orderBy('createdAt', 'asc'),
			where('adminId', '==', adminId)
		);
		const res = await fetchData(q);
		return res;
	} catch (error) {
		console.error(error);
	}
};

export const getOnePlaza = async plazaId => {
	try {
		const docRef = doc(db, 'plazas', plazaId);
		const docSnap = await getDoc(docRef);
		return docSnap.data();
	} catch (error) {
		console.error(error);
	}
};
