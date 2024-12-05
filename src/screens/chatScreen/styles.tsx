import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    bg:{ backgroundColor: 'skyblue' },
    header: {
        backgroundColor: 'skyblue',
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 5,
        justifyContent: 'space-between',
    },
    name: {
        fontSize: 20,
        fontWeight: '700',
    },
    back: {
        height: 25,
        width: 25,
        marginHorizontal: 10,
    },
    sendbtn:{ height: 25, width: 25, marginRight: 15 },
    input:{ padding: 10, backgroundColor: '#F0F0F0' },
    inpCont:{ borderRadius: 10, justifyContent: 'center', marginBottom: 20 },
    img: {
        backgroundColor: 'grey',
        height: 80,
        width: 80,
        borderRadius: 100,
        marginRight: 10,
    },
    flx: {
        flexDirection: 'row',
        alignItems: 'center',
    },
});
export default styles;
