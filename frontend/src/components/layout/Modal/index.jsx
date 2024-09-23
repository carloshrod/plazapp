import { Modal } from 'react-bootstrap';
import useUiContext from '../../../hooks/useUiContext';

const CustomModal = () => {
	const { modal, hideModal } = useUiContext();
	const { isOpen, title, children, onHide } = modal;

	return (
		<Modal show={isOpen} onHide={onHide ? () => hideModal() : null} centered>
			<Modal.Header closeButton={onHide}>
				<Modal.Title className='ms-3 text-primary'>{title}</Modal.Title>
			</Modal.Header>
			{children}
		</Modal>
	);
};

export default CustomModal;
