import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
	container: {
		backgroundColor: "#623aa7",
		flex: 1
	},
	formContainer: {
		flex: 2,
		borderTopLeftRadius: 40,
		borderTopRightRadius: 40,
		backgroundColor: '#fdfdfc',
		shadowColor: "#000",
		shadowOpacity: 0.8,
		shadowRadius: 2,
		shadowOffset: {
			height: 1,
			width: 1
		}
	},
	releaseTypeContainer: {
		padding: 20,
		backgroundColor: '#623aa7'
	},
	typeText: {
		fontSize: 25,
		fontFamily: 'FuturaPT-Medium',
		marginLeft: 20,
		color: "#fff",
	},
	descriptionInput: {
		margin: 40,
		marginTop: 30,
		marginBottom: 20
	},
	currencyInput: {
		borderTopLeftRadius: 5,
		borderTopRightRadius: 5,
		margin: 40,
		marginTop: 30,
		marginBottom: 0,
		paddingLeft: 10,
		paddingTop: 23,
		paddingBottom: 23,
		fontSize: 40,
		fontFamily: "MavenPro-Regular",
		backgroundColor: "#e7e7e7"
	},
	categoryContainer: {
		margin: 40, 
		marginTop: 8, 
		marginBottom: 20
	}
});