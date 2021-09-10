import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
	container: {
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
	balanceContainer: {
		marginTop: 10,
		paddingLeft: 40,
		paddingRight: 40,
		paddingTop: 20,
		paddingBottom: 15
	},
	row: {
		flexDirection: 'row'
	},
	positive: {
		fontSize: 20,
		marginBottom: 0,
		color: "#118C4F"
	},
	negative: { 
		fontSize: 20, 
		marginBottom: 0, 
		color: "#ff525a" 
	},
	alignCenter: { 
		flex: 1, 
		alignItems: 'center', 
		justifyContent: 'center'
	}
})