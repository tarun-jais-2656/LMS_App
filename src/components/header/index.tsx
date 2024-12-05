import React from "react";
import { Image, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { icon } from "../../assets/icons";

export const Header = ({title,onpress}) => {
    return (
        <SafeAreaView style={styles.container}>
            <TouchableOpacity onPress={onpress}>
                <Image
                    source={icon.backs}
                    style={styles.back}
                />
            </TouchableOpacity>
            <Text style={styles.txt}>{title}</Text>
            <View></View>
        </SafeAreaView>
    )
}

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