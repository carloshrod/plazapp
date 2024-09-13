import { Form } from 'react-bootstrap';
import SubmitButton from '../../ui/SubmitButton';
import useForm from '../../../hooks/useForm';
import { USER_INPUTS } from '../../../utils/consts';
import useUsersContext from '../../../hooks/useUsersContext';
import { useParams } from 'react-router-dom';

const initialForm = {
	name: '',
	email: '',
};

const UserForm = () => {
	const {
		form,
		loading,
		handleChange,
		handleSubmitUserAdmin,
		handleSubmitUserTenant,
	} = useForm(initialForm);
	const { dispatchUserAdmins, setUserTenant } = useUsersContext();
	const { storeId } = useParams();

	const handleSubmit = async e => {
		e.preventDefault();

		const newUser = !storeId
			? await handleSubmitUserAdmin()
			: await handleSubmitUserTenant();

		if (newUser?.role === 'admin') {
			dispatchUserAdmins(newUser);
		} else {
			setUserTenant(newUser);
		}
	};

	return (
		<Form className='p-4 bg-white shadow rounded' onSubmit={handleSubmit}>
			{USER_INPUTS.map(({ id, name, label }) => (
				<Form.Group key={id} className='mb-4' controlId={id}>
					<Form.Label className='fw-semibold'>{label}</Form.Label>
					<Form.Control
						name={name}
						type='text'
						value={form[name]}
						onChange={handleChange}
						required
					/>
				</Form.Group>
			))}
			<SubmitButton label='AGREGAR' loading={loading} />
		</Form>
	);
};

export default UserForm;
