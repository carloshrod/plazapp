import {
	BrowserRouter as Router,
	Routes,
	Route,
	Navigate,
} from 'react-router-dom';
import Login from './pages/Login';
import MainDashboard from './pages/MainDashboard';
import Header from './components/Header';
import AdminDashboard from './pages/AdminDashboard';
import CustomModal from './components/Modal';
import useAuthContext from './hooks/useAuthContext';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

function App() {
	const { isAuth } = useAuthContext();

	return (
		<Router>
			{isAuth ? (
				<>
					<Header />
					<h2 className='text-primary px-4 m-4 fw-bold'>Dashboard</h2>
				</>
			) : null}
			<Routes>
				<Route path='/' element={<Navigate to='/login' replace />} />
				<Route
					path='/login'
					element={isAuth ? <Navigate to='/admin-panel' replace /> : <Login />}
				/>
				<Route
					path='/admin-panel'
					element={
						isAuth ? <MainDashboard /> : <Navigate to='/login' replace />
					}
				/>
				<Route path='/admin-panel/:id' element={<AdminDashboard />} />
			</Routes>
			<CustomModal />
		</Router>
	);
}

export default App;
