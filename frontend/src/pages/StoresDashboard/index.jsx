import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { MdAdminPanelSettings } from 'react-icons/md';
import { FaChevronCircleRight } from 'react-icons/fa';
import { StoreForm, StoresGrid } from '../../components';
import useUsersContext from '../../hooks/useUsersContext';
import usePlazasContext from '../../hooks/usePlazasContext';
import { getOnePlaza, getStores } from '../../services/plazasService';
import useUiContext from '../../hooks/useUiContext';
import { Button } from 'react-bootstrap';
import PlazaInfo from '../../components/data/PlazaInfo';
import InfoPlazaForm from '../../components/forms/InfoPlazaForm';
const StoresDashboard = () => {
	const { plazaId } = useParams();
	const { showModal } = useUiContext();
	const { userAdmin } = useUsersContext();
	const { plaza, setPlaza, setPlazaToEdit, stores, setStores, setStore } =
		usePlazasContext();

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

	const handleAddInfoPlaza = () => {
		const { bankInfo, adminInfo } = plaza;
		setPlazaToEdit({ ...bankInfo, ...adminInfo });
		showModal({
			title: 'Información de la plaza',
			children: <InfoPlazaForm fetchPlaza={() => fetchPlaza(plazaId)} />,
		});
	};

	return (
		<section className='px-4 py-2 text-primary'>
			<div className='px-4 mb-4'>
				<h4 className='d-flex align-items-center mb-4 fw-bold'>
					<MdAdminPanelSettings size={30} /> {userAdmin.name}{' '}
					<FaChevronCircleRight className='mx-3' />
					{plaza.name}
				</h4>
				<Button onClick={handleAddInfoPlaza}>
					{plaza?.bankInfo ? 'Editar' : 'Agregar'} info adicional de la plaza
				</Button>
				<PlazaInfo plaza={plaza} />
			</div>
			<StoresGrid data={stores} onClick={handleAddStore} />
		</section>
	);
};

export default StoresDashboard;
