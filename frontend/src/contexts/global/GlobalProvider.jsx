import { useState } from 'react';
import GlobalContext from './GlobalContext';

const initialModal = {
	isOpen: false,
	title: '',
	children: null,
};

const GlobalProvider = ({ children }) => {
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

	return (
		<GlobalContext.Provider value={data}>{children}</GlobalContext.Provider>
	);
};

export default GlobalProvider;
