import { useContext } from 'react';
import UiContext from '../contexts/ui/UiContext';

const useUiContext = () => useContext(UiContext);

export default useUiContext;
