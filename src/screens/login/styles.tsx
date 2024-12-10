import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '##e6ecf2'
    },
    imgView: {
        alignItems: 'center'
    },
    txt: {
        fontSize: 25,
        fontWeight: '700'
    },
    txt1: {
        color: 'grey'
    },
    signin: {
        height: 300,
        width: 300
    },
    email: {
        height: 25,
        width: 25,
        alignSelf: 'center'
    },
    eye: {
        height: 25,
        width: 25,
        alignSelf: 'center',
    },
    textInput: {
        marginHorizontal: 15,
        color:'#000000',
        width:'85%'
    },
    emailView: {
        backgroundColor: '#FFFFFF',
        marginHorizontal: 25,
        marginTop: 20,
        borderRadius: 10,
        padding: 15,
        flexDirection: 'row',
    },
    view1: {
        flexDirection: 'row',
        width: '90%',
    },
    passView: {
        backgroundColor: '#FFFFFF',
        marginHorizontal: 25,
        marginTop: 20,
        borderRadius: 10,
        padding: 15,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems:'center'
    },
    forgotView: {
        alignItems: 'flex-end',
        marginHorizontal: 25,
        paddingVertical: 10,
    },
    forgotTxt: {
        fontSize: 14,
        fontWeight: '600'
    },
    btn: {
        backgroundColor: '#51a6f5',
        marginHorizontal: 25,
        padding: 15,
        borderRadius: 10,
        alignItems: 'center',
        marginTop: 10,
    },
    btntxt: {
        color: "#FFFFFF",
        fontSize: 15,
        fontWeight: '700',
    },
    logo: {
        height: 28,
        width: 28,
        marginHorizontal: 7,
    },
    logoView: {
        alignItems: 'center',
        marginVertical: 10,
    },
    logoSubView: {
        flexDirection: 'row'
    },
    txtMainView: {
        alignItems: 'center',
        marginBottom:10,
    },
    txtView: {
        flexDirection: 'row'
    },
    txtColor: {
        color: '#51a6f5'
    },
    errorText: {
        color: 'red',
        fontSize: 12,
        marginLeft: 40,
        marginTop:5,
    }
})
export default styles;