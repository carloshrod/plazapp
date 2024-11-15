import { UserForm } from '../../components';
import { UsersGrid } from '../../components';
import useUiContext from '../../hooks/useUiContext';

const Main = () => {
	const { showModal } = useUiContext();

	const handleAddUserAdmin = () => {
		showModal({
			title: 'Agregar administrador',
			children: <UserForm />,
		});
	};

	return (
		<section className='p-4 text-primary'>
			<UsersGrid onClick={handleAddUserAdmin} />
		</section>
	);
};

export default Main;
