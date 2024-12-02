import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import { icon } from "../../../assets/icons";

export const Module = ({module,title}) => {
    return (
        <View style={styles.container}>
            <View style={styles.view}>
                <Image source={icon.play} style={styles.play}/>
            </View>
            <View>
                <Text style={styles.txt1}>{module}</Text>
                <Text style={styles.txt}>{title}</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        marginTop: 10,
        flexDirection: 'row',
        alignItems: 'center'
    },
    view: {
        backgroundColor: 'grey',
        borderRadius: 10,
        marginRight:20,
        paddingHorizontal:50,
        paddingVertical:20
    },
    play:{
        height:50,
        width:50
    },
    txt: {
        fontSize: 16,
        fontWeight: '700',
        color: '#1d68ad'
    },
    txt1: {
        fontSize: 16,
        fontWeight: '700'
    }
})