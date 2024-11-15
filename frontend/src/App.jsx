import {
	BrowserRouter as Router,
	Routes,
	Route,
	Navigate,
} from 'react-router-dom';
import UiProvider from './contexts/ui/UiProvider';
import { PublicRoutes, PrivateRoutes } from './components';
import { Admin, Login, Main, Plaza, Store } from './pages';
import { PATHS } from './utils/paths';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import useAuthContext from './hooks/useAuthContext';

const { HOME, LOGIN, SUPERADMIN, ADMIN, STORES, STORE, TENANT } = PATHS;

function App() {
	const { loggedUser } = useAuthContext();
	const { role } = loggedUser ?? {};

	return (
		<UiProvider>
			<Router>
				<Routes>
					<Route path={HOME} element={<PublicRoutes />}>
						<Route index element={<Navigate to='/login' replace />} />
						<Route path={LOGIN} element={<Login />} />
					</Route>
					<Route path={SUPERADMIN} element={<PrivateRoutes />}>
						<Route index element={role === 'superadmin' ? <Main /> : null} />
						{role !== 'tenant' ? (
							<>
								<Route path={ADMIN} element={<Admin />} />
								<Route path={STORES} element={<Plaza />} />
								<Route path={STORE} element={<Store />} />
							</>
						) : (
							<Route path={TENANT} element={<Store />} />
						)}
					</Route>
				</Routes>
			</Router>
		</UiProvider>
	);
}

export default App;
