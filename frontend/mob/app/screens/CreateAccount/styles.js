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
    title: {
        fontSize: 25,
        fontFamily: 'FuturaPT-Medium',
        marginLeft: 20,
        color: "#fff",
    },
    titleContainer: {
        padding: 20,
        backgroundColor: '#623aa7'
    },
    buttonStyle: {
        padding: 8,
        marginTop: 25
    },
    input: {
        margin: 40,
        marginTop: 5,
        marginBottom: 10,
        borderRadius: 50
    },
	currencyInput: {
		marginTop: 15,
		marginBottom: 0,
        fontSize: 16,
        paddingTop: 7,
        paddingLeft: 15,
		borderRadius: 4,
        paddingBottom: 7,
        fontWeight: "400",
		backgroundColor: "#f6f6f6"
	},
});