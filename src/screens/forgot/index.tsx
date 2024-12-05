import React, { useState } from "react";
import { Alert, Image, StyleSheet, Text, TextInput, View } from "react-native";
import { icon } from "../../assets/icons";
import { responsiveWidth } from "react-native-responsive-dimensions";
import Button from "../../components/button";
import { useNavigation } from "@react-navigation/native";
import { firebase } from "@react-native-firebase/auth";

export default function Forgot() {
    const navigation = useNavigation();
    const [email, setEmail] = useState('');
    // const [emailError,setEmailError]=useState('');

    const handleNav = () => {
        navigation.reset({index:0,routes:[{name:'Login'}]});
    }

    const handleForgotPassword = async () => {
        if (!email) {
            console.log('Please enter your email address');
            return;
        }

        try {
            await firebase.auth().sendPasswordResetEmail(email);
            setEmail('')
            Alert.alert('Password reset email sent!')
            console.log('Password reset email sent!');
            // handleSend();
            //   setResetPasswordEmailSent(true);
        } catch (error) {
            console.log('Error sending reset email:', error);
            //   setEmailError('Error sending reset password email');
        }
    };


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
                    placeholderTextColor={"grey"}
                    numberOfLines={1}
                    style={styles.textInput}
                    value={email}
                    onChangeText={value => setEmail(value)}
                />
            </View>
            <Button title="Send" onPress={handleForgotPassword} />
            <View style={styles.txtMainView}>
                <View style={styles.txtView}>
                    <Text style={styles.back}>Back To? </Text>
                    <Text style={styles.txtColor} onPress={handleNav}>Sign In</Text>
                </View>
            </View>
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
        marginBottom: 10,
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
        width: responsiveWidth(88),
    },
    email: {
        height: 25,
        width: 25,
        alignSelf: 'center'
    },
    textInput: {
        marginHorizontal: 15,
    },
    txtMainView:{
        alignItems:'center'
    },
    txtView: {
        flexDirection: 'row'
    },
    txtColor:{
        color:'#51a6f5'
    },
    back:{
        fontWeight:'600',
    }
})