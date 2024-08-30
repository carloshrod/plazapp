import { useState } from 'react';
import PlazasContext from './PlazasContext';

const PlazasProvider = ({ children }) => {
	const [plazas, setPlazas] = useState([]);
	const [plaza, setPlaza] = useState({});
	const [stores, setStores] = useState([]);
	const [store, setStore] = useState({});

	const dispatchPlazas = newPlaza => {
		setPlazas([...plazas, newPlaza]);
	};

	const dispatchStores = newStore => {
		setStores([...stores, newStore]);
	};

	const data = {
		plazas,
		setPlazas,
		plaza,
		setPlaza,
		stores,
		setStores,
		store,
		setStore,
		dispatchPlazas,
		dispatchStores,
	};

	return (
		<PlazasContext.Provider value={data}>{children}</PlazasContext.Provider>
	);
};

export default PlazasProvider;
