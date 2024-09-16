import { Button } from 'react-bootstrap';
import { TiDelete } from 'react-icons/ti';
import { FaFilePdf } from 'react-icons/fa6';
import { deleteDocumentAndFile } from '../../../services/documentServices';

const DocumentCard = ({ userId, doc, docType, allowDelete, getDocs }) => {
	const handleDeleteDoc = async () => {
		await deleteDocumentAndFile({ userId, docType, docId: doc.id });
		await getDocs();
	};

	return (
		<div className='d-flex flex-column gap-3 p-4 bg-white shadow rounded'>
			<h6>{doc.docName}</h6>
			<div className='d-flex justify-content-around'>
				<a href={doc.fileUrl} target='_blank' rel='noreferrer noopener'>
					<Button variant='success'>
						<FaFilePdf size={20} />
					</Button>
				</a>
				<Button
					variant='danger'
					onClick={handleDeleteDoc}
					disabled={!allowDelete}
				>
					<TiDelete size={20} />
				</Button>
			</div>
		</div>
	);
};

export default DocumentCard;
