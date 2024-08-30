import { getDocs } from 'firebase/firestore';

export const fetchData = async query => {
	try {
		const querySnapshot = await getDocs(query);
		const array = [];
		querySnapshot.forEach(doc => {
			array.push(doc.data());
		});
		return array;
	} catch (error) {
		console.error(error);
	}
};
