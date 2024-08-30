import { useState } from 'react';
import { Form, Button, Alert, Spinner } from 'react-bootstrap';
import { signIn } from '../../../services/authService';
import './LoginForm.css';

const LoginForm = () => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState('');

	const handleSubmit = async event => {
		event.preventDefault();
		try {
			setLoading(true);
			await delay(500);
			await signIn(email, password);
		} catch (error) {
			console.error(error);
			setError('Error de autenticación!');
		} finally {
			setLoading(false);
		}
	};

	function delay(ms) {
		return new Promise(resolve => setTimeout(resolve, ms));
	}

	return (
		<Form
			className='login-form py-5 px-4 bg-white shadow rounded'
			onSubmit={handleSubmit}
		>
			<h2 className='text-center fw-bold mb-4'>Plazapp</h2>
			<p className='mb-2 text-center text-black-50 fw-semibold mb-3'>
				Inicia sesión con tu email y contraseña:
			</p>
			{error ? (
				<Alert
					className='mb-2'
					variant='danger'
					onClose={() => setError('')}
					dismissible
				>
					{error}
				</Alert>
			) : (
				<div />
			)}
			<Form.Group className='mb-4' controlId='email'>
				<Form.Label className='fw-semibold'>Email</Form.Label>
				<Form.Control
					type='text'
					value={email}
					placeholder='Email'
					onChange={e => setEmail(e.target.value)}
					required
				/>
			</Form.Group>
			<Form.Group className='mb-4' controlId='password'>
				<Form.Label className='fw-semibold'>Contraseña</Form.Label>
				<Form.Control
					type='password'
					value={password}
					placeholder='Contraseña'
					onChange={e => setPassword(e.target.value)}
					required
				/>
			</Form.Group>
			<Button
				className='w-100 fw-bold'
				variant='primary'
				type='submit'
				disabled={loading}
			>
				{!loading ? (
					'INICIAR SESIÓN'
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
		</Form>
	);
};

export default LoginForm;
