export const LOGIN_INPUTS = [
	{
		id: 'idEmail',
		name: 'email',
		label: 'Email',
	},
	{
		id: 'idPassword',
		name: 'password',
		label: 'Contraseña',
		type: 'password',
	},
];

export const FORGOT_PASSWORD_INPUTS = [
	{
		id: 'idEmail',
		name: 'email',
		label: 'Email',
	},
];

export const USER_INPUTS = [
	{
		id: 'idName',
		name: 'name',
		label: 'Nombre',
	},
	{
		id: 'idEmail',
		name: 'email',
		label: 'Email',
	},
];

export const PLAZA_INPUTS = [
	{
		id: 'idName',
		name: 'name',
		label: 'Nombre',
	},
	{
		id: 'idNumber',
		name: 'number',
		label: 'N° de plaza',
		type: 'number',
	},
];

export const INFO_PLAZA_INPUTS = [
	{
		id: 'idAccountNumber',
		name: 'accountNumber',
		label: 'N° de Cuenta',
		type: 'number',
	},
	{
		id: 'idIbanKey',
		name: 'ibanKey',
		label: 'Clave Interbancaria',
	},
	{
		id: 'idBankName',
		name: 'bankName',
		label: 'Banco',
	},
	{
		id: 'idIsSociety',
		label: '¿Es una sociedad?',
		type: 'switch',
	},
	{
		id: 'idBusinessName',
		name: 'businessName',
		label: 'Razón o Denominación',
	},
	{
		id: 'idDeedNumber',
		name: 'deedNumber',
		label: 'N° de Escritura',
		type: 'number',
	},
	{
		id: 'idDeedDate',
		name: 'deedDate',
		label: 'Fecha de Escritura',
		type: 'date',
	},
	{
		id: 'idNotaryOfficeNumber',
		name: 'notaryOfficeNumber',
		label: 'N° de Notaría',
		type: 'number',
	},
	{
		id: 'idNotaryOfficeCity',
		name: 'notaryOfficeCity',
		label: 'Ciudad de la Notaría',
	},
	{
		id: 'idMerchInvoice',
		name: 'merchInvoice',
		label: 'Folio Mercantil',
		type: 'number',
	},
	{
		id: 'idIsSignerAuthorized',
		label: '¿El firmante está facultado en este instrumento?',
		type: 'switch',
	},
];

export const STORE_INPUTS = [
	{
		id: 'idName',
		name: 'name',
		label: 'Nombre',
	},
	{
		id: 'idNumber',
		name: 'number',
		label: 'N° de local',
		type: 'number',
	},
];

export const CONTACT_INFO_INPUTS = [
	{
		id: 'idName',
		name: 'name',
		label: 'Nombre',
	},
	{
		id: 'idEmail',
		name: 'email',
		label: 'Email',
	},
	{
		id: 'idPhoneNumber',
		name: 'phoneNumber',
		label: 'N° de teléfono',
	},
	{
		id: 'idAddress',
		name: 'address',
		label: 'Dirección',
	},
	{
		id: 'idGuarantorName',
		name: 'guarantorName',
		label: 'Nombre',
	},
	{
		id: 'idGuarantorEmail',
		name: 'guarantorEmail',
		label: 'Email',
		type: 'email',
	},
	{
		id: 'idGuarantorPhone',
		name: 'guarantorPhone',
		label: 'N° de teléfono',
	},
];

export const PASSWORD_INPUTS = [
	{
		id: 'idCurrentPassword',
		name: 'currentPassword',
		label: 'Contraseña actual',
	},
	{
		id: 'idNewPassword',
		name: 'newPassword',
		label: 'Contraseña nueva',
	},
];

export const DOC_TYPES = [
	{
		value: 'general',
		label: 'Generales',
	},
	{
		value: 'invoices',
		label: 'Facturas',
	},
	{
		value: 'paymentReceipts',
		label: 'Comprobantes de Pago',
	},
	{
		value: 'electricity',
		label: 'Electricidad',
	},
	{
		value: 'water',
		label: 'Agua',
	},
];

export const DOCUMENT_INPUTS = [
	{
		id: 'idDocType',
		name: 'docType',
		label: 'Tipo de documento',
		optionDefault: 'Selecciona un tipo de documento',
		options: DOC_TYPES,
	},
	{
		id: 'idDocName',
		name: 'docName',
		label: 'Nombre del documento',
		optionDefault: 'Selecciona un nombre de documento',
	},
];

export const GENERAL_DOCS_OPTIONS = [
	{
		value: 'Documento 1',
		label: 'Documento 1',
	},
	{
		value: 'Documento 2',
		label: 'Documento 2',
	},
	{
		value: 'Documento 3',
		label: 'Documento 3',
	},
	{
		value: 'Documento 4',
		label: 'Documento 4',
	},
	{
		value: 'Documento 5',
		label: 'Documento 5',
	},
	{
		value: 'Documento 6',
		label: 'Documento 6',
	},
	{
		value: 'Documento 7',
		label: 'Documento 7',
	},
	{
		value: 'Documento 8',
		label: 'Documento 8',
	},
	{
		value: 'Documento 9',
		label: 'Documento 9',
	},
	{
		value: 'Documento 10',
		label: 'Documento 10',
	},
	{
		value: 'Documento 11',
		label: 'Documento 11',
	},
	{
		value: 'Documento 12',
		label: 'Documento 12',
	},
];

export const MONTHLY_DOCS_OPTIONS = [
	{
		value: 'Enero',
		label: 'Enero',
	},
	{
		value: 'Febrero',
		label: 'Febrero',
	},
	{
		value: 'Marzo',
		label: 'Marzo',
	},
	{
		value: 'Abril',
		label: 'Abril',
	},
	{
		value: 'Mayo',
		label: 'Mayo',
	},
	{
		value: 'Junio',
		label: 'Junio',
	},
	{
		value: 'Julio',
		label: 'Julio',
	},
	{
		value: 'Agosto',
		label: 'Agosto',
	},
	{
		value: 'Septiembre',
		label: 'Septiembre',
	},
	{
		value: 'Octubre',
		label: 'Octubre',
	},
	{
		value: 'Noviembre',
		label: 'Noviembre',
	},
	{
		value: 'Diciembre',
		label: 'Diciembre',
	},
];

export const GEN_DOCS_DICTIONARY = {
	'Documento 1': 1,
	'Documento 2': 2,
	'Documento 3': 3,
	'Documento 4': 4,
	'Documento 5': 5,
	'Documento 6': 6,
	'Documento 7': 7,
	'Documento 8': 8,
	'Documento 9': 9,
	'Documento 10': 10,
	'Documento 11': 11,
	'Documento 12': 12,
};

export const MONTHS_DICTIONARY = {
	Enero: 1,
	Febrero: 2,
	Marzo: 3,
	Abril: 4,
	Mayo: 5,
	Junio: 6,
	Julio: 7,
	Agosto: 8,
	Septiembre: 9,
	Octubre: 10,
	Noviembre: 11,
	Diciembre: 12,
};

export const TYPE_DOCS_OPTIONS = [
	{
		value: 'contrato-de-arrendamiento',
		label: 'Contrato de arrendamiento',
	},
	{
		value: 'convenio-de-terminación',
		label: 'Convenio de terminación',
	},
	{
		value: 'recibo-de-pago',
		label: 'Recibo de pago',
	},
	{
		value: 'recibo-de-deposito-en-garantia',
		label: 'Recibo de depósito en garantía',
	},
];
