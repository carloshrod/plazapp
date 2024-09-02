import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import AuthProvider from './contexts/auth/AuthProvider.jsx';

createRoot(document.getElementById('root')).render(
	<AuthProvider>
		<App />
	</AuthProvider>
);
