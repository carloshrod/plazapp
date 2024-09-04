import { useState } from 'react';
import { signIn } from '../services/authService';
import {
	addContactInfo,
	addUserAdmin,
	addUserTenant,
} from '../services/userServices';
import useUiContext from './useUiContext';
import { addPlaza, addStore } from '../services/plazasService';
import { useParams } from 'react-router-dom';

const useForm = initialForm => {
	const [form, setForm] = useState(initialForm);
	const [loading, setLoading] = useState(false);
	const { hideModal } = useUiContext();
	const { adminId, plazaId, storeId } = useParams();

	const handleChange = event => {
		const { value, name } = event.target;
		setForm({
			...form,
			[name]: value,
		});
	};

	const handleSubmitLogin = async event => {
		event.preventDefault();
		try {
			setLoading(true);
			await signIn(form.email, form.password);
		} catch (error) {
			console.error(error);
		} finally {
			setLoading(false);
		}
	};

	const handleSubmitUser = async () => {
		try {
			setLoading(true);
			if (!storeId) {
				const createdUserAdmin = await addUserAdmin(form);
				console.log('Administrador agregado con éxito!');
				return createdUserAdmin;
			} else {
				const createdUserTenant = await addUserTenant(form, storeId);
				console.log('Locatario agregado con éxito!');
				return createdUserTenant;
			}
		} catch (error) {
			console.error(error);
		} finally {
			setLoading(false);
			hideModal();
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

	const handleSubmitContactInfo = async userTenantId => {
		try {
			setLoading(true);
			console.log(form, userTenantId);
			await addContactInfo(form, userTenantId);
			hideModal();
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
		handleSubmitUser,
		handleSubmitPlaza,
		handleSubmitStore,
		handleSubmitContactInfo,
	};
};

export default useForm;
