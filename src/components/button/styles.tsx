import { StyleSheet } from "react-native";
import { responsiveWidth } from "react-native-responsive-dimensions";
const styles=StyleSheet.create({
    buttonContainer:{
        backgroundColor:'#51a6f5',
        width:responsiveWidth(88),
        paddingVertical:15,
        borderRadius:10,
        marginVertical:10,
        alignItems:'center',
        justifyContent:'center'
    },
    txt:{
        fontSize:16,
        fontWeight:'600',
        color:'#FFFFFF'
    }
})

export default styles;