import { Form } from 'react-bootstrap';
import { PASSWORD_INPUTS } from '../../../utils/consts';
import SubmitButton from '../../ui/SubmitButton';
import useForm from '../../../hooks/useForm';

const initialForm = {
	currentPassword: '',
	newPassword: '',
};

const PasswordForm = () => {
	const { form, loading, handleChange, handleSubmitPassword } =
		useForm(initialForm);

	return (
		<Form className='p-3' onSubmit={handleSubmitPassword}>
			{PASSWORD_INPUTS.map(({ id, name, label }) => (
				<Form.Group key={id} className='mb-4' controlId={id}>
					<Form.Label className='fw-semibold'>{label}</Form.Label>
					<Form.Control
						name={name}
						type='password'
						value={form[name]}
						onChange={handleChange}
						required
					/>
				</Form.Group>
			))}
			<SubmitButton label='CAMBIAR' loading={loading} />
		</Form>
	);
};

export default PasswordForm;
