import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    welcome: {
        fontSize: 25,
        marginBottom: 50
    },
    containerButton: {
        padding: 15,
        width: 350
    },
    facebookButton: {
        backgroundColor: '#3b5998',
        marginBottom: 3
    },
    facebookTextButton: {
        color: "#fff",
        marginLeft: 15
    },
    googleButton: {
        backgroundColor: '#fff',
        marginBottom: 3
    },
    googleTextButton: {
        color: "#000",
        marginLeft: 15
    },
    mailButton: {
        backgroundColor: '#623aa7',
        marginBottom: 3
    },
    mailTextButton: {
        color: "#fff",
        marginLeft: 15
    },
    createAccount: {
        fontWeight: "700",
        marginTop: 50
    },
    termsTextAlign: {
        position: 'absolute', 
        bottom: 15, 
        padding: 40, 
        textAlign: 'center'
    },
    terms: {
        color: "#4e8df4"
    }
});