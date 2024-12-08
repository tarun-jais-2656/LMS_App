import { Dimensions, StyleSheet } from "react-native";
import { responsiveWidth } from "react-native-responsive-dimensions";

const { width } = Dimensions.get('window');
const styles = StyleSheet.create({
    cont: {
        flex: 1
    },
    flexRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems:'center'
    },
    head: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginHorizontal: 16,
        alignItems: 'center',
        marginVertical: 10,
    },
    userr: {
        height: 50,
        width: 50,
        borderRadius:40,
        marginRight: 10,
        alignSelf: 'center'
    },
    bag: {
        height: 45,
        width: 45,
    },
    cnt:{
        position:'absolute',
        backgroundColor:'#407be3',
        marginTop:7,
        height:25,
        width:25,
        borderRadius:20,
        
    },
    cntTxt:{
        color:'white',
        fontSize:18,
        fontWeight:'600',
        alignSelf:'center'
    },
    txt2: {
        fontWeight: '600',
        fontSize: 15,
    },
    txt1: {
        fontWeight: '500',
        fontSize: 13,
        color: 'grey'
    },
    searchBar: {
        borderWidth: 0.17,
        flexDirection: 'row',
        marginHorizontal: 16,
        padding: 10,
        backgroundColor: '#FFFFFF',
        borderColor: 'grey',
        borderRadius: 10,
        alignItems: 'center'
    },
    search: {
        height: 20,
        width: 20,
        tintColor: 'grey'
    },
    searchInput: {
        marginHorizontal: 15,
        // backgroundColor:'red',
        width:0.8*width,
    },
    background: {
        width: "100%",
        height: 27,
        resizeMode: "stretch",
        zIndex: 1,
    },
    backgroundView: {
        position: "absolute",
        zIndex: 5,
        paddingHorizontal: 18,
        paddingVertical: 30,
        flexDirection: "row",
        alignItems: "center",
    },

    backgroundViewContainer: {
        width: responsiveWidth(45),
        height: responsiveWidth(30),
        marginTop: -50,
    },

    backgroundViewText: {
        color: "white",
        fontSize: 3,
    },

    backgroundViewOffer: {
        color: "rgba(255, 255, 255, 0.7)",
        fontSize: 14,
        marginTop: 5,
    },

    backgroundViewImage: {
        width: 38,
        height: 22,
        top: -15,
    },
    heading:{
        fontSize:20,
        fontWeight:'700',
        marginLeft:16,
        marginTop:10,
        marginBottom:10
    },

    backgroundViewButtonContainer: {
        borderWidth: 1.1,
        borderColor: "rgba(255, 255, 255, 0.5)",
        width: 109,
        height: 32,
        borderRadius: 5,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 25,
    },

    backgroundViewButtonText: {
        color: "#FFFF",
    },
    item: {
        padding: 10,
        borderRadius: 8,
        marginRight: 15, 
        backgroundColor: '#fff',
      },
      image: {
        width: 350, 
        height: 200,
        borderRadius: 8,
      },
      textContainer: {
        flexDirection:'row',
        justifyContent:'space-between',
        marginTop:10
      },
      title: {
        fontSize: 16,
        fontWeight: 'bold',
      },
      price: {
        fontSize: 14,
        color: '#888',
      },
})

export default styles;