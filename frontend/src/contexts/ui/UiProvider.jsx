import { useState } from 'react';
import UiContext from './UiContext';

const initialModal = {
	isOpen: false,
	title: '',
	children: null,
	onHide: true,
};

const initialDrawer = {
	show: false,
	title: '',
	children: null,
};

const UiProvider = ({ children }) => {
	const [modal, setModal] = useState(initialModal);
	const [drawer, setDrawer] = useState(initialDrawer);

	const showModal = ({ title, children, onHide = true }) => {
		setModal({
			isOpen: true,
			title,
			children,
			onHide,
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
