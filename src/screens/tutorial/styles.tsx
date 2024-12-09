import { StyleSheet } from "react-native";
import { responsiveWidth } from "react-native-responsive-dimensions";

const styles=StyleSheet.create({
    render:{
        alignItems:'center',
        marginTop:20,
    },
    slideImg:{
        marginVertical:20,
    },
    container:{
        flex:1,
    },
    txt: {
        fontSize: 20,
        fontWeight: '600',
        marginVertical: 3,
        flexWrap:'wrap',
        textAlign:'center'
    },
    txt1: {
        fontSize: 14,
        fontWeight: '400',
        color:'grey',
    },
    dot:{
        width:responsiveWidth(2.5),
        height:responsiveWidth(2.5),
        borderRadius:5,
        marginHorizontal:5,
        backgroundColor:'grey'
    },
    activeDot:{
        backgroundColor:'#2467Ec',
        width:responsiveWidth(2.5),
        height:responsiveWidth(2.5),
        borderRadius:5,
        marginHorizontal:5,
    },
    btnTxt:{
        color:'#51a6f5',
        fontSize:20,
        fontWeight:'700',
        marginTop:10
    },
})
export default styles;