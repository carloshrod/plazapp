import { UserForm } from '../../components';
import { UsersGrid } from '../../components';
import useUiContext from '../../hooks/useUiContext';
import useUsersContext from '../../hooks/useUsersContext';

const MainDashboard = () => {
	const { showModal } = useUiContext();
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
