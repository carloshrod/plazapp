import { getDownloadURL, getStorage, ref, uploadBytes } from 'firebase/storage';

const storage = getStorage();

export const generateImageURL = async ({ file, docType }) => {
	const now = new Date();
	const formattedDate = now
		.toISOString()
		.replace(/[:-]/g, '')
		.replace('T', '-')
		.replace(/\.\d{3}Z/, '');
	const imageName = `doc-${formattedDate}`;
	const filePath = `${docType}/${imageName}`;
	const storageRef = ref(storage, filePath);

	const imageSnapshot = await uploadBytes(storageRef, file);

	if (!imageSnapshot) throw new Error('Ocurrió un error al subir la imágen!');

	const imageUrl = await getDownloadURL(imageSnapshot.ref);

	return imageUrl;
};
