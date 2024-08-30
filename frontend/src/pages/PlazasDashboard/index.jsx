import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getOneAdminUser } from '../../services/userServices';
import useUsersContext from '../../hooks/useUsersContext';
import { MdAdminPanelSettings } from 'react-icons/md';
import PlazasGrid from '../../components/PlazasGrid';
import useGlobalContext from '../../hooks/useGlobalContext';

const PlazasDashboard = () => {
	const { id } = useParams();
	const { showModal } = useGlobalContext();
	const { userAdmin, setUserAdmin } = useUsersContext();

	const fetchUsers = async () => {
		const res = await getOneAdminUser(id);
		setUserAdmin(res);
	};

	useEffect(() => {
		fetchUsers();
	}, [id]);

	const handleAddPlaza = () => {
		showModal({
			title: 'Agregar plazas',
			children: null,
		});
	};

	return (
		<section className='px-4 py-2 text-primary'>
			<h4 className='d-flex align-items-center px-3 mb-3 fw-bold'>
				<MdAdminPanelSettings size={30} /> {userAdmin.name}
			</h4>
			<PlazasGrid data={[]} onClick={handleAddPlaza} />
		</section>
	);
};

export default PlazasDashboard;
