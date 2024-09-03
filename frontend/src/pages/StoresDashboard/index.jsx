import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { MdAdminPanelSettings } from 'react-icons/md';
import { FaChevronCircleRight } from 'react-icons/fa';
import { StoreForm, StoresGrid } from '../../components';
import useUsersContext from '../../hooks/useUsersContext';
import usePlazasContext from '../../hooks/usePlazasContext';
import { getOnePlaza, getStores } from '../../services/plazasService';
import useUiContext from '../../hooks/useUiContext';
const StoresDashboard = () => {
	const { plazaId } = useParams();
	const { showModal } = useUiContext();
	const { userAdmin } = useUsersContext();
	const { plaza, setPlaza, stores, setStores, setStore } = usePlazasContext();

	const fetchPlaza = async () => {
		const res = await getOnePlaza(plazaId);
		setPlaza(res);
	};

	const fetchStores = async () => {
		const res = await getStores(plazaId);
		setStores(res);
	};

	useEffect(() => {
		fetchPlaza();
		fetchStores();
		setStore({});
	}, [plazaId]);

	const handleAddStore = () => {
		showModal({
			title: 'Agregar local',
			children: <StoreForm />,
		});
	};

	return (
		<section className='px-4 py-2 text-primary'>
			<h4 className='d-flex align-items-center px-4 mb-3 fw-bold'>
				<MdAdminPanelSettings size={30} /> {userAdmin.name}{' '}
				<FaChevronCircleRight className='mx-3' />
				{plaza.name}
			</h4>
			<StoresGrid data={stores} onClick={handleAddStore} />
		</section>
	);
};

export default StoresDashboard;
