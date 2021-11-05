import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
	content: {
		padding: 20,
		height: '60%',
		borderTopLeftRadius: 50,
		borderTopRightRadius: 50,
		backgroundColor: 'white',
		borderColor: 'rgba(0, 0, 0, 0.1)'
	},
	alignCenter: { 
		flex: 1, 
		alignItems: 'center', 
		justifyContent: 'center' 
	},
	categoryIcon: {
		padding: 10, 
		borderRadius: 50,
	},
	paymentTypeText: { 
		fontSize: 17, 
		fontWeight: '700', 
		marginBottom: 15, 
		marginLeft: 15 
	},
	bankImg: { 
		width: 40, 
		height: 40,
		borderRadius: 50 
	},
	name: { 
		fontSize: 13, 
		color: '#000', 
		marginLeft: 10, 
		marginTop: 10 
	}
});