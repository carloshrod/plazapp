import { Button, Card, Col, Container, Form, Row } from 'react-bootstrap';
import { Link, useLocation } from 'react-router-dom';
import { MdEmail } from 'react-icons/md';
import { useEffect, useState } from 'react';
import { toggleDisableUserAdmin } from '../../../services/userServices';
import useUsersContext from '../../../hooks/useUsersContext';

const UsersGrid = ({ onClick }) => {
	const { pathname } = useLocation();
	const [switchStates, setSwitchStates] = useState({});
	const { userAdmins, setUserAdmins } = useUsersContext();

	useEffect(() => {
		if (userAdmins?.length) {
			const initialSwitchStates = userAdmins.reduce(
				(acc, item) => ({
					...acc,
					[item.id]: !item.disabled,
				}),
				{}
			);
			setSwitchStates(initialSwitchStates);
		}
	}, [userAdmins]);

	const handleSwitchChange = async id => {
		setSwitchStates(prevStates => ({
			...prevStates,
			[id]: !prevStates[id],
		}));
		await toggleDisableUserAdmin(id);
		const newData = userAdmins.map(userAdmin => {
			return userAdmin.id === id
				? { ...userAdmin, disabled: !userAdmin.disabled }
				: userAdmin;
		});
		setUserAdmins(newData);
	};

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
					{userAdmins?.length > 0 ? (
						userAdmins?.map(item => (
							<Col key={item.id} xs={12} md={6} lg={4} className='mb-4'>
								<Card className='store-card'>
									<Link
										to={`${pathname}/${item.id}`}
										className='d-flex flex-column justify-content-center text-primary'
									>
										<Card.Body
											className='d-flex flex-column justify-content-center align-items-center'
											style={{ height: 100 }}
										>
											<Card.Title>{item.name}</Card.Title>
											<Card.Text className='d-flex align-items-center'>
												<MdEmail size={24} className='me-2' />
												{item.email}
											</Card.Text>
										</Card.Body>
									</Link>
									<Card.Footer
										className='d-flex justify-content-center'
										style={{ height: 50 }}
									>
										<Form.Check
											type='switch'
											id={item.id}
											label={switchStates[item.id] ? 'Activo' : 'Inactivo'}
											checked={switchStates[item.id] ?? false}
											onChange={() => handleSwitchChange(item.id)}
										/>
									</Card.Footer>
								</Card>
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
