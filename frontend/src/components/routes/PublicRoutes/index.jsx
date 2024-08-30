import { Navigate, Outlet } from 'react-router-dom';
import useAuthContext from '../../../hooks/useAuthContext';
import { PATHS } from '../../../utils/paths';

const { ADMIN } = PATHS;

const PublicRoutes = () => {
	const { isAuth } = useAuthContext();

	return isAuth ? <Navigate to={ADMIN} /> : <Outlet />;
};

export default PublicRoutes;
