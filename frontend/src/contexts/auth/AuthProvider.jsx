import { useEffect, useState } from 'react';
import AuthContext from './authContext';
import { onAuthStateChanged } from 'firebase/auth';
import { auth, db } from '../../config/firebase';
import { doc, getDoc } from 'firebase/firestore';

const AuthProvider = ({ children }) => {
	const [loggedUser, setLoggedUser] = useState(null);
	const [isAuth, setIsAuth] = useState(false);

	useEffect(() => {
		onAuthStateChanged(auth, async currentUser => {
			try {
				if (currentUser) {
					const userDoc = await getDoc(doc(db, 'users', currentUser.uid));
					setLoggedUser(userDoc.data());
					setIsAuth(true);
				} else {
					setLoggedUser(null);
					setIsAuth(false);
				}
			} catch (error) {
				console.error(error.message);
			}
		});
	}, []);

	const data = { isAuth, loggedUser, setLoggedUser };

	return <AuthContext.Provider value={data}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
