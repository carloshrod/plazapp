import { Button, Container, Navbar } from 'react-bootstrap';
import { BsPower } from 'react-icons/bs';
import { BsFillPersonFill } from 'react-icons/bs';
import { logout } from '../../../services/authService';
import { Link } from 'react-router-dom';
import useAuthContext from '../../../hooks/useAuthContext';
import useUiContext from '../../../hooks/useUiContext';
import UserProfile from '../../data/UserProfile';

const Header = () => {
	const { loggedUser } = useAuthContext();
	const { showDrawer } = useUiContext();

	const handleDrawer = () => {
		showDrawer({
			title: 'Mi Perfil',
			children: <UserProfile />,
		});
	};

	return (
		<Navbar className='bg-body-tertiary'>
			<Container>
				<Link to='/admin-panel'>
					<Navbar.Brand className='fs-1 text-primary fw-light'>
						PLAZ<span className='fw-bold'>APP</span>
					</Navbar.Brand>
				</Link>
				<Navbar.Collapse className='justify-content-end gap-3'>
					<Navbar.Text className='d-flex align-items-center fs-5'>
						<Button
							variant='light'
							className='text-primary'
							onClick={handleDrawer}
						>
							{loggedUser?.email}
							<BsFillPersonFill size={30} />
						</Button>
					</Navbar.Text>
					<Button onClick={logout} size='sm' variant='outline-danger'>
						<BsPower size={20} />
					</Button>
				</Navbar.Collapse>
			</Container>
		</Navbar>
	);
};

export default Header;
