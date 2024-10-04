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
const storesCollectionRef = collection(db, 'stores');

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

export const addInfoPlaza = async (plazaInfo, plazaId) => {
	try {
		const { accountNumber, ibanKey, bankName, ...rest } = plazaInfo;
		const {
			name,
			rfc,
			businessName,
			deedNumber,
			deedDate,
			notaryOfficeNumber,
			notaryOfficeCity,
			merchInvoice,
		} = rest;
		const bankInfo = { accountNumber, ibanKey, bankName };
		const adminInfo = { ...rest };
		const isSociety = adminInfo?.isSociety;

		const adminInfoData = !isSociety
			? { isSociety, name, rfc }
			: {
					isSociety,
					businessName,
					deedNumber,
					deedDate,
					notaryOfficeNumber,
					notaryOfficeCity,
					merchInvoice,
					isSignerAuthorized: adminInfo?.isSignerAuthorized,
			  };

		const plazaDocRef = doc(db, 'plazas', plazaId);

		await updateDoc(plazaDocRef, {
			bankInfo,
			adminInfo: adminInfoData,
			lastUpdate: serverTimestamp(),
		});
	} catch (error) {
		console.error(error);
	}
};

export const addStore = async (store, plazaId) => {
	try {
		const storeToCreate = {
			...store,
			disabled: false,
			createdAt: serverTimestamp(),
			lastUpdate: serverTimestamp(),
		};
		const storeDocRef = await addDoc(storesCollectionRef, storeToCreate);
		const plazaDocRef = doc(db, 'plazas', plazaId);

		const createdStore = {
			...storeToCreate,
			id: storeDocRef.id,
			plazaId: plazaDocRef.id,
		};
		await updateDoc(doc(storesCollectionRef, storeDocRef.id), createdStore);

		await updateDoc(plazaDocRef, {
			stores: arrayUnion(storeDocRef.id),
		});

		return createdStore;
	} catch (error) {
		console.error(error);
	}
};

export const getStores = async plazaId => {
	try {
		const q = query(
			storesCollectionRef,
			orderBy('createdAt', 'asc'),
			where('plazaId', '==', plazaId)
		);
		const res = await fetchData(q);
		return res;
	} catch (error) {
		console.error(error);
	}
};

export const getOneStore = async storeId => {
	try {
		const docRef = doc(db, 'stores', storeId);
		const docSnap = await getDoc(docRef);
		return docSnap.data();
	} catch (error) {
		console.error(error);
	}
};
