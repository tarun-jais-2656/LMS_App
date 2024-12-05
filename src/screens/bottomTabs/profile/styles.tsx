import React from "react";
import { StyleSheet } from "react-native";

const styles=StyleSheet.create({
    safe:{ marginHorizontal: 24, },
    profileView:{ marginTop: 32, flexDirection: 'row', backgroundColor: 'white', padding: 20, borderRadius: 8 },
    profileImg:{ height: 40, width: 40 },
    txtView:{ alignSelf: 'center', marginLeft: 12 },
    txt1:{ fontSize: 18, fontWeight: '700' },
    txt2:{ fontSize: 14, fontWeight: '600', color: '#2A7BBB' },
    nextImg:{height:10,width:5,alignSelf:'center',tintColor:'#2A7BBB',marginLeft:2},
    view:{ backgroundColor: 'white', marginTop: 20, borderRadius: 8 },
    cont:{ flexDirection: 'row', alignItems: 'center', margin: 20 },
    img:{ height: 40, width: 40 },
    txt:{ fontSize: 14, fontWeight: '600', marginLeft: 16 },
    flx:{ flexDirection: 'row' },
})

export default styles;