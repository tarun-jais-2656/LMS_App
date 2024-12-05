import React from "react";
import { Image, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from "react-native"
import { icon } from "../../assets/icons";
import { useNavigation } from "@react-navigation/native";
import styles from "./styles";


const GetStarted = () => {
    const navigation = useNavigation()
    return (
        <SafeAreaView style={styles.safe}>
            <Image
                source={icon.ai}
                style={styles.ai}
            />
            <View style={styles.container}>
                <Image
                    source={icon.hat}
                    style={styles.hat}
                />
                <Text style={styles.txt}>Let's Start Learning With</Text>
                <Text style={styles.txt2}>APPINVENTIV</Text>
                <Text style={styles.txt1}>Explore a variety of interactive lectures,{"\n"}video, quizze & assignments.</Text>
            </View>
            <View style={styles.btnView}>
                <TouchableOpacity style={styles.btn} onPress={() => navigation.navigate('Tutorial')}>
                    <Text style={styles.btnTxt}>Get Started</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    )
}

export default GetStarted;

