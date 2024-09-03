import { Calendar, dayjsLocalizer } from 'react-big-calendar';
import dayjs from 'dayjs';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import './CustomCalendar.css';
import Notifications from '../Notifications';
import useUiContext from '../../../hooks/useUiContext';
import NotificationForm from '../../forms/NotificationForm';

dayjs.locale({
	name: 'es-mx',
	months:
		'Enero_Febrero_Marzo_Abril_Mayo_Junio_Julio_Agosto_Septiembre_Octubre_Noviembre_Diciembre'.split(
			'_'
		),
	monthsShort: 'Ene_Feb_Mar_Abr_May_Jun_Jul_Ago_Sep_Oct_Nov_Dic'.split('_'),
	weekdays: 'Domingo_Lunes_Martes_Miércoles_Jueves_Viernes_Sábado'.split('_'),
	weekdaysShort: 'Dom_Lun_Mar_Mié_Jue_Vie_Sáb'.split('_'),
	weekdaysMin: 'Do_Lu_Ma_Mi_Ju_Vi_Sá'.split('_'),
});
const localizer = dayjsLocalizer(dayjs);

const CustomCalendar = ({ storeName }) => {
	const { showModal } = useUiContext();

	const handleDateSelect = ({ start }) => {
		showModal({
			title: 'Agregar notificación',
			children: <NotificationForm selectedDate={start} />,
		});
	};

	return (
		<>
			<h2 className='px-5 mb-0'>{storeName}</h2>
			<div className='wrapper-calendar'>
				<Calendar
					className='calendar'
					selectable
					localizer={localizer}
					onSelectSlot={handleDateSelect}
					onSelectEvent={event => console.log(event)}
					views={['month']}
					messages={{
						previous: 'Anterior',
						next: 'Siguiente',
						today: 'Hoy',
					}}
				/>

				<Notifications
				// handleDeleteNotification={handleDeleteNotification}
				/>
			</div>
		</>
	);
};

export default CustomCalendar;
