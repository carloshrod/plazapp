import { Form } from 'react-bootstrap';
import { FaUpload } from 'react-icons/fa';
import useForm from '../../../hooks/useForm';
import SubmitButton from '../../ui/SubmitButton';
import usePlazasContext from '../../../hooks/usePlazasContext';
import { LESSOR_DOCS_OPTIONS } from '../../../utils/consts';

const initialForm = {
	docName: '',
};

const PlazaDocForm = ({ getDocs }) => {
	const {
		form,
		file,
		loading,
		handleChange,
		handleFileChange,
		handleSubmitDocument,
	} = useForm(initialForm);
	const { plaza } = usePlazasContext();

	const handleSubmit = async event => {
		event.preventDefault();
		await handleSubmitDocument(plaza?.adminId);
		await getDocs();
	};

	const isFormOk = Boolean(form.docName) && Boolean(file);

	return (
		<Form className='p-3' onSubmit={handleSubmit}>
			<Form.Group className='mb-4' controlId='docName'>
				<Form.Label className='fw-semibold'>Documento</Form.Label>
				<Form.Select
					name='docName'
					value={form.docName || ''}
					onChange={handleChange}
					required
				>
					<option>Selecciona un documento</option>
					{LESSOR_DOCS_OPTIONS?.map(opt => (
						<option key={opt.value} value={opt.value}>
							{opt.label}
						</option>
					))}
				</Form.Select>
			</Form.Group>
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
			<SubmitButton label='SUBIR' loading={loading} isFormOk={isFormOk} />
		</Form>
	);
};

export default PlazaDocForm;
