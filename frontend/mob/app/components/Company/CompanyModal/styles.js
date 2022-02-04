import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    content: {
        padding: 20,
        height: '40%',
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
    name: {
        fontSize: 13,
        color: '#000',
        marginLeft: 10,
        marginTop: 10
    },
    bankImg: {
        width: 40,
        height: 40,
        borderRadius: 50,
        marginLeft: 20
    },
    title: {
        fontSize: 19,
        fontWeight: '700',
        marginTop: 30,
        marginBottom: 15,
        marginLeft: 15
    }
});