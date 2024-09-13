import Offcanvas from 'react-bootstrap/Offcanvas';
import useUiContext from '../../../hooks/useUiContext';

const Drawer = () => {
	const {
		drawer: { show, title, children },
		hideDrawer,
	} = useUiContext();

	return (
		<Offcanvas show={show} onHide={hideDrawer} placement='end'>
			<Offcanvas.Header closeButton>
				<Offcanvas.Title className='text-primary ms-3 fs-3'>
					{title}
				</Offcanvas.Title>
			</Offcanvas.Header>
			<Offcanvas.Body>{children}</Offcanvas.Body>
		</Offcanvas>
	);
};

export default Drawer;
