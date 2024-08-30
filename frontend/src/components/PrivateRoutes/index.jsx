import { Navigate, Outlet } from 'react-router-dom';
import useAuthContext from '../../hooks/useAuthContext';
import { PATHS } from '../../utils/paths';
import UsersProvider from '../../contexts/users/UsersProvider';
import GlobalProvider from '../../contexts/global/GlobalProvider';
import CustomModal from '../Modal';
import Header from '../Header';

const { LOGIN } = PATHS;

const PrivateRoutes = () => {
	const { isAuth } = useAuthContext();

	return (
		<GlobalProvider>
			<UsersProvider>
				<Header />
				<h2 className='text-primary px-4 my-3 fw-bold'>Dashboard</h2>
				{!isAuth ? <Navigate to={LOGIN} /> : <Outlet />}
				<CustomModal />
			</UsersProvider>
		</GlobalProvider>
	);
};

export default PrivateRoutes;
