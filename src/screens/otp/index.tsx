import React, { useRef, useState } from "react";
import { Image, StyleSheet, Text, TextInput, View } from "react-native";
import Button from "../../components/button";
import { icon } from "../../assets/icons";
import { useNavigation } from "@react-navigation/native";
import styles from "./styles";

const Otp = () => {
    const navigation = useNavigation();
    const [code, setCode] = useState(new Array(4).fill(''));
    const inputs = useRef<any>([...Array(4)].map(() => React.createRef()));
    const handleInp = (text: string, index: number) => {
        const newCode = [...code];
        newCode[index] = text;
        setCode(newCode);

        if (text && index < 3) {
            inputs.current[index + 1].current.focus();
        }
        if (text === "" && index > 0) {
            inputs.current[index - 1].current.focus();
        }
    }

    const handleSubmit = () => {

    }

    const handleNav = () => {
        navigation.navigate('Login');
    }

    const mapping = () => code.map((_, index) => (
        <TextInput
            key={index}
            style={styles.inputBox}
            keyboardType="number-pad"
            maxLength={1}
            onChangeText={(text) => handleInp(text, index)}
            value={code[index]}
            ref={inputs.current[index]}
            returnKeyType="done"
            autoFocus={index === 0}
        />
    ))

    return (
        <View style={styles.container}>
            <Image
                source={icon.otp}
                style={styles.otp}
            />
            <Text style={styles.txt}>Verification Code</Text>
            <Text style={styles.txt1}>We have sent the verification code to your email.</Text>
            <View style={styles.inputCon}>
                {mapping()}
            </View>
            <View>
                <Button
                    title="Submit"
                    onPress={handleSubmit}
                />
            </View>
            <View style={styles.txtMainView}>
                <View style={styles.txtView}>
                    <Text style={styles.back}>Back To? </Text>
                    <Text style={styles.txtColor} onPress={handleNav}>Sign In</Text>
                </View>
            </View>
        </View>
    )
}

export default Otp;

