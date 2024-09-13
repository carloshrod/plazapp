import { Button, Spinner } from 'react-bootstrap';

const SubmitButton = ({ label, loading }) => {
	return (
		<Button
			className='w-100 fw-bold'
			variant='primary'
			type='submit'
			disabled={loading}
		>
			{!loading ? (
				label
			) : (
				<Spinner
					as='span'
					animation='border'
					size='sm'
					role='status'
					aria-hidden='true'
				/>
			)}
		</Button>
	);
};

export default SubmitButton;
