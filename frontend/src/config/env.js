const BASE_URL = import.meta.env.VITE_API_URL;
const isDev = import.meta.env.NODE_ENV === 'development';

export const env = {
	REGISTER_USER_ENDPOINT: isDev
		? `${BASE_URL}/registerUser`
		: import.meta.env.VITE_API_REGISTER_USER_ENDPOINT,
	UPDATE_USER_ENDPOINT: isDev
		? `${BASE_URL}/updateUser`
		: import.meta.env.VITE_API_UPDATE_USER_ENDPOINT,
};
