import { UserForm } from '../../components';
import { UsersGrid } from '../../components';
import useGlobalContext from '../../hooks/useGlobalContext';
import useUsersContext from '../../hooks/useUsersContext';

const MainDashboard = () => {
	const { showModal } = useGlobalContext();
	const { userAdmins } = useUsersContext();

	const handleAddUser = () => {
		showModal({
			title: 'Agregar administrador',
			children: <UserForm />,
		});
	};

	return (
		<section className='p-4 text-primary'>
			<UsersGrid data={userAdmins} onClick={handleAddUser} />
		</section>
	);
};

export default MainDashboard;
