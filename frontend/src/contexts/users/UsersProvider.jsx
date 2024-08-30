import { useEffect, useState } from 'react';
import UsersContext from './UsersContext';
import { collection } from 'firebase/firestore';
import { db } from '../../config/firebase';
import { getAdminUsers } from '../../services/userServices';

const usersCollectionRef = collection(db, 'users');

const UsersProvider = ({ children }) => {
	const [userAdmins, setUserAdmins] = useState([]);
	const [userAdmin, setUserAdmin] = useState({});

	const fetchUserAdmins = async () => {
		const res = await getAdminUsers(usersCollectionRef);
		setUserAdmins(res);
	};

	useEffect(() => {
		fetchUserAdmins();
	}, []);

	const data = { userAdmins, setUserAdmins, userAdmin, setUserAdmin };

	return <UsersContext.Provider value={data}>{children}</UsersContext.Provider>;
};

export default UsersProvider;
