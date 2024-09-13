import { Button } from 'react-bootstrap';
import useUiContext from '../../../hooks/useUiContext';
import UserProfile from '../../data/UserProfile';

const PasswordNotification = ({ loggedUser }) => {
	const { hideModal, showDrawer } = useUiContext();

	const handleUpdatePassword = () => {
		showDrawer({
			title: 'Mi Perfil',
			children: <UserProfile loggedUser={loggedUser} />,
		});
		hideModal();
	};

	return (
		<section>
			<p className='px-5 py-4 fs-4'>
				La contraseña actual fue generada automáticamente cuando se creó tu
				cuenta. Por razones de seguridad, es importante que la cambies ahora.
			</p>
			<div className='d-flex gap-5 px-5 pb-4'>
				<Button className='w-50' onClick={handleUpdatePassword}>
					ACTUALIZAR
				</Button>
				<Button className='w-50' variant='danger' onClick={hideModal}>
					CANCELAR
				</Button>
			</div>
		</section>
	);
};

export default PasswordNotification;
