const BASE_URL = import.meta.env.VITE_API_URL;
const isProduction = import.meta.env.NODE_ENV === 'production';

export const env = {
	REGISTER_USER_ENDPOINT: isProduction
		? import.meta.env.VITE_API_REGISTER_USER_ENDPOINT
		: `${BASE_URL}/registerUser`,
	UPDATE_USER_ENDPOINT: isProduction
		? import.meta.env.VITE_API_UPDATE_USER_ENDPOINT
		: `${BASE_URL}/updateUser`,
};
