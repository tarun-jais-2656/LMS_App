import { Dimensions, StyleSheet } from "react-native";

const { width } = Dimensions.get('window');
const styles = StyleSheet.create({
    container1:{
        flex:1
    },
    container: {
        flex: 1,
        marginHorizontal: 16,
    },
    flat:{flex:1,marginTop:10},
    card: {
        backgroundColor: 'white',
        borderRadius: 8,
        padding: 10,
        marginBottom: 10,
        elevation: 5,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
    },
    imgRemove: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    removeBtn: {
        backgroundColor: "red",
        justifyContent: 'center',
        marginVertical: 30,
        paddingHorizontal: 10,
        borderRadius: 10,
    },
    txt: {
        fontSize: 14,
        fontWeight: '700',
        color: '#FFFFFF'
    },
    image: {
        height: 100,
        width: width / 2,
        borderRadius: 8,
    },
    title: {
        fontSize: 16,
        fontWeight: 'bold',
        marginTop: 10,
    },
    name: {
        fontSize: 14,
        color: 'gray',
        marginVertical: 5,
    },
    hours: {
        fontSize: 16,
        marginBottom: 10,
    },
    colorTxt1: {
        fontWeight: '700'
    },
    txtView: {
        paddingBottom: 20,
        alignItems: 'center',
    },
    txt2: {
        fontSize: 20,
        fontWeight: '700'
    },
    txtBtn: {
        fontSize: 18,
        fontWeight: '700',
        color: "#FFFFFF"
    },
    btn: {
        backgroundColor: '#51a6f5',
        paddingVertical: 10,
        width: width * 0.93,
        alignItems: 'center',
        marginTop: 5,
        borderRadius: 10
    },
    empty:{
        flex:0.8,
        alignItems:'center',
        justifyContent:'center'
    },
    emptyCart:{
        height:300,
        width:300
    },
    txtCart:{
        fontSize:18,
        fontWeight:'600',
        color:'#bf73f5'
    }
});
export default styles;