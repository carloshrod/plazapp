import { Button, Form } from 'react-bootstrap';
import SubmitButton from '../../ui/SubmitButton';
import useForm from '../../../hooks/useForm';
import { FORGOT_PASSWORD_INPUTS, LOGIN_INPUTS } from '../../../utils/consts';
import './LoginForm.css';
import { useState } from 'react';

const initialLogin = {
	email: '',
	password: '',
};

const initialForgotPassword = {
	email: '',
};

const LoginForm = () => {
	const [isLogin, setIsLogin] = useState(true);

	const initialForm = isLogin ? initialLogin : initialForgotPassword;
	const { form, loading, handleChange, handleSubmitLogin } =
		useForm(initialForm);

	const INPUTS = isLogin ? LOGIN_INPUTS : FORGOT_PASSWORD_INPUTS;

	const handleSubmit = async event => {
		event.preventDefault();
		await handleSubmitLogin();
		setIsLogin(true);
	};

	return (
		<Form
			className='login-form py-5 px-4 bg-white shadow rounded'
			onSubmit={handleSubmit}
		>
			<h2 className='text-center text-primary fw-bold mb-4'>Plazapp</h2>
			<p className='mb-2 text-center text-black-50 fw-semibold mb-3'>
				{isLogin
					? 'Inicia sesión con tu email y contraseña:'
					: 'Ingresa tu email y te enviaremos un correo con un enlace para restablecer tu contraseña:'}
			</p>
			{INPUTS.map(({ id, name, label, type }) => (
				<Form.Group key={id} className='mb-4' controlId={id}>
					<Form.Label className='fw-semibold'>{label}</Form.Label>
					<Form.Control
						name={name}
						type={type ?? 'text'}
						value={form[name] || ''}
						onChange={handleChange}
						required
					/>
				</Form.Group>
			))}
			<SubmitButton
				label={isLogin ? 'INICIAR SESIÓN' : 'RESTABLECER CONTRASEÑA'}
				loading={loading}
			/>
			<div className='text-end mt-2' onClick={() => setIsLogin(!isLogin)}>
				<Button variant='link' className='text-primary text-decoration-none'>
					{isLogin ? '¿Olvidaste tu contraseña?' : '¿Quieres iniciar sesión?'}
				</Button>
			</div>
		</Form>
	);
};

export default LoginForm;
