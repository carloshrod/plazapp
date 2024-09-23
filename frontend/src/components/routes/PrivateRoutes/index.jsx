import { useEffect } from 'react';
import { Navigate, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import { FaChevronLeft } from 'react-icons/fa';
import {
	Header,
	CustomModal,
	Drawer,
	TermsNotification,
	PasswordNotification,
} from '../../';
import UsersProvider from '../../../contexts/users/UsersProvider';
import PlazasProvider from '../../../contexts/plazas/PlazasProvider';
import useAuthContext from '../../../hooks/useAuthContext';
import useUiContext from '../../../hooks/useUiContext';
import { PATHS } from '../../../utils/paths';

const { LOGIN, SUPERADMIN, ADMIN, TENANT } = PATHS;

const PrivateRoutes = () => {
	const { showModal } = useUiContext();
	const { isAuth, loggedUser } = useAuthContext();
	const navigate = useNavigate();
	const { pathname } = useLocation();
	let initialRoute = SUPERADMIN;

	useEffect(() => {
		if (loggedUser && loggedUser?.role !== 'superadmin') {
			if (!loggedUser?.termsAccepted) {
				showModal({
					title: 'Acepta los términos y condiciones',
					children: <TermsNotification />,
					onHide: false,
				});
			} else if (loggedUser?.termsAccepted && !loggedUser?.passwordChanged) {
				showModal({
					title: 'Actualiza tu contraseña',
					children: <PasswordNotification />,
				});
			}
		}
	}, [loggedUser?.termsAccepted]);

	if (!isAuth) {
		return <Navigate to={LOGIN} replace />;
	}

	if (loggedUser.role === 'admin') {
		initialRoute = ADMIN.replace(':adminId', loggedUser.id);
		if (pathname === SUPERADMIN) {
			return <Navigate to={initialRoute} replace />;
		}
	} else if (loggedUser.role === 'tenant') {
		initialRoute = TENANT.replace(':storeId', loggedUser.storeId);
		if (pathname !== initialRoute) {
			return <Navigate to={initialRoute} replace />;
		}
	}

	const isRootPath = initialRoute === pathname;

	return (
		<UsersProvider>
			<PlazasProvider>
				<Header />
				<section className='text-primary px-4 my-3 fw-bold'>
					{!isRootPath ? (
						<Button
							onClick={() => navigate(-1)}
							variant='light'
							className='mb-2 rounded-5'
						>
							<FaChevronLeft className='text-primary' size={24} />
						</Button>
					) : null}
					<h2>Dashboard</h2>
				</section>
				<Outlet />
				<CustomModal />
				<Drawer />
			</PlazasProvider>
		</UsersProvider>
	);
};

export default PrivateRoutes;
