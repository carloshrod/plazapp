import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { MdAdminPanelSettings } from 'react-icons/md';
import { FaChevronCircleRight } from 'react-icons/fa';
import { StoresGrid } from '../../components';
import useUsersContext from '../../hooks/useUsersContext';
import usePlazasContext from '../../hooks/usePlazasContext';
import { getOnePlaza } from '../../services/plazasService';
import useUiContext from '../../hooks/useUiContext';

const StoresDashboard = () => {
	const { plazaId } = useParams();
	const { showModal } = useUiContext();
	const { userAdmin } = useUsersContext();
	const { plaza, setPlaza } = usePlazasContext();

	const fetchPlaza = async () => {
		const res = await getOnePlaza(plazaId);
		setPlaza(res);
	};

	useEffect(() => {
		fetchPlaza();
	}, [plazaId]);

	const handleAddStore = () => {
		showModal({
			title: 'Agregar local',
			children: null,
		});
	};

	return (
		<section className='px-4 py-2 text-primary'>
			<h4 className='d-flex align-items-center px-3 mb-3 fw-bold'>
				<MdAdminPanelSettings size={30} /> {userAdmin.name}{' '}
				<FaChevronCircleRight className='mx-3' />
				{plaza.name}
			</h4>
			<StoresGrid data={[]} onClick={handleAddStore} />
		</section>
	);
};

export default StoresDashboard;
