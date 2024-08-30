import {
	BrowserRouter as Router,
	Routes,
	Route,
	Navigate,
} from 'react-router-dom';
import AuthProvider from './contexts/auth/AuthProvider';
import Login from './pages/Login';
import MainDashboard from './pages/MainDashboard';
import PlazasDashboard from './pages/PlazasDashboard';
import PublicRoutes from './components/PublicRoutes';
import PrivateRoutes from './components/PrivateRoutes';
import { PATHS } from './utils/paths';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

const { HOME, LOGIN, ADMIN, PLAZAS } = PATHS;

function App() {
	return (
		<AuthProvider>
			<Router>
				<Routes>
					<Route path={HOME} element={<PublicRoutes />}>
						<Route index element={<Navigate to='/login' replace />} />
						<Route path={LOGIN} element={<Login />} />
					</Route>
					<Route path={ADMIN} element={<PrivateRoutes />}>
						<Route index element={<MainDashboard />} />
						<Route path={PLAZAS} element={<PlazasDashboard />} />
					</Route>
				</Routes>
			</Router>
		</AuthProvider>
	);
}

export default App;
