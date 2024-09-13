import { useEffect, useState } from 'react';
import { changePassword, resetPassword, signIn } from '../services/authService';
import {
	addContactInfo,
	addUserAdmin,
	addUserTenant,
	updateUserTenant,
} from '../services/userServices';
import useUiContext from './useUiContext';
import { addPlaza, addStore } from '../services/plazasService';
import { useParams } from 'react-router-dom';
import useAuthContext from './useAuthContext';

const useForm = (initialForm, dataToEdit = undefined) => {
	const [form, setForm] = useState(initialForm);
	const [loading, setLoading] = useState(false);
	const { loggedUser } = useAuthContext();
	const { hideModal, hideDrawer } = useUiContext();
	const { adminId, plazaId, storeId } = useParams();

	useEffect(() => {
		if (dataToEdit) {
			setForm({
				...initialForm,
				...dataToEdit,
			});
		} else {
			setForm(initialForm);
		}
	}, [initialForm]);

	const handleChange = event => {
		const { value, name } = event.target;
		setForm({
			...form,
			[name]: value,
		});
	};

	const handleSubmitLogin = async () => {
		try {
			setLoading(true);
			if ('password' in form) {
				await signIn(form);
			} else {
				await resetPassword(form);
				console.log('Link enviado al correo con éxito!');
			}
		} catch (error) {
			console.error(error);
		} finally {
			setLoading(false);
		}
	};

	const handleSubmitUserAdmin = async () => {
		try {
			setLoading(true);
			const createdUserAdmin = await addUserAdmin(form);
			console.log('Administrador agregado con éxito!');
			hideModal();
			return createdUserAdmin;
		} catch (error) {
			console.error(error);
		} finally {
			setLoading(false);
		}
	};

	const handleSubmitPlaza = async () => {
		try {
			setLoading(true);
			const createdPlaza = await addPlaza(form, adminId);
			console.log('Plaza agregada con éxito!');
			hideModal();
			return createdPlaza;
		} catch (error) {
			console.error(error);
		} finally {
			setLoading(false);
		}
	};

	const handleSubmitStore = async () => {
		try {
			setLoading(true);
			const createdStore = await addStore(form, plazaId);
			console.log('Local agregado con éxito!');
			hideModal();
			return createdStore;
		} catch (error) {
			console.error(error);
		} finally {
			setLoading(false);
		}
	};

	const handleSubmitUserTenant = async userTenantId => {
		try {
			setLoading(true);
			if (!userTenantId) {
				const createdUserTenant = await addUserTenant(form, storeId);
				console.log('Locatario agregado con éxito!');
				return createdUserTenant;
			} else {
				await updateUserTenant(form, userTenantId);
				console.log('Locatario actualizado con éxito!');
			}
			hideModal();
		} catch (error) {
			console.error(error);
		} finally {
			setLoading(false);
		}
	};

	const handleSubmitContactInfo = async userTenantId => {
		try {
			setLoading(true);
			await addContactInfo(form, userTenantId);
			hideModal();
		} catch (error) {
			console.error(error);
		} finally {
			setLoading(false);
		}
	};

	const handleSubmitPassword = async event => {
		event.preventDefault();
		try {
			setLoading(true);
			await changePassword(form, loggedUser);
			console.log('Contraseña actualizada con éxito!');
			hideDrawer();
		} catch (error) {
			console.error(error);
		} finally {
			setLoading(false);
		}
	};

	return {
		form,
		loading,
		handleChange,
		handleSubmitLogin,
		handleSubmitUserAdmin,
		handleSubmitPlaza,
		handleSubmitStore,
		handleSubmitContactInfo,
		handleSubmitUserTenant,
		handleSubmitPassword,
	};
};

export default useForm;
