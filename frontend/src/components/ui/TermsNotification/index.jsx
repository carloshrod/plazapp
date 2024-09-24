import { Button, Spinner } from 'react-bootstrap';
import { IoDocumentTextOutline } from 'react-icons/io5';
import { acceptTerms } from '../../../services/userServices';
import { logout } from '../../../services/authService';
import useAuthContext from '../../../hooks/useAuthContext';
import { useState } from 'react';

const TermsNotification = () => {
	const [loading, setLoading] = useState(false);
	const { loggedUser, setLoggedUser } = useAuthContext();

	const handleAcceptTerms = async () => {
		setLoading(true);
		await acceptTerms(loggedUser?.id);
		setLoggedUser({ ...loggedUser, termsAccepted: true });
		setLoading(false);
	};

	return (
		<section className='px-5'>
			<p className='pt-4 fs-4'>
				Para continuar, por favor, lea cuidadosamente los términos y condiciones
				y luego haga click en{' '}
				<span className='text-primary fw-bold fs-5'>ACEPTAR</span>.
			</p>
			<div className='pt-4 pb-5 fs-4'>
				<a
					href='#' // Link a terminos y condiciones
					target='_blank'
					rel='noreferrer noopener'
					className='d-flex align-items-center fw-bold '
				>
					<IoDocumentTextOutline size={30} className='text-dark' /> Términos y
					Condiciones
				</a>
			</div>
			<div className='d-flex gap-5 pb-4'>
				<Button
					className='w-50 fw-bold'
					variant='primary'
					disabled={loading}
					onClick={handleAcceptTerms}
				>
					{!loading ? (
						'ACEPTAR'
					) : (
						<Spinner
							as='span'
							animation='border'
							size='sm'
							role='status'
							aria-hidden='true'
						/>
					)}
				</Button>
				<Button className='w-50 fw-bold' variant='danger' onClick={logout}>
					RECHAZAR
				</Button>
			</div>
		</section>
	);
};

export default TermsNotification;
