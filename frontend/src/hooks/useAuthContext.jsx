import { useContext } from 'react';
import AuthContext from '../contexts/auth/authContext';

const useAuthContext = () => useContext(AuthContext);

export default useAuthContext;
