const BASE_URL = import.meta.env.VITE_API_URL;

export const env = {
	REGISTER_USER_ENDPOINT: `${BASE_URL}/registerUser`,
	UPDATE_USER_ENDPOINT: `${BASE_URL}/updateUser`,
};
