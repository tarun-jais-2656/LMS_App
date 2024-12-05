import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    otp:{
        height:300,
        width:300,
        marginTop:20,
    },
    txt: {
        fontSize: 25,
        fontWeight: '700',
        marginVertical:5,
    },
    txt1: {
        color: 'grey'
    },
    container: {
        flex: 1,
        alignItems: 'center',
    },
    inputCon: {
        flexDirection: 'row',
    },
    inputBox: {
        height: 50,
        width: 50,
        borderWidth: 1,
        borderColor: 'grey',
        textAlign: 'center',
        marginRight: 10,
        borderRadius: 10,
        fontSize: 20,
        marginVertical:10,
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
    }
})

export default styles;