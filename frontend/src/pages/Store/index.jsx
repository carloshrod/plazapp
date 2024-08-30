import { useParams } from 'react-router-dom';
import { FaChevronCircleRight } from 'react-icons/fa';
import { MdAdminPanelSettings } from 'react-icons/md';
import useUsersContext from '../../hooks/useUsersContext';
import usePlazasContext from '../../hooks/usePlazasContext';
import { getOneStore } from '../../services/plazasService';
import { useEffect } from 'react';

const Store = () => {
	const { storeId } = useParams();
	const { userAdmin } = useUsersContext();
	const { plaza, store, setStore } = usePlazasContext();

	const fetchStore = async () => {
		const res = await getOneStore(storeId);
		setStore(res);
	};

	useEffect(() => {
		fetchStore();
	}, []);

	return (
		<section className='px-4 py-2 text-primary'>
			<h4 className='d-flex align-items-center px-3 mb-3 fw-bold'>
				<MdAdminPanelSettings size={30} /> {userAdmin.name}{' '}
				<FaChevronCircleRight className='mx-3' />
				{plaza.name}
			</h4>
			<h3 className='px-3 mb-3 fw-bold'>{store.name}</h3>
		</section>
	);
};

export default Store;
