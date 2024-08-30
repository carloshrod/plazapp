import { signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { auth } from '../config/firebase';

export const signIn = async (email, password) => {
	console.log(email, password);
	return await signInWithEmailAndPassword(auth, email, password);
};

export const logout = async () => {
	await signOut(auth);
};
