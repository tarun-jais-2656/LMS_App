import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    safe:{
        flex:1,
    },
    container: {
        alignItems: 'center',
    },
    hat: {
        height: 80,
        width: 80,
    },
    ai: {
        height: 250,
        width: 290,
        right: 100,
    },
    txt: {
        fontSize: 25,
        fontWeight: '600',
        marginVertical: 3,
    },
    txt2: {
        fontSize: 20,
        fontWeight: '700',
    },
    txt1: {
        color: 'grey',
        textAlign:'center'
    },
    btnView:{
        flex:1,
        justifyContent:'flex-end',
        marginBottom:20
    },
    btn: {
        borderWidth: 0.3,
        borderRadius: 10,
        paddingVertical: 15,
        backgroundColor: '#51a6f5',
        marginHorizontal: 20,
    },
    btnTxt: {
        color: '#FFFFFF',
        fontSize: 15,
        fontWeight: '700',
        alignSelf: 'center',
    }
})
export default styles;