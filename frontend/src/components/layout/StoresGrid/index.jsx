import { Button, Card, Col, Container, Row } from 'react-bootstrap';
import { Link, useLocation } from 'react-router-dom';
import useAuthContext from '../../../hooks/useAuthContext';

const StoresGrid = ({ data, onClick }) => {
	const { pathname } = useLocation();
	const { loggedUser } = useAuthContext();

	return (
		<div className='bg-secondary p-4 pb-1 rounded'>
			<div className='d-flex justify-content-between mb-3'>
				<h3>Locales</h3>
				{loggedUser?.role === 'superadmin' ? (
					<Button variant='outline-primary' onClick={onClick}>
						Agregar local
					</Button>
				) : null}
			</div>
			<Container className='py-3'>
				<Row>
					{data?.length > 0 ? (
						data?.map(item => (
							<Col key={item.id} xs={6} md={4} lg={3} className='mb-4'>
								<Link to={`${pathname}/${item.id}`}>
									<Card className='store-card'>
										<Card.Body className='d-flex flex-column justify-content-center align-items-center fw-bold'>
											<Card.Title>{item.name}</Card.Title>
											<Card.Text className='fs-5'>{item.number}</Card.Text>
										</Card.Body>
									</Card>
								</Link>
							</Col>
						))
					) : (
						<h2 className='text-center m-5'>¡No hay locales para mostrar!</h2>
					)}
				</Row>
			</Container>
		</div>
	);
};

export default StoresGrid;
