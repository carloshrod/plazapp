import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';

const styles = StyleSheet.create({
	page: {
		padding: 30,
		fontSize: 12,
		fontFamily: 'Helvetica',
	},
	header: {
		fontSize: 20,
		textAlign: 'center',
		marginBottom: 20,
		textTransform: 'uppercase',
		fontWeight: 'bold',
	},
	section: {
		marginBottom: 10,
	},
	title: {
		fontSize: 14,
		fontWeight: 'bold',
		marginBottom: 4,
		textDecoration: 'underline',
	},
	paragraph: {
		textAlign: 'justify',
		marginBottom: 8,
		lineHeight: 1.5,
	},
});

const PDFDocument = ({ docType, userTenant }) => {
	return (
		<Document>
			<Page style={styles.page}>
				<Text style={styles.header}>{docType.split('-').join(' ')}</Text>

				<View style={styles.section}>
					<Text style={styles.title}>Entre las partes</Text>
					<Text style={styles.paragraph}>
						Este contrato es celebrado entre {userTenant?.name}, con domicilio
						en {userTenant?.address}, en adelante El Cliente, y Alberto Medina,
						con domicilio en Calle 123, en adelante El Administrador.
					</Text>
				</View>

				<View style={styles.section}>
					<Text style={styles.title}>Objeto del contrato</Text>
					<Text style={styles.paragraph}>
						El presente contrato tiene por objeto la prestación de servicios de
						[Descripción del Servicio] por parte de El Proveedor a El Cliente,
						bajo los términos y condiciones establecidos en el presente
						documento.
					</Text>
				</View>

				<View style={styles.section}>
					<Text style={styles.paragraph}>
						El Proveedor se compromete a realizar los servicios detallados a
						continuación de forma diligente y profesional:
					</Text>
					<Text style={styles.paragraph}>
						Lorem ipsum dolor sit amet consectetur adipisicing elit. In cumque
						aperiam nisi? Numquam neque dolorem voluptatum repellat fugiat
						suscipit, commodi hic consequatur, incidunt assumenda similique
						blanditiis praesentium ipsa libero laboriosam.
					</Text>
					<Text style={styles.paragraph}>
						Lorem ipsum, dolor sit amet consectetur adipisicing elit. Amet earum
						magnam repellendus deserunt vero, cupiditate omnis iusto?
						Consequuntur quisquam cumque quidem officiis, mollitia culpa qui
						harum, sint impedit velit similique?
					</Text>
					<Text style={styles.paragraph}>
						Lorem ipsum dolor sit, amet consectetur adipisicing elit. Obcaecati
						similique quis possimus odit tempora consequatur in, asperiores unde
						ipsam doloribus quaerat aspernatur perferendis provident dolor
						ullam! Ut quia earum facere!
					</Text>
				</View>
			</Page>
		</Document>
	);
};

export default PDFDocument;
