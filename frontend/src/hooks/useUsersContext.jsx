import { useContext } from 'react';
import UsersContext from '../contexts/users/UsersContext';

const useUsersContext = () => useContext(UsersContext);

export default useUsersContext;
