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