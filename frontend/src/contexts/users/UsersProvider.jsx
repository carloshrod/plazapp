import { useEffect, useState } from 'react';
import UsersContext from './UsersContext';
import { getAdminUsers } from '../../services/userServices';

const UsersProvider = ({ children }) => {
	const [userAdmins, setUserAdmins] = useState([]);
	const [userAdmin, setUserAdmin] = useState({});

	const fetchUserAdmins = async () => {
		const res = await getAdminUsers();
		setUserAdmins(res);
	};

	useEffect(() => {
		fetchUserAdmins();
	}, []);

	const dispatchUserAdmins = newUserAdmin => {
		setUserAdmins([...userAdmins, newUserAdmin]);
	};

	const data = {
		userAdmins,
		dispatchUserAdmins,
		userAdmin,
		setUserAdmin,
	};

	return <UsersContext.Provider value={data}>{children}</UsersContext.Provider>;
};

export default UsersProvider;
