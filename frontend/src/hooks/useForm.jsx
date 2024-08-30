import { useState } from 'react';
import { signIn } from '../services/authService';
import { addUser } from '../services/userServices';
import useGlobalContext from './useGlobalContext';

const useForm = initialForm => {
	const [form, setForm] = useState(initialForm);
	const [loading, setLoading] = useState(false);
	const { hideModal } = useGlobalContext();

	const handleChange = e => {
		const { value, name } = e.target;
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
			const createdUser = await addUser(form);
			console.log('Usuario agregado con éxito!');
			hideModal();
			return createdUser;
		} catch (error) {
			console.error(error);
		} finally {
			setLoading(false);
		}
	};

	return { form, loading, handleChange, handleSubmitLogin, handleSubmitUser };
};

export default useForm;
