import { StyleSheet } from "react-native";
import { responsiveWidth } from "react-native-responsive-dimensions";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center'
    },
    flx:{
        flex:1,
    },
    otp: {
        height: 300,
        width: 300,
        marginTop: 20,
    },
    txt: {
        fontSize: 25,
        fontWeight: '700',
        marginBottom: 10,
    },
    txt1: {
        color: 'grey'
    },
    emailView: {
        backgroundColor: '#FFFFFF',
        marginHorizontal: 25,
        marginVertical: 10,
        borderRadius: 10,
        padding: 15,
        flexDirection: 'row',
        width: responsiveWidth(88),
    },
    email: {
        height: 25,
        width: 25,
        alignSelf: 'center'
    },
    textInput: {
        marginHorizontal: 15,
        color:'#000000'
    },
    txtMainView:{
        alignItems:'center'
    },
    txtView: {
        flexDirection: 'row'
    },
    txtColor:{
        color:'#51a6f5'
    },
    back:{
        fontWeight:'600',
    },
    errorText: {
        color: 'red',
        fontSize: 12,
        marginLeft: 40,
        alignSelf:'flex-start'
    }
})
export default styles;