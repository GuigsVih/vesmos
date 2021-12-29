import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
        borderRadius: 8,
        backgroundColor: "#fff"
    },
    title: {
        fontSize: 20,
        color: "#000",
        marginBottom: 10,
        marginLeft: 10,
        marginTop: 10,
        fontFamily: "MavenPro-Bold"
    },
    createAccountContainer: {
        flex: 1,
        alignItems: "flex-end",
        justifyContent: "center",
        marginRight: 20,
        marginTop: 5
    },
    createAccountButton: {
        padding: 5, 
        borderRadius: 50, 
        backgroundColor: "#009c49"
    },
	bankImg: { 
		width: 40, 
		height: 40,
		borderRadius: 50,
        marginTop: 5
	},
    alignBalance: {
        flex: 10, 
        alignItems: "flex-end",
        justifyContent: "flex-end"
    },
    balanceText: {
        color: "#000",
        fontFamily: "MavenPro-Medium"
    }
});