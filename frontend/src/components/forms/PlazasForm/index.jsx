import { Form } from 'react-bootstrap';
import SubmitButton from '../SubmitButton';
import useForm from '../../../hooks/useForm';
import { PLAZA_INPUTS } from '../../../utils/consts';
import usePlazasContext from '../../../hooks/usePlazasContext';

const initialForm = {
	name: '',
	number: '',
};

const PlazasForm = () => {
	const { form, loading, handleChange, handleSubmitPlaza } =
		useForm(initialForm);
	const { dispatchPlazas } = usePlazasContext();

	const handleSubmit = async event => {
		event.preventDefault();
		const newPlaza = await handleSubmitPlaza();
		dispatchPlazas(newPlaza);
	};

	return (
		<Form className='p-4 bg-white shadow rounded' onSubmit={handleSubmit}>
			{PLAZA_INPUTS.map(({ id, name, label, type }) => (
				<Form.Group key={id} className='mb-4' controlId={id}>
					<Form.Label className='fw-semibold'>{label}</Form.Label>
					<Form.Control
						name={name}
						type={type ?? 'text'}
						value={form[name].value}
						onChange={handleChange}
						required
					/>
				</Form.Group>
			))}
			<div className='d-flex justify-content-end'>
				<SubmitButton label='AGREGAR' loading={loading} />
			</div>
		</Form>
	);
};

export default PlazasForm;
