import { StyleSheet, Dimensions } from "react-native";

const SCREEN_WIDTH = Dimensions.get('window').width;

export const styles = StyleSheet.create({
	container: {
		height: 75,
		width: SCREEN_WIDTH,
		backgroundColor: 'white',
		justifyContent: 'center',
		padding: 16,
	},
	box: {
		justifyContent: 'center',
		alignItems: 'center',
		width: 80,
		height: 75,
	},
	delete: {
		backgroundColor: '#FF7F7F',
	},
	edit: {
		backgroundColor: '#3e85c3'
	},
	categoryIcon: {
		padding: 10, 
		borderRadius: 50, 
		flex: 0.1 
	},
	negative: {
		color: "#ff525a"
	},
	textRight: {
		textAlign: 'right', 
	}
});