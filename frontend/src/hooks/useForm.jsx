import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { changePassword, resetPassword, signIn } from '../services/authService';
import {
	addContactInfo,
	addUserAdmin,
	addUserTenant,
	updateUserTenant,
} from '../services/userServices';
import { addInfoPlaza, addPlaza, addStore } from '../services/plazasService';
import { uploadDocument } from '../services/documentServices';
import useUiContext from './useUiContext';
import useAuthContext from './useAuthContext';

const useForm = (initialForm, dataToEdit = undefined) => {
	const [form, setForm] = useState(initialForm);
	const [loading, setLoading] = useState(false);
	const [file, setFile] = useState(null);
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

	const handleFileChange = event => {
		if (event.target.files && event.target.files.length > 0) {
			const file = event.target.files[0];

			if (
				file.type === 'application/pdf' ||
				file.name.toLowerCase().endsWith('.pdf')
			) {
				setFile(file);
			} else {
				console.warn(`Solo se permiten archivos PDF. Seleccionó: ${file.name}`);
			}
		}
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
				hideModal();
				return createdUserTenant;
			} else {
				await updateUserTenant(form, userTenantId);
				console.log('Locatario actualizado con éxito!');
				hideModal();
			}
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

	const handleSubmitPlazaInfo = async (options, plazaId) => {
		try {
			setLoading(true);
			const plazaInfo = { ...form, ...options };
			await addInfoPlaza(plazaInfo, plazaId);
			hideModal();
			console.log(
				`Información ${
					dataToEdit?.accountNumber ? 'actualizada' : 'agregada'
				} con éxito!`
			);
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

	const handleSubmitDocument = async userId => {
		try {
			setLoading(true);
			await uploadDocument({
				userId,
				file,
				docName: form.docName,
				docType: form.docType,
			});
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
		file,
		handleChange,
		handleFileChange,
		handleSubmitLogin,
		handleSubmitUserAdmin,
		handleSubmitPlaza,
		handleSubmitStore,
		handleSubmitContactInfo,
		handleSubmitPlazaInfo,
		handleSubmitUserTenant,
		handleSubmitPassword,
		handleSubmitDocument,
	};
};

export default useForm;
