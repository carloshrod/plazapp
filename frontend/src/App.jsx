import {
	BrowserRouter as Router,
	Routes,
	Route,
	Navigate,
} from 'react-router-dom';
import AuthProvider from './contexts/auth/AuthProvider';
import GlobalProvider from './contexts/global/GlobalProvider';
import { PublicRoutes, PrivateRoutes } from './components';
import { Login, MainDashboard, PlazasDashboard } from './pages';
import { PATHS } from './utils/paths';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

const { HOME, LOGIN, ADMIN, PLAZAS } = PATHS;

function App() {
	return (
		<GlobalProvider>
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
		</GlobalProvider>
	);
}

export default App;
