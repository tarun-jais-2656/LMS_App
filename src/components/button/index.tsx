import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import styles from "./styles";

export default function Button({ title, onPress }: { title: string, onPress: () => void }) {
    return (
        <TouchableOpacity
            onPress={() => onPress()}
            style={styles.buttonContainer}
        >
            <Text style={styles.txt}>{title}</Text>
        </TouchableOpacity>
    )
}