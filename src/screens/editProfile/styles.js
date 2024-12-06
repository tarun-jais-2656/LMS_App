import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    safeArea: { flex: 1},
    container: { flex: 1, marginTop: 10, marginHorizontal: 16, },
    subcontainer: { flexDirection: 'row', justifyContent: 'space-between' },
    backView: { backgroundColor: '#DFE0E0', borderRadius: 10, height: 48, width: 48, justifyContent: 'center', alignItems: 'center' },
    back: { height: 12, width: 6 },
    txtV: { alignSelf: 'center' },
    txt1: { fontWeight: '500', fontSize: 26 },
    profileView: { flexDirection: 'row', alignItems: 'center' },
    profileSub: { alignItems: 'flex-start', marginRight: 20,marginVertical:10 },
    profileSub2: { backgroundColor: '#E1EBFE', borderRadius: 80 },
    profileImg: { height: 100, width: 100, borderRadius: 100 },
    profileTxt: { fontSize: 14, fontWeight: '450', marginBottom: 10 },
    profileTxt2: { fontSize: 16, fontWeight: '500', color: '#51a6f5' },
    inputView: { flex: 0.8, justifyContent: 'space-between' },
    name: { borderWidth: 1,  borderRadius: 12, borderColor: 'lightgrey', padding: 15, fontSize: 16, backgroundColor: '#FFFFFF' },
    username: { borderWidth: 1, borderRadius: 12, borderColor: 'lightgrey', padding: 15, fontSize: 16, backgroundColor: '#FFFFFF' },
    calView: { flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 15, alignItems: 'center', borderWidth: 1, borderRadius: 12, borderColor: 'lightgrey', backgroundColor: '#FFFFFF' },
    birth: { fontSize: 18 },
    calImgView: { paddingVertical: 15 },
    calImg: { height: 22, width: 20,tintColor:'#51a6f5' },
    genderView: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', borderWidth: 1, borderRadius: 12, borderColor: 'lightgrey', paddingHorizontal:15, backgroundColor: '#FFFFFF' },
    gender: { fontSize: 16 },
    dropView: { paddingVertical: 20 },
    dropImg: { height: 10, width: 15,tintColor:'#51a6f5' },
    genderModalView: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0, 0, 0, 0.5)' },
    genderModal: { width: 300, backgroundColor: 'white', borderRadius: 10 },
    genderItem: { padding: 20, fontSize: 18 },
    cancel: { padding: 10, textAlign: 'center', color: 'red' },
    emailView: {   borderWidth: 1, borderRadius: 12, borderColor: 'lightgrey', backgroundColor: '#FFFFFF' },
    email: { fontSize: 16, },
    verify: { color: '#EE28A9' },
    updateButton: { marginBottom: 20, padding: 20, backgroundColor: '#51a6f5', alignItems: 'center', justifyContent: 'center', borderRadius: 12, },
    updateButtonTxt: { color: 'white', fontWeight: '700', fontSize: 16 },
    modalHeading: { borderBottomWidth: 0.3, paddingBottom: 20 },
    modalHeadingTxt: { fontSize: 24, fontWeight: '700' },
    galView: { flexDirection: 'row' },
    galImg: { height: 44, width: 44 },
    galTxt: { alignSelf: 'center', fontSize: 16, fontWeight: '500', marginLeft: 30 },
    nxtImg: { alignSelf: 'center', height: 8, width: 4 },
    modalsContent: {
        backgroundColor: 'white',
        padding: 24,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        height: '45%',
    },
    modalContentView: { flexDirection: 'row', justifyContent: 'space-between', padding: 16, backgroundColor: '#F6F9FA', marginVertical: 12, borderRadius: 16 },
    modal: {
        justifyContent: 'flex-end',
        margin: 0,
    },
    signinView: {
        marginTop: 24,
    },
    textHead2: {
        fontSize: 24,
        fontWeight: '700',
    },
    text2: {
        fontSize: 15,
        fontWeight: '400',
        color: '#4F5F72',
        marginTop: 8,
        marginBottom: 27,
    },
    button: {
        padding: 20,
        backgroundColor: '#2A7BBB',
        alignItems: 'center',
        borderRadius: 8,
        marginTop: 70,
    },
    buttonText: {
        fontSize: 16,
        fontWeight: '700',
        color: '#ffffff',
    },
    phoneNumberContainer: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 22,
        padding:9,
        justifyContent:'center'
    },
    num:{
        width:'77%',
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 22,
        marginLeft: 10,
        padding:10,
        justifyContent:'center',
    },
    phoneNumberInput: {
        fontSize: 16,
    }
})

export default styles;