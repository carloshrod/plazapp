import {
	EmailAuthProvider,
	reauthenticateWithCredential,
	sendPasswordResetEmail,
	signInWithEmailAndPassword,
	signOut,
	updatePassword,
} from 'firebase/auth';
import { auth, db } from '../config/firebase';
import { doc, serverTimestamp, updateDoc } from 'firebase/firestore';

export const signIn = async ({ email, password }) => {
	return await signInWithEmailAndPassword(auth, email, password);
};

export const logout = async () => {
	await signOut(auth);
};

export const changePassword = async (
	{ currentPassword, newPassword },
	loggedUser
) => {
	try {
		const user = auth.currentUser;
		const credential = EmailAuthProvider.credential(
			user.email,
			currentPassword
		);

		const res = await reauthenticateWithCredential(user, credential);

		if (res.user) {
			await updatePassword(user, newPassword);

			if (!loggedUser.passwordChanged) {
				const userTenantDocRef = doc(db, 'users', loggedUser.id);

				console.log(userTenantDocRef);

				const userTenantToUpdate = {
					passwordChanged: true,
					lastUpdate: serverTimestamp(),
				};

				await updateDoc(userTenantDocRef, userTenantToUpdate);
			}

			await signOut(auth);
		}
	} catch (error) {
		console.error(error);
	}
};

export const resetPassword = async ({ email }) => {
	try {
		await sendPasswordResetEmail(auth, email);
	} catch (error) {
		console.error(error);
	}
};
