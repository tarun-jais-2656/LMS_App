import React from "react";
import { Image, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { icon } from "../../assets/icons";
import styles from "./styles";

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

