const PlazaInfo = ({ plaza }) => {
	const { bankInfo, adminInfo } = plaza ?? {};

	return bankInfo || adminInfo ? (
		<section className='d-flex gap-5 p-4'>
			{bankInfo ? (
				<div
					className='d-flex flex-column gap-3'
					style={{ width: 400, minWidth: 300 }}
				>
					<h5 className='border-bottom border-primary border-4 pb-2'>
						Información Bancaria
					</h5>
					<span>
						<span className='fw-bold'>N° de cuenta: </span>
						{plaza?.bankInfo?.accountNumber}
					</span>
					<span>
						<span className='fw-bold'>Banco: </span>
						{plaza?.bankInfo?.bankName}
					</span>
				</div>
			) : null}
			{adminInfo.isSociety ? (
				<div
					className='d-flex flex-column gap-3'
					style={{ width: 400, minWidth: 300 }}
				>
					<h5 className='border-bottom border-primary border-4 pb-2'>
						Información del Admin
					</h5>
					<span>
						<span className='fw-bold'>Razón o Denominación: </span>
						{plaza?.adminInfo?.businessName}
					</span>
					<span>
						<span className='fw-bold'>N° de Escritura: </span>
						{plaza?.adminInfo?.deedNumber}
					</span>
				</div>
			) : null}
		</section>
	) : null;
};

export default PlazaInfo;
