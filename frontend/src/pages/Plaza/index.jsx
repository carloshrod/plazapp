import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { MdAdminPanelSettings } from 'react-icons/md';
import { FaChevronCircleRight } from 'react-icons/fa';
import { StoreForm, StoresGrid } from '../../components';
import useUsersContext from '../../hooks/useUsersContext';
import usePlazasContext from '../../hooks/usePlazasContext';
import { getOnePlaza, getStores } from '../../services/plazasService';
import useUiContext from '../../hooks/useUiContext';
import { Button, Tab, Tabs } from 'react-bootstrap';
import PlazaInfo from '../../components/data/PlazaInfo';
import InfoPlazaForm from '../../components/forms/InfoPlazaForm';
import PlazaDocs from '../../components/data/PlazaDocs';

const Plaza = () => {
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

	const TAB_ITEMS = [
		{
			value: 'stores',
			label: 'Locales',
			component: <StoresGrid data={stores} onClick={handleAddStore} />,
		},
		{
			value: 'docs',
			label: 'Documentos',
			component: <PlazaDocs adminId={plaza?.adminId} />,
		},
	];

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

			{/* Tabs */}
			<div className='bg-secondary p-2 pb-1 rounded'>
				<Tabs defaultActiveKey='stores' id='plaza-tabs' className='mb-3'>
					{TAB_ITEMS.map(({ value, label, component }) => (
						<Tab key={value} eventKey={value} title={label}>
							{component}
						</Tab>
					))}
				</Tabs>
			</div>
		</section>
	);
};

export default Plaza;
