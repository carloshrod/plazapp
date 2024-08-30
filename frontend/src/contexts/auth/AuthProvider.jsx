import { useEffect, useState } from 'react';
import AuthContext from './authContext';
import { onAuthStateChanged } from 'firebase/auth';
import { auth, db } from '../../config/firebase';
import { doc, getDoc } from 'firebase/firestore';

const AuthProvider = ({ children }) => {
	const [isAuth, setIsAuth] = useState(false);
	const [loggedUser, setloggedUser] = useState(null);

	useEffect(() => {
		onAuthStateChanged(auth, async currentUser => {
			try {
				if (currentUser) {
					const userDoc = await getDoc(doc(db, 'users', currentUser.uid));
					setloggedUser(userDoc.data());
					setIsAuth(true);
				} else {
					setIsAuth(false);
				}
			} catch (error) {
				console.error(error.message);
			}
		});
	}, []);

	const data = { isAuth, loggedUser };

	return <AuthContext.Provider value={data}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
