import { useEffect, useState } from 'react';
import { Button, Col, Container, Row } from 'react-bootstrap';
import PlazaDocForm from '../../forms/PlazaDocForm';
import DocumentCard from '../../ui/DocumentCard';
import useAuthContext from '../../../hooks/useAuthContext';
import useUiContext from '../../../hooks/useUiContext';
import { getDocumentsByUserAndSubcollection } from '../../../services/documentServices';

const PlazaDocs = ({ adminId }) => {
	const { showModal } = useUiContext();
	const { loggedUser } = useAuthContext();
	const [docs, setDocs] = useState([]);

	const isTenant = loggedUser && loggedUser?.role === 'tenant';

	const getDocs = async () => {
		if (adminId) {
			const data = await getDocumentsByUserAndSubcollection(adminId, 'lessor');
			setDocs(data?.docs);
		}
	};

	useEffect(() => {
		getDocs();
	}, [adminId]);

	const handleUploadDocument = () => {
		showModal({
			title: 'Subir Documento',
			children: <PlazaDocForm getDocs={getDocs} />,
		});
	};

	return (
		<div className='bg-secondary p-4 pb-1 rounded'>
			<div className='d-flex justify-content-between'>
				<h3>Documentos Generales de Arrendador</h3>
				<Button variant='outline-primary' onClick={handleUploadDocument}>
					Subir documento
				</Button>
			</div>
			<Container className='py-3'>
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
									userId={adminId}
									doc={doc}
									docType={'lessor'}
									allowDelete={!isTenant}
									getDocs={getDocs}
								/>
							</Col>
						))}
					</Row>
				) : (
					<h3 className='text-center py-5'>¡No hay documentos para mostrar!</h3>
				)}
			</Container>
		</div>
	);
};

export default PlazaDocs;
