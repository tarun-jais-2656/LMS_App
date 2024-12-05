import React from "react";
import { Dimensions, Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { icon } from "../../../assets/icons";

const { width } = Dimensions.get('window');
export const Module = ({ module, title, handlenav }) => {
    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={handlenav}>
                <View style={styles.view}>
                    <Image source={icon.play} style={styles.play} />
                </View>
            </TouchableOpacity>
            <View style={{ width:"50%" }}>
                <Text style={styles.txt1}>{module}</Text>
                <Text style={styles.txt} onPress={handlenav}>{title}</Text>
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
        marginRight: 20,
        paddingHorizontal: 50,
        paddingVertical: 20
    },
    play: {
        height: 50,
        width: 50
    },
    txt: {
        fontSize: 16,
        fontWeight: '700',
        color: '#1d68ad',
    },
    txt1: {
        fontSize: 16,
        fontWeight: '700'
    }
})