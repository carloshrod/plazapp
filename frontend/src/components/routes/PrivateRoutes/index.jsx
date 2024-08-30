import { Navigate, Outlet } from 'react-router-dom';
import UsersProvider from '../../../contexts/users/UsersProvider';
import { Header, CustomModal } from '../../';
import useAuthContext from '../../../hooks/useAuthContext';
import { PATHS } from '../../../utils/paths';
import PlazasProvider from '../../../contexts/plazas/PlazasProvider';

const { LOGIN } = PATHS;

const PrivateRoutes = () => {
	const { isAuth } = useAuthContext();

	return (
		<UsersProvider>
			<PlazasProvider>
				<Header />
				<h2 className='text-primary px-4 my-3 fw-bold'>Dashboard</h2>
				{!isAuth ? <Navigate to={LOGIN} /> : <Outlet />}
				<CustomModal />
			</PlazasProvider>
		</UsersProvider>
	);
};

export default PrivateRoutes;
