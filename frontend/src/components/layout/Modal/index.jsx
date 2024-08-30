import { Modal } from 'react-bootstrap';
import useUiContext from '../../../hooks/useUiContext';

const CustomModal = () => {
	const { modal, hideModal } = useUiContext();
	const { isOpen, title, children } = modal;

	return (
		<Modal show={isOpen} onHide={hideModal} centered>
			<Modal.Header closeButton>
				<Modal.Title>{title}</Modal.Title>
			</Modal.Header>
			{children}
		</Modal>
	);
};

export default CustomModal;
