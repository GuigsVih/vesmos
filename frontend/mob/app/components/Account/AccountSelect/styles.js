import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
	container: {
		borderRadius: 4,
		backgroundColor: '#f6f6f6'
	},
	text: {
		color: "#737373",
		fontSize: 15
	},
	toEnd: {
        flex: 1,
		alignItems: "flex-end"
	},
    bankImg: {
        width: 30,
        height: 30,
        borderRadius: 50
    },
	accountName: { 
		marginLeft: 10, 
		marginTop: 5, 
		fontSize: 13, 
		color: "#000" 
	}
});