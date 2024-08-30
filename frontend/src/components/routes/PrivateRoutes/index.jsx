import { Navigate, Outlet, useNavigate, useParams } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import { FaChevronLeft } from 'react-icons/fa';
import { Header, CustomModal } from '../../';
import useAuthContext from '../../../hooks/useAuthContext';
import UsersProvider from '../../../contexts/users/UsersProvider';
import PlazasProvider from '../../../contexts/plazas/PlazasProvider';
import { PATHS } from '../../../utils/paths';

const { LOGIN } = PATHS;

const PrivateRoutes = () => {
	const { isAuth } = useAuthContext();
	const navigate = useNavigate();
	const params = useParams();
	const isRootPath = Object.keys(params).length === 0;

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
				{!isAuth ? <Navigate to={LOGIN} /> : <Outlet />}
				<CustomModal />
			</PlazasProvider>
		</UsersProvider>
	);
};

export default PrivateRoutes;
