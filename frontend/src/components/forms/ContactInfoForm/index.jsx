import { Form } from 'react-bootstrap';
import { CONTACT_INFO_INPUTS } from '../../../utils/consts';
import useForm from '../../../hooks/useForm';
import SubmitButton from '../SubmitButton';
import useUsersContext from '../../../hooks/useUsersContext';

const initialForm = {
	name: '',
	email: '',
	address: '',
	phoneNumber: '',
	guarantorName: '',
	guarantorPhone: '',
	guarantorEmail: '',
};

const ContactInfoForm = () => {
	const { userTenant, setUserTenant, userToEdit } = useUsersContext();
	const {
		form,
		loading,
		handleChange,
		handleSubmitContactInfo,
		handleSubmitUserTenant,
	} = useForm(initialForm, userToEdit);

	const hasGuarantor = userToEdit.guarantorName;

	const handleSubmit = async event => {
		event.preventDefault();
		try {
			if (!hasGuarantor) {
				await handleSubmitContactInfo(userTenant.id);
				setUserTenant({ ...userTenant, ...form });
			} else {
				await handleSubmitUserTenant(userTenant.id);
				setUserTenant(form);
			}
		} catch (error) {
			console.error(error);
		}
	};

	return (
		<Form className='p-4 bg-white shadow rounded' onSubmit={handleSubmit}>
			{CONTACT_INFO_INPUTS.map(({ id, name, label, type }) => (
				<div key={id}>
					{name === 'name' && <p className='fw-bold fs-5 mb-2'>Locatario</p>}
					{name === 'guarantorName' && (
						<p className='fw-bold fs-5 mb-2'>Obligado Solidario</p>
					)}
					<Form.Group className='mb-4' controlId={id}>
						<Form.Label className='fw-semibold'>{label}</Form.Label>
						<Form.Control
							name={name}
							type={type ?? 'text'}
							value={form[name]}
							onChange={handleChange}
							required
							disabled={!hasGuarantor && (name === 'name' || name === 'email')}
						/>
					</Form.Group>
				</div>
			))}
			<SubmitButton
				label={!hasGuarantor ? 'AGREGAR' : 'EDITAR'}
				loading={loading}
			/>
		</Form>
	);
};

export default ContactInfoForm;
