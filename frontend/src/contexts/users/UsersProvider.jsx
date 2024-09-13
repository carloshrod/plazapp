import { useEffect, useState } from 'react';
import UsersContext from './UsersContext';
import { getAdminUsers } from '../../services/userServices';

const UsersProvider = ({ children }) => {
	const [userAdmins, setUserAdmins] = useState([]);
	const [userAdmin, setUserAdmin] = useState({});
	const [userTenant, setUserTenant] = useState({});
	const [userToEdit, setUserToEdit] = useState({});

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
		userTenant,
		setUserTenant,
		userToEdit,
		setUserToEdit,
	};

	return <UsersContext.Provider value={data}>{children}</UsersContext.Provider>;
};

export default UsersProvider;
