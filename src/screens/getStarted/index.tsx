import React from "react";
import { Image, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from "react-native"
import { icon } from "../../assets/icons";
import { useNavigation } from "@react-navigation/native";


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
                <Text style={styles.txt1}>Explore a variety of interactive lectures,</Text>
                <Text style={styles.txt1}>video, quizze & assignments.</Text>
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

const styles = StyleSheet.create({
    safe:{
        flex:1,
    },
    container: {
        alignItems: 'center',
    },
    hat: {
        height: 80,
        width: 80,
    },
    ai: {
        height: 250,
        width: 290,
        right: 100,
    },
    txt: {
        fontSize: 25,
        fontWeight: '600',
        marginVertical: 3,
    },
    txt2: {
        fontSize: 20,
        fontWeight: '700',
    },
    txt1: {
        color: 'grey',
    },
    btnView:{
        flex:1,
        justifyContent:'flex-end',
        marginBottom:20
    },
    btn: {
        borderWidth: 0.3,
        borderRadius: 10,
        paddingVertical: 15,
        backgroundColor: '#51a6f5',
        marginHorizontal: 20,
    },
    btnTxt: {
        color: '#FFFFFF',
        fontSize: 15,
        fontWeight: '700',
        alignSelf: 'center',
    }
})