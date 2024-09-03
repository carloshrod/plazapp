import { Button } from 'react-bootstrap';
import { TiDelete, TiEdit } from 'react-icons/ti';
import './Notifications.css';
import useUsersContext from '../../../hooks/useUsersContext';

const Notifications = ({ handleDeleteNotification }) => {
	const { userTenant } = useUsersContext();

	return (
		<div className='notifications'>
			<h4>Notificacion</h4>
			{userTenant?.notifDays?.length ? (
				userTenant?.notifDays.map(notifDay => (
					<div
						key={notifDay}
						className='d-flex justify-content-between gap-2 p-3 mb-2 bg-light fs-5 rounded'
					>
						<div className='d-flex flex-column gap-1 p-2'>
							<p className='m-0'>
								<span className='fw-bold'>Email: </span> {userTenant.email}
							</p>
							<p className='m-0'>
								<span className='fw-bold'>Día del mes: </span> {notifDay}
							</p>
						</div>
						<div className='d-flex flex-column'>
							<Button
								variant='danger'
								size='sm'
								className='p-0 d-flex align-items-center my-auto'
								onClick={() => handleDeleteNotification(userTenant.id)}
							>
								<TiDelete size={18} />
							</Button>
							<Button
								variant='primary'
								size='sm'
								className='p-0 d-flex align-items-center my-auto'
							>
								<TiEdit size={18} />
							</Button>
						</div>
					</div>
				))
			) : (
				<p className='py-5 text-center fw-semibold bg-light rounded'>
					¡Agregar notificaciones!
				</p>
			)}
		</div>
	);
};

export default Notifications;
