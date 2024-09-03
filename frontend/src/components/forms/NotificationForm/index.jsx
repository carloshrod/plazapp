import dayjs from 'dayjs';
import useUsersContext from '../../../hooks/useUsersContext';
import useUiContext from '../../../hooks/useUiContext';
import { addNotification } from '../../../services/userServices';
import SubmitButton from '../SubmitButton';
import { useState } from 'react';

const NotificationForm = ({ selectedDate }) => {
	const { userTenant, setUserTenant } = useUsersContext();
	const { hideModal } = useUiContext();
	const [loading, setLoading] = useState(false);

	const handleSubmit = async e => {
		e.preventDefault();
		try {
			setLoading(true);
			if (selectedDate) {
				const newNotification = {
					userTenantId: userTenant?.id,
					notifDay: Number(dayjs(selectedDate).format('DD')),
				};

				await addNotification(newNotification);
				setUserTenant({
					...userTenant,
					notifDays: [...userTenant.notifDays, newNotification.notifDay],
				});
				hideModal();
			}
		} catch (error) {
			console.error(error);
		} finally {
			setLoading(false);
		}
	};

	return (
		<form
			className='p-4 bg-white shadow rounded fw-semibold'
			onSubmit={handleSubmit}
		>
			<p>Fecha: {dayjs(selectedDate).format('DD/MM/YYYY')}</p>
			<p className='fw-semibold'>
				Día seleccionado:
				<span className='text-primary'>
					{' '}
					{dayjs(selectedDate).format('DD')}
				</span>
			</p>
			<p>
				Email del locatario:{' '}
				<span className='text-primary'>{userTenant?.email}</span>
			</p>
			<SubmitButton label='CONFIRMAR' loading={loading} />
		</form>
	);
};

export default NotificationForm;
