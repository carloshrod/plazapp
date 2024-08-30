import { Modal } from 'react-bootstrap';
import useGlobalContext from '../../hooks/useGlobalContext';

const CustomModal = () => {
	const { modal, hideModal } = useGlobalContext();
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
