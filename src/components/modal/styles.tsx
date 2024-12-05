import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    flx: {
        flexDirection: 'row',
    },
    img: { height: 20, width: 20 },
    modalsContent: {
        backgroundColor: '#E6EDF3',
        padding: 30,
        // alignItems: 'center',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        height: '40%',
    },
    modal: {
        justifyContent: 'flex-end',
        margin: 0,
    },
    head: {
        fontSize: 18,
        fontWeight: '700',
        // alignSelf: 'center'
    },
    card: {
        marginTop: 20,
        color: 'grey'
    },
    input: {
        borderWidth: 1,
        borderColor: 'grey',
        paddingVertical: 10,
        borderTopRightRadius: 10,
        borderTopLeftRadius: 10,
        paddingHorizontal: 10,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    input1: {
        borderWidth: 1,
        borderColor: 'grey',
        paddingVertical: 10,
        borderBottomLeftRadius: 10,
        paddingHorizontal: 10,
        width: '50%'
    },
    input2: {
        borderWidth: 1,
        borderColor: 'grey',
        paddingVertical: 10,
        borderBottomRightRadius: 10,
        paddingHorizontal: 10,
        width: '50%'
    },
    btn: {
        backgroundColor: '#51a6f5',
        borderRadius: 10,
        paddingVertical: 10,
        marginTop: 30
    },
    btntxt: {
        fontSize: 18,
        fontWeight: '700',
        color: '#FFFFFF',
        alignSelf: 'center'
    }
})

export default styles;