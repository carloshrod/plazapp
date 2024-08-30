import {
	collection,
	doc,
	getDoc,
	orderBy,
	query,
	serverTimestamp,
	setDoc,
	where,
} from 'firebase/firestore';
import { db } from '../config/firebase';
import { fetchData } from '../utils/fetchData';
import axios from 'axios';
import { env } from '../config/env';

const usersCollectionRef = collection(db, 'users');
const { REGISTER_USER_ENDPOINT } = env;

export const addUser = async user => {
	try {
		const res = await axios.post(REGISTER_USER_ENDPOINT, user);
		const { uid } = res.data;

		const userToCreate = {
			...user,
			id: uid,
			role: 'admin',
			plazas: [],
			disabled: false,
			createdAt: serverTimestamp(),
			lastUpdate: serverTimestamp(),
		};

		await setDoc(doc(usersCollectionRef, uid), userToCreate);

		return userToCreate;
	} catch (error) {
		console.error(error);
	}
};

export const getAdminUsers = async ref => {
	try {
		const q = query(
			ref,
			orderBy('createdAt', 'asc'),
			where('role', '==', 'admin')
		);
		const res = await fetchData(q);
		return res;
	} catch (error) {
		console.error(error);
	}
};

export const getOneAdminUser = async userId => {
	try {
		const docRef = doc(db, 'users', userId);
		const docSnap = await getDoc(docRef);
		return docSnap.data();
	} catch (error) {
		console.error(error);
	}
};
