import { useState } from 'react';
import UiContext from './UiContext';

const initialModal = {
	isOpen: false,
	title: '',
	children: null,
};

const initialDrawer = {
	show: false,
	title: '',
	children: null,
};

const UiProvider = ({ children }) => {
	const [modal, setModal] = useState(initialModal);
	const [drawer, setDrawer] = useState(initialDrawer);

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

	const showDrawer = ({ title, children }) => {
		setDrawer({
			show: true,
			title,
			children,
		});
	};

	const hideDrawer = () => {
		setDrawer(initialDrawer);
	};

	const data = { modal, showModal, hideModal, drawer, showDrawer, hideDrawer };

	return <UiContext.Provider value={data}>{children}</UiContext.Provider>;
};

export default UiProvider;
