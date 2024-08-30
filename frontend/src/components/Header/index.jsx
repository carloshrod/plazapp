import { Button, Container, Navbar } from 'react-bootstrap';
import { BsPower } from 'react-icons/bs';
import { BsFillPersonFill } from 'react-icons/bs';
import { logout } from '../../services/authService';
import { Link } from 'react-router-dom';
import useAuthContext from '../../hooks/useAuthContext';

const Header = () => {
	const { loggedUser } = useAuthContext();

	return (
		<Navbar className='bg-body-tertiary'>
			<Container>
				<Link to='/admin-panel'>
					<Navbar.Brand className='fs-1 text-primary fw-light'>
						PLAZ<span className='fw-bold'>APP</span>
					</Navbar.Brand>
				</Link>
				<Navbar.Collapse className='justify-content-end gap-3'>
					<Navbar.Text className='d-flex align-items-center text-primary fs-5'>
						{loggedUser?.email}
						<BsFillPersonFill size={30} />
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
