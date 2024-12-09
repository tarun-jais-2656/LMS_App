import { StyleSheet } from "react-native";
const styles = StyleSheet.create({
    container1: {
        flex: 1,
    },
    container: {
        flex: 1,
        marginHorizontal: 16,
        marginTop: 10,
    },
    image: {
        width: '100%',
        height: 200,
        borderRadius: 8,
        marginBottom: 10,
    },
    buyBtn:{ borderWidth: 1, padding: 10, backgroundColor: '#6e30ba', alignItems: 'center', borderRadius: 10, marginBottom: 10 },
    buyTxt:{ fontSize: 18, fontWeight: '700', color: '#FFFFFF', },
    cartBtn:{
        borderWidth: 1,
        padding: 10,
        backgroundColor: '#1d7826',
        alignItems: 'center',
        borderRadius: 10,
    },
    cartTxt:{ fontSize: 18, fontWeight: '700', color: '#FFFFFF' },
    view: {
        flexDirection: 'row',
        justifyContent: "space-between",
        alignItems: 'center'
    },
    view1: {
        padding: 10,
        backgroundColor: '#9dcf82',
        marginBottom: 10,
        borderRadius: 8,
    },
    best: {
        fontWeight: '600',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    instructor: {
        fontSize: 16,
        marginBottom: 10,
    },
    colorTxt: {
        color: 'grey'
    },
    colorTxt1: {
        fontWeight: '700',
        fontSize: 30
    },
    rating: {
        fontSize: 16,
        marginBottom: 10,
    },
    hours: {
        fontSize: 16,
        marginBottom: 10,
    },
    description: {
        fontSize: 14,
        color: 'gray',
        marginTop: 10,
    },
    video: {
        height: 220,
    },
    heading: {
        fontSize: 20,
        fontWeight: 'bold',
        marginTop: 30,
    },
    txtView: {
        
    },
    txt: {
        fontSize: 16,
        margin: 6,
        color: 'grey',
    },
    icon: {
        width: 20,
        height: 20,
        margin: 6
    },
    flx: {
        flexDirection: 'row',
        alignItems: 'center',
        width:'92%'
    },
    flx1: {
        flexDirection: 'row',
        marginVertical: 15
    },
    rate: {
        fontSize: 30,
        fontWeight: '700',
    },
    txt2: {
        color: 'grey',
        alignSelf: 'flex-end',
        marginBottom: 5,
        fontSize: 16
    },
    ratingImg: {
        resizeMode: 'contain',
        height: 250,
        width: 'auto',
    },
    name: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    txt3: {
        color: 'grey',
        marginTop: 5,
    },
    review: {
        marginBottom: 20,
    },
    btn: {
        paddingVertical: 10,
        borderRadius: 8,
        borderWidth: 1,
        alignItems: 'center',
        marginBottom:10
    },
    btnTxt: {
        fontSize: 16,
        fontWeight: '600'
    },
});
export default styles;
