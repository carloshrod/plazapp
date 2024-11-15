import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { MdAdminPanelSettings } from 'react-icons/md';
import { PlazasForm, PlazasGrid } from '../../components';
import useUsersContext from '../../hooks/useUsersContext';
import useUiContext from '../../hooks/useUiContext';
import { getOneUser } from '../../services/userServices';
import { getPlazas } from '../../services/plazasService';
import usePlazasContext from '../../hooks/usePlazasContext';

const Admin = () => {
	const { adminId } = useParams();
	const { showModal } = useUiContext();
	const { userAdmin, setUserAdmin } = useUsersContext();
	const { plazas, setPlazas } = usePlazasContext();

	const fetchUser = async () => {
		const res = await getOneUser(adminId);
		setUserAdmin(res);
	};

	const fetchPlazas = async () => {
		const res = await getPlazas(adminId);
		setPlazas(res);
	};

	useEffect(() => {
		fetchUser();
		fetchPlazas();
	}, [adminId]);

	const handleAddPlaza = () => {
		showModal({
			title: 'Agregar plaza',
			children: <PlazasForm />,
		});
	};

	return (
		<section className='px-4 py-2 text-primary'>
			<h4 className='d-flex align-items-center px-3 mb-3 fw-bold'>
				<MdAdminPanelSettings size={30} /> {userAdmin.name}
			</h4>
			<PlazasGrid data={plazas} onClick={handleAddPlaza} />
		</section>
	);
};

export default Admin;
