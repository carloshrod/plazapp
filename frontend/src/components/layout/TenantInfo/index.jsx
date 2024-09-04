import { Button } from 'react-bootstrap';
import { MdEmail, MdLocalPhone, MdLocationPin } from 'react-icons/md';
import useUsersContext from '../../../hooks/useUsersContext';
import usePlazasContext from '../../../hooks/usePlazasContext';
import ContactInfoForm from '../../forms/ContactInfoForm';
import useUiContext from '../../../hooks/useUiContext';

const TenantInfo = () => {
	const { showModal } = useUiContext();
	const { userTenant } = useUsersContext();
	const { store } = usePlazasContext();

	const handleAddContactInfo = () => {
		showModal({
			title: 'Agregar información de contacto',
			children: <ContactInfoForm />,
		});
	};

	return (
		<section className='px-3'>
			{!userTenant?.address ? (
				<Button
					className='me-3'
					variant='outline-primary'
					onClick={handleAddContactInfo}
				>
					Agregar Info de Contacto
				</Button>
			) : null}
			<div className='d-flex flex-column gap-2 my-4'>
				<h3>N° de local: {store.number}</h3>
				<div className='d-flex flex-column gap-2 px-3'>
					{userTenant?.email ? (
						<>
							<h5>Locatario - {userTenant.name}</h5>
							<span>
								<MdEmail size={24} className='me-1' />
								{userTenant.email}
							</span>
						</>
					) : null}
					{userTenant?.address ? (
						<>
							<span>
								<MdLocalPhone size={24} className='me-1' />
								{userTenant?.phoneNumber}
							</span>
							<span>
								<MdLocationPin size={24} className='me-1' />
								{userTenant?.address}
							</span>
							<h5 className='mt-3'>
								Obligado Solidario - {userTenant?.guarantorName}
							</h5>
							<span>
								<MdLocalPhone size={24} className='me-1' />
								{userTenant?.guarantorPhone}
							</span>
							<span>
								<MdEmail size={24} className='me-1' />
								{userTenant?.guarantorEmail}
							</span>
						</>
					) : null}
				</div>
			</div>
		</section>
	);
};

export default TenantInfo;
