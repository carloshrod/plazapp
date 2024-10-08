const PlazaInfo = ({ plaza }) => {
	const { bankInfo, adminInfo } = plaza ?? {};

	return bankInfo || adminInfo ? (
		<section className='d-flex gap-5 p-4'>
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
			<div
				className='d-flex flex-column gap-3'
				style={{ width: 400, minWidth: 300 }}
			>
				<h5 className='border-bottom border-primary border-4 pb-2'>
					Información del Admin
				</h5>
				{!adminInfo?.isSociety ? (
					<>
						<span>
							<span className='fw-bold'>Nombre: </span>
							{plaza?.adminInfo?.name}
						</span>
						<span>
							<span className='fw-bold'>RFC: </span>
							{plaza?.adminInfo?.rfc}
						</span>
					</>
				) : (
					<>
						<span>
							<span className='fw-bold'>Razón o Denominación: </span>
							{plaza?.adminInfo?.businessName}
						</span>
						<span>
							<span className='fw-bold'>N° de Escritura: </span>
							{plaza?.adminInfo?.deedNumber}
						</span>
						<span>
							<span className='fw-bold'>N° de Notaría: </span>
							{plaza?.adminInfo?.notaryOfficeNumber}
						</span>
						<span>
							<span className='fw-bold'>Ciudad de Notaría: </span>
							{plaza?.adminInfo?.notaryOfficeCity}
						</span>
					</>
				)}
			</div>
		</section>
	) : null;
};

export default PlazaInfo;
