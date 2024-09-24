import { useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { MdEmail, MdLocalPhone, MdLocationPin } from 'react-icons/md';
import useUsersContext from '../../../hooks/useUsersContext';
import usePlazasContext from '../../../hooks/usePlazasContext';
import ContactInfoForm from '../../forms/ContactInfoForm';
import useUiContext from '../../../hooks/useUiContext';
import { TYPE_DOCS_OPTIONS } from '../../../utils/consts';
import PDFDocument from '../PDFDocument';
import { PDFDownloadLink } from '@react-pdf/renderer';

const TenantInfo = () => {
	const { showModal } = useUiContext();
	const { userTenant, setUserToEdit } = useUsersContext();
	const { store } = usePlazasContext();
	const [docType, setDocType] = useState('');

	const handleAddContactInfo = () => {
		setUserToEdit(userTenant);
		showModal({
			title: 'Agregar información de contacto',
			children: <ContactInfoForm />,
		});
	};

	const handleEditContactInfo = () => {
		setUserToEdit(userTenant);
		showModal({
			title: 'Editar información de contacto',
			children: <ContactInfoForm />,
		});
	};

	// const TEMPLATES = {
	// 	'contrato-de-arrendamiento': (
	// 		<Plantilla1 docType={docType} userTenant={userTenant} />
	// 	),
	// 	'convenio-de-terminación': (
	// 		<Plantilla2 docType={docType} userTenant={userTenant} />
	// 	),
	// };

	return (
		<section className='px-3'>
			{userTenant?.email ? (
				<Button
					className='mt-3'
					variant='outline-primary'
					onClick={
						!userTenant?.address
							? () => handleAddContactInfo()
							: () => handleEditContactInfo()
					}
				>
					{!userTenant?.address ? 'Agregar' : 'Editar'} Info de Contacto
				</Button>
			) : null}
			<div className='d-flex flex-column gap-4 my-4'>
				<h3>N° de local: {store.number}</h3>
				<div className='d-flex gap-4 flex-wrap px-3'>
					{userTenant?.email ? (
						<section
							className='d-flex flex-column gap-2 p-4 bg-white rounded'
							style={{ width: 400, minWidth: 300 }}
						>
							<h5 className='border-bottom border-primary border-4 pb-2'>
								Locatario - {userTenant.name}
							</h5>
							<span>
								<MdEmail size={24} className='me-1' />
								{userTenant.email}
							</span>
							{userTenant?.phoneNumber ? (
								<>
									<span>
										<MdLocalPhone size={24} className='me-1' />
										{userTenant?.phoneNumber}
									</span>
									<span>
										<MdLocationPin size={24} className='me-1' />
										{userTenant?.address}
									</span>
								</>
							) : null}
						</section>
					) : null}
					{userTenant?.address ? (
						<section
							className='d-flex flex-column gap-2 p-4 bg-white rounded'
							style={{ width: 400, minWidth: 300 }}
						>
							<h5 className='border-bottom border-primary border-4 pb-2'>
								Obligado Solidario - {userTenant?.guarantorName}
							</h5>
							<span>
								<MdEmail size={24} className='me-1' />
								{userTenant?.guarantorEmail}
							</span>
							<span>
								<MdLocalPhone size={24} className='me-1' />
								{userTenant?.guarantorPhone}
							</span>
						</section>
					) : null}
				</div>
			</div>
			<div style={{ width: 300 }}>
				<Button
					className='my-3'
					disabled={!docType || docType === 'Seleccionar...'}
				>
					<PDFDownloadLink
						// document={TEMPLATES[docType]}
						document={<PDFDocument docType={docType} userTenant={userTenant} />}
						fileName={`${docType}.pdf`}
						className='text-white'
					>
						{({ loading }) =>
							loading ? 'Generando documento...' : 'Generar documento'
						}
					</PDFDownloadLink>
				</Button>

				<Form.Group>
					<Form.Label className='fw-semibold'>
						Tipo de documento a generar
					</Form.Label>
					<Form.Select onChange={e => setDocType(e.target.value)} required>
						<option>Seleccionar...</option>
						{TYPE_DOCS_OPTIONS.map(doc => (
							<option key={doc.value} value={doc.value}>
								{doc.label}
							</option>
						))}
					</Form.Select>
				</Form.Group>
			</div>
		</section>
	);
};

export default TenantInfo;
