import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import AuthProvider from './contexts/auth/AuthProvider.jsx';
import GlobalProvider from './contexts/global/GlobalProvider.jsx';
import UsersProvider from './contexts/users/UsersProvider.jsx';

createRoot(document.getElementById('root')).render(
	<AuthProvider>
		<GlobalProvider>
			<UsersProvider>
				<App />
			</UsersProvider>
		</GlobalProvider>
	</AuthProvider>
);
