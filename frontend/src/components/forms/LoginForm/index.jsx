import { Form } from 'react-bootstrap';
import SubmitButton from '../SubmitButton';
import useForm from '../../../hooks/useForm';
import { LOGIN_INPUTS } from '../../../utils/consts';
import './LoginForm.css';

const initialForm = {
	email: '',
	password: '',
};

const LoginForm = () => {
	const { form, loading, handleChange, handleSubmitLogin } =
		useForm(initialForm);

	return (
		<Form
			className='login-form py-5 px-4 bg-white shadow rounded'
			onSubmit={handleSubmitLogin}
		>
			<h2 className='text-center fw-bold mb-4'>Plazapp</h2>
			<p className='mb-2 text-center text-black-50 fw-semibold mb-3'>
				Inicia sesión con tu email y contraseña:
			</p>
			{LOGIN_INPUTS.map(({ id, name, label, type }) => (
				<Form.Group key={id} className='mb-4' controlId={id}>
					<Form.Label className='fw-semibold'>{label}</Form.Label>
					<Form.Control
						name={name}
						type={type ?? 'text'}
						value={form[name]}
						onChange={handleChange}
						required
					/>
				</Form.Group>
			))}

			<SubmitButton label='INICIAR SESIÓN' loading={loading} />
		</Form>
	);
};

export default LoginForm;
