import React, { useState } from "react";
import { Alert, Image, KeyboardAvoidingView, Platform, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { icon } from "../../assets/icons";
import { useNavigation } from "@react-navigation/native";
import auth from '@react-native-firebase/auth';
import { GoogleSignin } from "@react-native-google-signin/google-signin";
import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from "./styles";
import AlertModal from "../../components/alertModal";

const Login = () => {

    GoogleSignin.configure({
        webClientId: '885477659428-j5mfkace6jmpigrjiimt9k3kdijmsm6h.apps.googleusercontent.com',
    });

    async function onGoogleButtonPress() {
        await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
        const signInResult = await GoogleSignin.signIn();

        idToken = signInResult.data?.idToken;
        if (!idToken) {
            idToken = signInResult.idToken;
        }
        if (!idToken) {
            throw new Error('No ID token found');
        }

        const googleCredential = auth.GoogleAuthProvider.credential(signInResult.data.token);

        return auth().signInWithCredential(googleCredential);
    }

    const [email, setEmail] = useState('');
    const [pass, setPass] = useState('');
    const [emailValid, setEmailValid] = useState(true);
    const [emailErrorMessage, setEmailErrorMessage] = useState('');
    const [passwordValid, setPasswordValid] = useState(true);
    const [passwordErrorMessage, setPasswordErrorMessage] = useState('');
    const [secure, setSecure] = useState(false);
    const [isLogin, setIsLogin] = useState('flase');
    const navigation = useNavigation();
    const [isModalVisible, setModalVisible] = useState(false);
    const [iseyeVisible, setiseyeVisible] = useState(false);

    const toggleModal = () => {
        setModalVisible(!isModalVisible);
    };

    const toggleeye = () => {
        setiseyeVisible(!iseyeVisible);
    };


    const onBackdropPress = () => {
        setModalVisible(false);
    }

    const handleNav = () => {
        navigation.navigate('SignUp');

    }
    const handleNavForgot = () => {
        navigation.navigate('Forgot');
    }

    const onLogin = async () => {
        try {
            const userCredential = await auth().signInWithEmailAndPassword(email, pass);
            const userUid = userCredential.user.uid;
            await AsyncStorage.setItem('userUID', userUid);
            const name = email.replace('@gmail.com', '')
            await AsyncStorage.setItem('name', name);
            await AsyncStorage.setItem('isLogin', isLogin);
            navigation.reset({ index: 0, routes: [{ name: 'BottomTab' }] });
        } catch (error) {
            toggleModal();
        }
    };

    const validateEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
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

    const validatePassword = (pass) => {
        return pass.length >= 6
    };

    const handleBlurPassword = () => {
        if (pass.trim() === '') {
            setPasswordValid(false);
            setPasswordErrorMessage('Password cannot be empty');
        }
        else {
            const passwordIsValid = validatePassword(pass);
            setPasswordValid(passwordIsValid);
            setPasswordErrorMessage(passwordIsValid ? '' : 'Password must be at least 6 characters');
        }
    };


    const togglepass = () => {
        setSecure(!secure);
        setiseyeVisible(!iseyeVisible)
    }

    return (
        <SafeAreaView style={styles.container}>
            <KeyboardAvoidingView
                style={styles.container}
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            >
                <ScrollView showsVerticalScrollIndicator={false}>
                    <View style={styles.imgView}>
                        <Image
                            source={icon.sign_in}
                            style={styles.signin}
                        />
                        <Text style={styles.txt}>Welcome Back!</Text>
                        <Text style={styles.txt1}>Login to your existing account of Appinventiv</Text>
                    </View>
                    <View style={styles.emailView}>
                        <Image
                            source={icon.email}
                            style={styles.email}
                        />
                        <TextInput
                            placeholder="Enter your email"
                            placeholderTextColor={"grey"}
                            style={styles.textInput}
                            value={email}
                            numberOfLines={1}
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
                            { iseyeVisible ?
                            <Image
                                source={icon.eye}
                                style={styles.eye}
                            />
                            :
                            <Image
                                source={icon.hide}
                                style={styles.eye}
                            />
                            }
                        </TouchableOpacity>
                    </View>
                    {!passwordValid && <Text style={styles.errorText}>{passwordErrorMessage}</Text>}
                    <View style={styles.forgotView}>
                        <Text style={styles.forgotTxt} onPress={handleNavForgot}>Forgot password</Text>
                    </View>
                    <TouchableOpacity style={styles.btn} onPress={onLogin}>
                        <Text style={styles.btntxt}>Sign In</Text>
                    </TouchableOpacity>
                    <View style={styles.logoView}>
                        <View style={styles.logoSubView}>
                            <TouchableOpacity onPress={() => onGoogleButtonPress().then(() => console.log('Signed in with Google!'))}>
                                <Image
                                    source={icon.google}
                                    style={styles.logo}
                                />
                            </TouchableOpacity>
                            <TouchableOpacity>
                                <Image
                                    source={icon.github}
                                    style={styles.logo}
                                />
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={styles.txtMainView}>
                        <View style={styles.txtView}>
                            <Text>Don't have an account? </Text>
                            <Text style={styles.txtColor} onPress={handleNav}>Sign Up</Text>
                        </View>
                    </View>
                    <AlertModal
                        isModalVisible={isModalVisible}
                        msg="Invalid credentials!"
                        onBackdropPress={onBackdropPress}
                        onClose={toggleModal}
                    />
                </ScrollView>
            </KeyboardAvoidingView>
        </SafeAreaView>
    )
}

export default Login;

