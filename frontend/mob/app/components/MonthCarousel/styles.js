import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
	itemContainer: {
		backgroundColor: 'floralwhite',
		borderRadius: 50,
		marginRight: 5,
		paddingTop: 5,
		paddingBottom: 5,
	},
	monthText: {
		textAlign: 'center',
		fontSize: 13
	},
	carouselContainer: { flex: 0.2, paddingTop: 20 },
	alignCarouselCenter: { flex: 5, flexDirection: 'row', justifyContent: 'center', marginTop: 10}
});