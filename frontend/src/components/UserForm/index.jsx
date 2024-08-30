import { useState } from 'react';
import { Button, Form, Spinner } from 'react-bootstrap';
import { addUser } from '../../services/userServices';
import useGlobalContext from '../../hooks/useGlobalContext';
import useUsersContext from '../../hooks/useUsersContext';

const initialForm = {
	name: '',
	email: '',
};

const UserForm = () => {
	const [form, setForm] = useState(initialForm);
	const [loading, setLoading] = useState(false);
	const { hideModal } = useGlobalContext();
	const { userAdmins, setUserAdmins } = useUsersContext();

	const INPUTS = [
		{
			id: 'idName',
			name: 'name',
			label: 'Nombre',
		},
		{
			id: 'idEmail',
			name: 'email',
			label: 'Email',
		},
	];

	const handleChange = e => {
		const { value, name } = e.target;
		setForm({
			...form,
			[name]: value,
		});
	};

	const handleSubmit = async e => {
		e.preventDefault();
		try {
			setLoading(true);
			const createdUser = await addUser(form);
			console.log('Usuario agregado con éxito!');
			hideModal();
			setUserAdmins([...userAdmins, createdUser]);
		} catch (error) {
			console.error(error);
		} finally {
			setLoading(false);
		}
	};

	return (
		<Form className='p-4 bg-white shadow rounded' onSubmit={handleSubmit}>
			{INPUTS.map(({ id, name, label }) => (
				<Form.Group key={id} className='mb-4' controlId={id}>
					<Form.Label className='fw-semibold'>{label}</Form.Label>
					<Form.Control
						name={name}
						type='text'
						value={form[name].value}
						onChange={handleChange}
						required
					/>
				</Form.Group>
			))}
			<div className='d-flex justify-content-end'>
				<Button
					className='w-50 fw-bold'
					variant='primary'
					type='submit'
					disabled={loading}
				>
					{!loading ? (
						'AGREGAR'
					) : (
						<Spinner
							as='span'
							animation='border'
							size='sm'
							role='status'
							aria-hidden='true'
						/>
					)}
				</Button>
			</div>
		</Form>
	);
};

export default UserForm;
