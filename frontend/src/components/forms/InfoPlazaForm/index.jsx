import { Form } from 'react-bootstrap';
import { ADMIN_INFO_INPUTS, BANK_INFO_INPUTS } from '../../../utils/consts';
import SubmitButton from '../../ui/SubmitButton';
import { useState } from 'react';
import useForm from '../../../hooks/useForm';
import usePlazasContext from '../../../hooks/usePlazasContext';

const initialForm = {
	accountNumber: '',
	ibanKey: '',
	bankName: '',
	name: '',
	rfc: '',
	businessName: '',
	deedNumber: '',
	deedDate: '',
	notaryOfficeNumber: '',
	notaryOfficeCity: '',
	merchInvoice: '',
};

const InfoPlazaForm = ({ fetchPlaza }) => {
	const { plaza, plazaToEdit } = usePlazasContext();
	const { form, loading, handleChange, handleSubmitPlazaInfo } = useForm(
		initialForm,
		plazaToEdit
	);
	const initialIsSociety = plazaToEdit?.isSociety ?? false;
	const [isSociety, setIsSociety] = useState(initialIsSociety);
	const initialIsSignerAuthorized = plazaToEdit?.isSignerAuthorized ?? false;
	const [isSignerAuthorized, setIsSignerAuthorized] = useState(
		initialIsSignerAuthorized
	);

	const handleSubmit = async e => {
		e.preventDefault();
		try {
			const options = { isSociety, isSignerAuthorized };
			await handleSubmitPlazaInfo(options, plaza?.id);
			await fetchPlaza();
		} catch (error) {
			console.error(error);
		}
	};

	const filteredInputs = [...ADMIN_INFO_INPUTS];

	if (isSociety) {
		filteredInputs.splice(1, 2);
	} else {
		filteredInputs.splice(3);
	}

	return (
		<Form className='p-4 bg-white shadow rounded' onSubmit={handleSubmit}>
			<h4 className='mb-4 text-primary'>{plaza?.name}</h4>
			{BANK_INFO_INPUTS.map(({ id, name, label, type }) => (
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
			{filteredInputs.map(({ id, name, label, type }) =>
				type !== 'switch' ? (
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
				) : (
					<Form.Check
						key={id}
						type='switch'
						id='custom-switch'
						label={label}
						checked={id === 'idIsSociety' ? isSociety : isSignerAuthorized}
						onChange={e =>
							id === 'idIsSociety'
								? setIsSociety(e.target.checked)
								: setIsSignerAuthorized(e.target.checked)
						}
						className='mb-4'
					/>
				)
			)}
			<div className='d-flex justify-content-end'>
				<SubmitButton label='AGREGAR' loading={loading} />
			</div>
		</Form>
	);
};

export default InfoPlazaForm;
