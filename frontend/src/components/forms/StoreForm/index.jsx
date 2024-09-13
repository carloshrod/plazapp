import { Form } from 'react-bootstrap';
import { STORE_INPUTS } from '../../../utils/consts';
import useForm from '../../../hooks/useForm';
import SubmitButton from '../SubmitButton';
import usePlazasContext from '../../../hooks/usePlazasContext';

const initialForm = {
	name: '',
	number: '',
};

const StoreForm = () => {
	const { form, loading, handleChange, handleSubmitStore } =
		useForm(initialForm);
	const { dispatchStores } = usePlazasContext();

	const handleSubmit = async event => {
		event.preventDefault();
		const res = await handleSubmitStore();
		dispatchStores(res);
	};

	return (
		<Form className='p-4 bg-white shadow rounded' onSubmit={handleSubmit}>
			{STORE_INPUTS.map(({ id, name, label, type }) => (
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
			<div className='d-flex justify-content-end'>
				<SubmitButton label='AGREGAR' loading={loading} />
			</div>
		</Form>
	);
};

export default StoreForm;
