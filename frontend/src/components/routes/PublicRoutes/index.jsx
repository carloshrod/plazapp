import { Navigate, Outlet } from 'react-router-dom';
import useAuthContext from '../../../hooks/useAuthContext';
import { PATHS } from '../../../utils/paths';

const { SUPERADMIN } = PATHS;

const PublicRoutes = () => {
	const { isAuth } = useAuthContext();

	return isAuth ? <Navigate to={SUPERADMIN} /> : <Outlet />;
};

export default PublicRoutes;
