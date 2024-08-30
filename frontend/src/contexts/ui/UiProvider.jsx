import { useState } from 'react';
import UiContext from './UiContext';

const initialModal = {
	isOpen: false,
	title: '',
	children: null,
};

const UiProvider = ({ children }) => {
	const [modal, setModal] = useState(initialModal);

	const showModal = ({ title, children }) => {
		setModal({
			isOpen: true,
			title,
			children,
		});
	};

	const hideModal = () => {
		setModal(initialModal);
	};

	const data = { modal, showModal, hideModal };

	return <UiContext.Provider value={data}>{children}</UiContext.Provider>;
};

export default UiProvider;
