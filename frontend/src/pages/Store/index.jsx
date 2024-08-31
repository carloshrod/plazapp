import { useParams } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import { FaChevronCircleRight } from 'react-icons/fa';
import { MdAdminPanelSettings } from 'react-icons/md';
import useUsersContext from '../../hooks/useUsersContext';
import usePlazasContext from '../../hooks/usePlazasContext';
import { getOneStore } from '../../services/plazasService';
import { useCallback, useEffect } from 'react';
import { UserForm } from '../../components';
import useUiContext from '../../hooks/useUiContext';
import { getOneUser } from '../../services/userServices';

const Store = () => {
	const { storeId } = useParams();
	const { showModal } = useUiContext();
	const { userAdmin, userTenant, setUserTenant } = useUsersContext();
	const { plaza, store, setStore } = usePlazasContext();

	const fetchStore = useCallback(async () => {
		const res = await getOneStore(storeId);
		setStore(res);
	}, [storeId, setStore]);

	const fetchUserTenant = useCallback(async () => {
		if (store?.tenantId) {
			const res = await getOneUser(store.tenantId);
			setUserTenant(res);
		} else {
			setUserTenant({});
		}
	}, [store, setUserTenant]);

	useEffect(() => {
		fetchStore();
		fetchUserTenant();
	}, [fetchStore, fetchUserTenant]);

	const handleAddUserTenant = () => {
		showModal({
			title: 'Asignar locatario',
			children: <UserForm />,
		});
	};

	return (
		<section className='px-4 py-2 text-primary'>
			<h4 className='d-flex align-items-center px-3 mb-3 fw-bold'>
				<MdAdminPanelSettings size={30} /> {userAdmin.name}{' '}
				<FaChevronCircleRight className='mx-3' />
				{plaza.name}
			</h4>
			<div className='bg-secondary p-4 pb-1 rounded'>
				<div className='d-flex justify-content-between mb-3'>
					<h3 className='px-3 mb-3 fw-bold'>{store.name}</h3>
					{store?.tenantId ? (
						<h4>{userTenant?.email}</h4>
					) : (
						<Button
							className='me-3'
							variant='outline-primary'
							onClick={handleAddUserTenant}
						>
							Asignar locatario
						</Button>
					)}
				</div>
			</div>
		</section>
	);
};

export default Store;
