import {
	arrayUnion,
	collection,
	doc,
	getDoc,
	orderBy,
	query,
	serverTimestamp,
	setDoc,
	updateDoc,
	where,
} from 'firebase/firestore';
import { db } from '../config/firebase';
import { fetchData } from '../utils/fetchData';
import axios from 'axios';
import { env } from '../config/env';

const usersCollectionRef = collection(db, 'users');
const { REGISTER_USER_ENDPOINT } = env;

export const addUserAdmin = async user => {
	try {
		const res = await axios.post(REGISTER_USER_ENDPOINT, user);
		const { uid } = res.data;

		const userAdminToCreate = {
			...user,
			id: uid,
			role: 'admin',
			plazas: [],
			disabled: false,
			createdAt: serverTimestamp(),
			lastUpdate: serverTimestamp(),
		};

		await setDoc(doc(usersCollectionRef, uid), userAdminToCreate);

		return userAdminToCreate;
	} catch (error) {
		console.error(error);
	}
};

export const getAdminUsers = async () => {
	try {
		const q = query(
			usersCollectionRef,
			orderBy('createdAt', 'asc'),
			where('role', '==', 'admin')
		);
		const res = await fetchData(q);
		return res;
	} catch (error) {
		console.error(error);
	}
};

export const getOneUser = async userId => {
	try {
		const docRef = doc(db, 'users', userId);
		const docSnap = await getDoc(docRef);
		return docSnap.data();
	} catch (error) {
		console.error(error);
	}
};

export const addUserTenant = async (user, storeId) => {
	try {
		const res = await axios.post(REGISTER_USER_ENDPOINT, user);
		const { uid } = res.data;

		const userTenantToCreate = {
			...user,
			id: uid,
			role: 'tenant',
			stores: arrayUnion(storeId),
			disabled: false,
			createdAt: serverTimestamp(),
			lastUpdate: serverTimestamp(),
		};

		await setDoc(doc(usersCollectionRef, uid), userTenantToCreate);

		const storeDocRef = doc(db, 'stores', storeId);
		await updateDoc(storeDocRef, {
			tenantId: uid,
		});

		return userTenantToCreate;
	} catch (error) {
		console.error(error);
	}
};
