import { Form } from 'react-bootstrap';
import { CONTACT_INFO_INPUTS } from '../../../utils/consts';
import useForm from '../../../hooks/useForm';
import SubmitButton from '../SubmitButton';
import useUsersContext from '../../../hooks/useUsersContext';

const initialForm = {
	address: '',
	phoneNumber: '',
	guarantorName: '',
	guarantorPhone: '',
	guarantorEmail: '',
};

const ContactInfoForm = () => {
	const { form, loading, handleChange, handleSubmitContactInfo } =
		useForm(initialForm);
	const { userTenant, setUserTenant } = useUsersContext();

	const handleSubmit = async event => {
		event.preventDefault();
		try {
			await handleSubmitContactInfo(userTenant.id);
			// TODO: Actualizar contact info al agregarla
			setUserTenant({ ...userTenant, ...form });
		} catch (error) {
			console.error(error);
		}
	};

	return (
		<Form className='p-4 bg-white shadow rounded' onSubmit={handleSubmit}>
			{CONTACT_INFO_INPUTS.map(({ id, name, label, type }) => (
				<div key={id}>
					{name === 'guarantorName' && (
						<p className='fw-bold fs-5 mb-2'>Obligado Solidario</p>
					)}
					<Form.Group className='mb-4' controlId={id}>
						<Form.Label className='fw-semibold'>{label}</Form.Label>
						<Form.Control
							name={name}
							type={type ?? 'text'}
							value={form[name].value}
							onChange={handleChange}
							required
						/>
					</Form.Group>
				</div>
			))}
			<SubmitButton label='AGREGAR' loading={loading} />
		</Form>
	);
};

export default ContactInfoForm;
