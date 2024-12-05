import { StyleSheet } from "react-native";

const styles=StyleSheet.create({
    container:{
        flexDirection:'row',
        // alignItems:'center',
        backgroundColor:'skyblue',
        justifyContent:'space-between',
        // paddingBottom:20,
    },
    back: {
        height: 25,
        width: 25,
        marginLeft:16,
        marginVertical:10
    },
    txt:{
        alignSelf:'center',
        marginRight:40,
        fontSize:18,
        fontWeight:'600'
    }
})
export default styles;