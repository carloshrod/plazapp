import { useEffect } from 'react';
import { Container } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import { getOneAdminUser } from '../../services/userServices';
import useUsersContext from '../../hooks/useUsersContext';
import { MdAdminPanelSettings } from 'react-icons/md';

const AdminDashboard = () => {
	const { id } = useParams();
	const { userAdmin, setUserAdmin } = useUsersContext();

	const fetchUsers = async () => {
		const res = await getOneAdminUser(id);
		setUserAdmin(res);
	};

	useEffect(() => {
		fetchUsers();
	}, [id]);

	return (
		<>
			<h4 className='d-flex align-items-center px-4 m-4 text-primary fw-bold'>
				<MdAdminPanelSettings size={30} /> {userAdmin.name}
			</h4>
			<Container>
				<h2>Locales</h2>
			</Container>
		</>
	);
};

export default AdminDashboard;
