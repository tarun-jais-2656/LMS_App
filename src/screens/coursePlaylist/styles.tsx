import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
        flex:1
    },
    subCon:{
        flex:1,
        marginHorizontal: 16,
        marginVertical:10
    },
    image: {
        width: '100%',
        height: 200,
        borderRadius: 8,
        marginBottom: 10,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        marginTop: 10,
    },
    instructor: {
        fontSize: 18,
        fontWeight: '700',
        marginTop: 20
    },
    colorTxt: {
        color: 'grey',
        marginVertical: 3
    },
    profile: {
        backgroundColor: 'grey',
        height: 100,
        width: 100,
        borderRadius: 100,
        marginRight: 10
    },
    flx: {
        flexDirection: 'row',
        marginTop: 10,
        alignItems: 'center',
        borderBottomWidth: 1,
        paddingBottom: 10,
        borderBottomColor: '#C8C8C8',
    },
    btn: {
        backgroundColor: '#4a91bd',
        paddingVertical: 10,
        alignItems: 'center',
        borderRadius: 10,
        width: '98%',
    },
    txt: {
        fontSize: 15,
        fontWeight: '600',
        color: '#fff'
    },

})
export default styles;