import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
	content: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
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
});