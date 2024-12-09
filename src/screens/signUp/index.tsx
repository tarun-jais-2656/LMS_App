import React, { useState } from "react";
import { Alert, Image, KeyboardAvoidingView, Platform, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { icon } from "../../assets/icons";
import { useNavigation } from "@react-navigation/native";
import auth from '@react-native-firebase/auth';
import styles from "./styles";

const SignUp = () => {
    const [email, setEmail] = useState('');
    const [pass, setPass] = useState('');
    const [name, setName] = useState('');
    const [nameValid, setNameValid] = useState(true);
    const [emailValid, setEmailValid] = useState(true);
    const [passwordValid, setPasswordValid] = useState(true);
    const [nameErrorMessage, setNameErrorMessage] = useState('');
    const [emailErrorMessage, setEmailErrorMessage] = useState('');
    const [passwordErrorMessage, setPasswordErrorMessage] = useState('');
    const [secure, setSecure] = useState(false);
    const navigation = useNavigation();

    const handleNav = () => {
        navigation.reset({ index: 0, routes: [{ name: 'Login' }] });
    }

    const onRegister = () => {
        if (!validateInputs()) return;

        auth().createUserWithEmailAndPassword(email, pass)
            .then(() => {
                setEmail('');
                setPass('');
                setName('');
                Alert.alert('User account created.');
            }).catch(error => {
                if (error.code === 'auth/email-already-in-use') {
                    Alert.alert('That email address is already in use!');
                }
                if (error.code === 'auth/invalid-email') {
                    Alert.alert('That email address is invalid!');
                }
            })
    }

    const togglepass = () => {
        setSecure(!secure);
    }

    const validateName = (name) => {
        const regex = /^[A-Za-z\s]+$/;
        return regex.test(name);
    };

    const validateEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };


    const validatePassword = (pass) => {
        return pass.length >= 6
    };

    const validateInputs = () => {
        const nameIsValid = validateName(name);
        const emailIsValid = validateEmail(email);
        const passwordIsValid = validatePassword(pass);

        setNameValid(nameIsValid);
        setEmailValid(emailIsValid);
        setPasswordValid(passwordIsValid);
        setNameErrorMessage(emailIsValid ? '' : 'Invalid name entered');
        setEmailErrorMessage(emailIsValid ? '' : 'Invalid email address entered');
        setPasswordErrorMessage(passwordIsValid ? '' : 'Password must be at least 6 characters');

        return nameIsValid && emailIsValid && passwordIsValid;
    };

    const handleBlurName = () => {
        if (name.trim() === '') {
            setNameValid(false);
            setNameErrorMessage('Name cannot be empty');
        } else {
            const nameIsValid = validateName(name);
            setNameValid(nameIsValid);
            setNameErrorMessage(nameIsValid ? '' : 'Invalid name entered');
        }
    };


    const handleBlurEmail = () => {
        if (email.trim() === '') {
            setEmailValid(false);
            setEmailErrorMessage('Email cannot be empty');
        } else {
            const emailIsValid = validateEmail(email);
            setEmailValid(emailIsValid);
            setEmailErrorMessage(emailIsValid ? '' : 'Invalid email address entered');
        }
    };

    const handleBlurPassword = () => {
        if (pass.trim() === '') {
            setPasswordValid(false);
            setPasswordErrorMessage('Password cannot be empty');
        } else {
            const passwordIsValid = validatePassword(pass);
            setPasswordValid(passwordIsValid);
            setPasswordErrorMessage(passwordIsValid ? '' : 'Password must be at least 6 characters');
        }
    };

    return (
        <SafeAreaView>
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            >
                <ScrollView showsVerticalScrollIndicator={false}>
                    <View style={styles.imgView}>
                        <Image
                            source={icon.sign_in}
                            style={styles.signin}
                        />
                        <Text style={styles.txt}>Let's get started!</Text>
                        <Text style={styles.txt1}>Create an account to Appinventiv to get all features</Text>
                    </View>
                    <View style={styles.emailView}>
                        <Image
                            source={icon.account}
                            style={styles.email}
                        />
                        <TextInput
                            placeholder="Enter your name"
                            placeholderTextColor={"grey"}
                            numberOfLines={1}
                            style={styles.textInput}
                            value={name}
                            onChangeText={value => setName(value)}
                            onBlur={handleBlurName}
                        />
                    </View>
                    {!nameValid && <Text style={styles.errorText}>{nameErrorMessage}</Text>}
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
                            onBlur={handleBlurEmail}
                        />
                    </View>
                    {!emailValid && <Text style={styles.errorText}>{emailErrorMessage}</Text>}
                    <View style={styles.passView}>
                        <View style={styles.view1}>
                            <Image
                                source={icon.pass}
                                style={styles.email}
                            />
                            <TextInput
                                placeholder="Enter your password"
                                placeholderTextColor={"grey"}
                                style={styles.textInput}
                                numberOfLines={1}
                                secureTextEntry={secure}
                                value={pass}
                                onChangeText={value => setPass(value)}
                                onBlur={handleBlurPassword}
                            />
                        </View>
                        <TouchableOpacity onPress={togglepass}>
                            <Image
                                source={icon.eye}
                                style={styles.eye}
                            />
                        </TouchableOpacity>
                    </View>
                    {!passwordValid && <Text style={styles.errorText}>{passwordErrorMessage}</Text>}
                    <TouchableOpacity
                        style={[styles.btn, { opacity: (emailValid && passwordValid) ? 1 : 0.5 }]}
                        onPress={onRegister}
                        disabled={!emailValid || !passwordValid}
                    >
                        <Text style={styles.btntxt}>Sign Up</Text>
                    </TouchableOpacity>
                    <View style={styles.logoView}>
                        <View style={styles.logoSubView}>
                            <Image
                                source={icon.google}
                                style={styles.logo}
                            />
                            <Image
                                source={icon.github}
                                style={styles.logo}
                            />
                        </View>
                    </View>
                    <View style={styles.txtMainView}>
                        <View style={styles.txtView}>
                            <Text>Already have an account? </Text>
                            <Text style={styles.txtColor} onPress={handleNav}>Sign In</Text>
                        </View>
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
        </SafeAreaView>
    )
}

export default SignUp;
