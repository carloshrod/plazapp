import { Button } from 'react-bootstrap';
import { TiDelete } from 'react-icons/ti';
import { FaFilePdf } from 'react-icons/fa6';

const DocumentCard = ({ docName, fileUrl }) => {
	return (
		<div className='d-flex flex-column gap-3 p-4 bg-white shadow rounded'>
			<h6>{docName}</h6>
			<div className='d-flex justify-content-around'>
				<a href={fileUrl} target='_blank' rel='noreferrer noopener'>
					<Button variant='success'>
						<FaFilePdf size={20} />
					</Button>
				</a>
				<Button variant='danger'>
					<TiDelete size={20} />
				</Button>
			</div>
		</div>
	);
};

export default DocumentCard;
