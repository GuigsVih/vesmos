import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    balanceContainer: {
        marginTop: 10,
		marginLeft: 28,
        paddingLeft: 40,
        paddingRight: 40,
        paddingTop: 20,
        paddingBottom: 15
    },
	row: {
		flexDirection: 'row'
	},
	positive: {
		fontSize: 15,
		marginBottom: 0,
		color: "#118C4F"
	},
	negative: { 
		fontSize: 15, 
		marginBottom: 0, 
		color: "#ff525a" 
	},
	normal: {
		fontSize: 15,
		marginBottom: 0,
		color: "#000"
	},
	arrowPosition: { 
		flex: 1, 
		alignItems: 'center', 
		padding: 10, 
		marginRight: 40,
	}
});