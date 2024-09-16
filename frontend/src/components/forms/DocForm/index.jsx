import { Form } from 'react-bootstrap';
import { FaUpload } from 'react-icons/fa';
import useForm from '../../../hooks/useForm';
import useUsersContext from '../../../hooks/useUsersContext';
import SubmitButton from '../../ui/SubmitButton';
import {
	DOCUMENT_INPUTS,
	GENERAL_DOCS_OPTIONS,
	MONTHLY_DOCS_OPTIONS,
} from '../../../utils/consts';

const initialForm = {
	docType: '',
	docName: '',
};

const DocForm = ({ getDocs }) => {
	const {
		form,
		file,
		loading,
		handleChange,
		handleFileChange,
		handleSubmitDocument,
	} = useForm(initialForm);
	const { userTenant } = useUsersContext();

	const handleSubmit = async event => {
		event.preventDefault();
		await handleSubmitDocument(userTenant?.id);
		await getDocs();
	};

	return (
		<Form className='p-3' onSubmit={handleSubmit}>
			{DOCUMENT_INPUTS.map(({ id, name, label, optionDefault, options }) => {
				const selectOptions = options
					? options
					: !form.docType
					? []
					: form.docType === 'general'
					? GENERAL_DOCS_OPTIONS
					: MONTHLY_DOCS_OPTIONS;

				return (
					<Form.Group key={id} className='mb-4' controlId={id}>
						<Form.Label className='fw-semibold'>{label}</Form.Label>
						<Form.Select
							name={name}
							value={form[name] || ''}
							onChange={handleChange}
							required
						>
							<option>{optionDefault}</option>
							{selectOptions?.map(opt => (
								<option key={opt.value} value={opt.value}>
									{opt.label}
								</option>
							))}
						</Form.Select>
					</Form.Group>
				);
			})}
			<div className='text-center mb-2'>
				<label
					data-tip
					data-for='toolTipUpload'
					className='btn btn-outline-success'
				>
					<input type='file' name='file' hidden onChange={handleFileChange} />
					<FaUpload size={20} />
				</label>
			</div>
			{file ? (
				<h5 className='text-center mb-4'>{file.name}</h5>
			) : (
				<span className='d-block text-center mb-4 text-secondary'>
					Cargar documento
				</span>
			)}
			<SubmitButton label='SUBIR' loading={loading} />
		</Form>
	);
};

export default DocForm;
