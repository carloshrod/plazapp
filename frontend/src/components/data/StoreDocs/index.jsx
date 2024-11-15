import { Button, Col, Container, Form, Nav, Row } from 'react-bootstrap';
import DocumentCard from '../../ui/DocumentCard';
import useUiContext from '../../../hooks/useUiContext';
import DocForm from '../../forms/DocForm';
import { DOC_TYPES } from '../../../utils/consts';
import { useEffect, useState } from 'react';
import {
	getDocumentsByUserAndSubcollection,
	toggleAllowDeleteDocType,
} from '../../../services/documentServices';
import useUsersContext from '../../../hooks/useUsersContext';
import useAuthContext from '../../../hooks/useAuthContext';

const StoreDocs = () => {
	const { showModal } = useUiContext();
	const { loggedUser } = useAuthContext();
	const { userTenant } = useUsersContext();
	const [docs, setDocs] = useState([]);
	const [allowDeleteDocs, setAllowDeleteDocs] = useState([]);

	const isTenant = loggedUser && loggedUser?.role === 'tenant';
	const defaultActiveKey = isTenant ? 'lessor' : 'general';
	const [activeSection, setActiveSection] = useState(defaultActiveKey);

	const isLessor = activeSection === 'lessor';
	const userId = isLessor
		? loggedUser?.adminId
		: isTenant
		? loggedUser?.id
		: userTenant?.id;

	const allowDelete = allowDeleteDocs?.includes(activeSection);
	const [isSwitchOn, setIsSwitchOn] = useState(allowDelete);

	useEffect(() => {
		setIsSwitchOn(allowDelete);
	}, [allowDelete]);

	const getDocs = async () => {
		if (userId) {
			const data = await getDocumentsByUserAndSubcollection(
				userId,
				activeSection
			);
			setDocs(data?.docs);
			setAllowDeleteDocs(data?.allowDeleteDocs);
		}
	};

	useEffect(() => {
		getDocs();
	}, [userTenant, activeSection]);

	const handleUploadDocument = () => {
		showModal({
			title: 'Subir Documento',
			children: <DocForm getDocs={getDocs} />,
		});
	};

	const handleSelect = (selectedKey, event) => {
		event.preventDefault();
		setActiveSection(selectedKey);
	};

	const handleAllowDelete = async () => {
		await toggleAllowDeleteDocType({ userId, docType: activeSection });
		await getDocs();
	};

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
						defaultActiveKey={defaultActiveKey}
						onSelect={handleSelect}
					>
						{DOC_TYPES.slice(isTenant ? 0 : 1).map(({ value, label }) => (
							<Nav.Item key={value}>
								<Nav.Link eventKey={value}>{label}</Nav.Link>
							</Nav.Item>
						))}
					</Nav>

					<Container className='py-3'>
						{!isTenant ? (
							<Form.Check
								type='switch'
								id='custom-switch'
								label='Permitir a locatario eliminar documentos'
								checked={isSwitchOn}
								onChange={e => setIsSwitchOn(e.target.checked)}
								className='mb-4'
								onClick={handleAllowDelete}
							/>
						) : null}
						{docs?.length > 0 ? (
							<Row>
								{docs.map(doc => (
									<Col
										key={doc.id}
										xs={4}
										md={3}
										lg={2}
										className='mb-4'
										style={{ minWidth: 200 }}
									>
										<DocumentCard
											userId={userId}
											doc={doc}
											docType={activeSection}
											allowDelete={allowDelete || !isTenant}
											getDocs={getDocs}
										/>
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

export default StoreDocs;
