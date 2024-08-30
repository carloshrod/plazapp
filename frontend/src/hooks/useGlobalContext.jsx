import { useContext } from 'react';
import GlobalContext from '../contexts/global/GlobalContext';

const useGlobalContext = () => useContext(GlobalContext);

export default useGlobalContext;
