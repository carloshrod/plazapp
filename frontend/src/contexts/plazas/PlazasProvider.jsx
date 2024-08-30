import { useState } from 'react';
import PlazasContext from './PlazasContext';

const PlazasProvider = ({ children }) => {
	const [plazas, setPlazas] = useState([]);
	const [plaza, setPlaza] = useState({});
	const [stores, setStores] = useState([]);
	const [store, setStore] = useState({});

	const data = { plazas, plaza, stores, store };

	return (
		<PlazasContext.Provider value={data}>{children}</PlazasContext.Provider>
	);
};

export default PlazasProvider;
