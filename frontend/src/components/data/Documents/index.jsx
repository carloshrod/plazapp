import { Button, Col, Container, Nav, Row } from 'react-bootstrap';
import DocumentCard from '../../ui/DocumentCard';
import useUiContext from '../../../hooks/useUiContext';
import DocForm from '../../forms/DocForm';
import { DOC_TYPES } from '../../../utils/consts';
import { useEffect, useState } from 'react';
import { getDocumentsByUserAndSubcollection } from '../../../services/documentServices';
import useUsersContext from '../../../hooks/useUsersContext';
import useAuthContext from '../../../hooks/useAuthContext';

const Documents = () => {
	const { showModal } = useUiContext();
	const [activeSection, setActiveSection] = useState('general');
	const { loggedUser } = useAuthContext();
	const { userTenant } = useUsersContext();
	const [genDocs, setGenDocs] = useState([]);
	const isTenant = loggedUser && loggedUser?.role === 'tenant';
	const userId = isTenant ? loggedUser?.id : userTenant?.id;

	const handleUploadDocument = () => {
		showModal({
			title: 'Subir Documento',
			children: <DocForm />,
		});
	};

	const handleSelect = (selectedKey, event) => {
		event.preventDefault();
		setActiveSection(selectedKey);
	};

	const getDocs = async () => {
		if (userId) {
			const data = await getDocumentsByUserAndSubcollection(
				userId,
				activeSection
			);
			setGenDocs(data);
		}
	};

	useEffect(() => {
		getDocs();
	}, [userTenant, activeSection]);

	return (
		<div className='px-3 mt-5'>
			{!isTenant && <hr className='mb-5' />}
			<div className='d-flex justify-content-between'>
				<h4>Documentos</h4>
				<Button variant='outline-primary' onClick={handleUploadDocument}>
					Subir documento
				</Button>
			</div>
			<div className='d-flex gap-3 px-3 mt-3'>
				<div className='d-flex flex-column flex-grow-1 gap-3'>
					<Nav
						variant='tabs'
						defaultActiveKey='general'
						onSelect={handleSelect}
					>
						{DOC_TYPES.map(({ value, label }) => (
							<Nav.Item key={value}>
								<Nav.Link eventKey={value}>{label}</Nav.Link>
							</Nav.Item>
						))}
					</Nav>

					<Container className='py-3'>
						{genDocs?.length > 0 ? (
							<Row>
								{genDocs.map(doc => (
									<Col
										key={doc.id}
										xs={4}
										md={3}
										lg={2}
										className='mb-4'
										style={{ minWidth: 200 }}
									>
										<DocumentCard docName={doc.docName} fileUrl={doc.fileUrl} />
									</Col>
								))}
							</Row>
						) : (
							<h3 className='text-center py-5'>
								¡No hay documentos para mostrar!
							</h3>
						)}
					</Container>
				</div>
			</div>
		</div>
	);
};

export default Documents;
