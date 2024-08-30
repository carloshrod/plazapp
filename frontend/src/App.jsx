import {
	BrowserRouter as Router,
	Routes,
	Route,
	Navigate,
} from 'react-router-dom';
import Login from './pages/Login';
import MainDashboard from './pages/MainDashboard';
import AdminDashboard from './pages/AdminDashboard';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import PublicRoutes from './components/PublicRoutes';
import { PATHS } from './utils/paths';
import PrivateRoutes from './components/PrivateRoutes';
import AuthProvider from './contexts/auth/AuthProvider';

const { LOGIN, ADMIN, PLAZAS } = PATHS;

function App() {
	return (
		<AuthProvider>
			<Router>
				<Routes>
					<Route path='/' element={<Navigate to='/login' replace />} />
					<Route path={LOGIN} element={<PublicRoutes />}>
						<Route index element={<Login />} />
					</Route>
					<Route path={ADMIN} element={<PrivateRoutes />}>
						<Route index element={<MainDashboard />} />
						<Route path={PLAZAS} element={<AdminDashboard />} />
					</Route>
				</Routes>
			</Router>
		</AuthProvider>
	);
}

export default App;
