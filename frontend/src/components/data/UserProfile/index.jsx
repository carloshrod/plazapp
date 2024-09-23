import { MdEmail } from 'react-icons/md';
import { PassworForm } from '../..';
import useAuthContext from '../../../hooks/useAuthContext';

const UserProfile = () => {
	const { loggedUser } = useAuthContext();
	const { name, email, passwordChanged, role } = loggedUser;

	return (
		<section className='px-3'>
			<h3>{name}</h3>
			<span>
				<MdEmail size={24} className='me-1' />
				{email}
			</span>
			{role !== 'superadmin' && !passwordChanged ? (
				<div className='mt-5 p-3 text-center border border-danger text-danger fs-5 fw-bold rounded'>
					Actualiza tu contraseña
				</div>
			) : null}
			<h5 className='mt-5 text-primary'>Cambiar contraseña</h5>
			<PassworForm />
		</section>
	);
};

export default UserProfile;
