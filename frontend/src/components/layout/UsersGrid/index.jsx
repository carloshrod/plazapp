import { Button, Card, Col, Container, Row } from 'react-bootstrap';
import './Stores.css';
import { Link } from 'react-router-dom';
import { MdEmail } from 'react-icons/md';

const UsersGrid = ({ data, onClick }) => {
	return (
		<div className='bg-secondary p-4 pb-1 rounded'>
			<div className='d-flex justify-content-between mb-3'>
				<h3>Administradores</h3>
				<Button className='me-3' variant='outline-primary' onClick={onClick}>
					Agregar administrador
				</Button>
			</div>
			<Container className='py-3'>
				<Row>
					{data?.length > 0 ? (
						data?.map(item => (
							<Col key={item.id} xs={6} md={4} lg={3} className='mb-4'>
								<Link to={`/admin-panel/${item.id}`}>
									<Card className='store-card'>
										<Card.Body className='d-flex flex-column justify-content-center align-items-center'>
											<Card.Title>{item.name}</Card.Title>
											<Card.Text className='d-flex align-items-center'>
												<MdEmail size={24} className='me-2' />
												{item.email}
											</Card.Text>
										</Card.Body>
									</Card>
								</Link>
							</Col>
						))
					) : (
						<h2 className='text-center m-5'>¡No hay usuarios para mostrar!</h2>
					)}
				</Row>
			</Container>
		</div>
	);
};

export default UsersGrid;
