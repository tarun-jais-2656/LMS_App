import React from "react";
import { Image, StyleSheet, Text, TextInput, View } from "react-native";
import { icon } from "../../assets/icons";
import { responsiveWidth } from "react-native-responsive-dimensions";
import Button from "../../components/button";
import { useNavigation } from "@react-navigation/native";

export default function Forgot() {
    const navigation=useNavigation();

    const handleSend=()=>{
        navigation.navigate('Otp')
    }


    return (
        <View style={styles.container}>
            <Image
                source={icon.forgot}
                style={styles.otp}
            />
            <Text style={styles.txt}>Reset email password</Text>
            <View style={styles.emailView}>
                <Image
                    source={icon.email}
                    style={styles.email}
                />
                <TextInput
                    placeholder="Enter your email"
                    style={styles.textInput}
                />
            </View>
            <Button title="Send" onPress={handleSend}/>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center'
    },
    otp: {
        height: 300,
        width: 300,
        marginTop: 20,
    },
    txt: {
        fontSize: 25,
        fontWeight: '700',
        marginBottom:10 ,
    },
    txt1: {
        color: 'grey'
    },
    emailView: {
        backgroundColor: '#FFFFFF',
        marginHorizontal: 25,
        marginVertical: 10,
        borderRadius: 10,
        padding: 15,
        flexDirection: 'row',
        width:responsiveWidth(88),
    },
    email: {
        height: 25,
        width: 25,
        alignSelf: 'center'
    },
    textInput: {
        marginHorizontal: 15,
    },
})