import React, { useState } from "react";
import { Alert, Image, KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text, TextInput, View } from "react-native";
import { icon } from "../../assets/icons";
import Button from "../../components/button";
import { useNavigation } from "@react-navigation/native";
import { firebase } from "@react-native-firebase/auth";
import styles from "./styles";
import { Header } from "../../components/header";
import AlertModal from "../../components/alertModal";

export default function Forgot() {
    const navigation = useNavigation();
    const [email, setEmail] = useState('');
    const [errormsg, setErrormsg] = useState('');
    const [isModalVisible, setModalVisible] = useState(false);

    const toggleModal = () => {
        setModalVisible(!isModalVisible);
    };


    const onBackdropPress = () => {
        setModalVisible(false);
    }

    const handleNav = () => {
        navigation.reset({ index: 0, routes: [{ name: 'Login' }] });
    }

    const handleForgotPassword = async () => {
        if (!email) {
            setErrormsg('Please enter your email address!')
            return;
        }
        if (validateEmail(email) == false) {
            setErrormsg('Invalid email address entered')
            return;
        }

        try {
            await firebase.auth().sendPasswordResetEmail(email);
            setEmail('')
            setErrormsg('')
            toggleModal();
            console.log('Password reset email sent!');
        } catch (error) {
            console.log('Error sending reset email:', error);
        }
    };

    const validateEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    return (
        <View style={styles.flx}>
            <Header title={"Reset Password"} onpress={handleNav} />
            <KeyboardAvoidingView
                style={styles.flx}
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            >
                <ScrollView>
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
                        {!validateEmail(email) && <Text style={styles.errorText}>{errormsg}</Text>}
                        <Button title="Send" onPress={handleForgotPassword} />
                        <View style={styles.txtMainView}>
                            <View style={styles.txtView}>
                                <Text style={styles.back}>Back To? </Text>
                                <Text style={styles.txtColor} onPress={handleNav}>Sign In</Text>
                            </View>
                        </View>
                    </View>
                    <AlertModal
                        isModalVisible={isModalVisible}
                        msg="Reset password link sent to email!"
                        onBackdropPress={onBackdropPress}
                        onClose={toggleModal}
                    />
                </ScrollView>
            </KeyboardAvoidingView>
        </View>
    )
}