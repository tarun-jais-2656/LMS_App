import React, { useRef, useState } from "react";
import { Image, StyleSheet, Text, TextInput, View } from "react-native";
import Button from "../../components/button";
import { icon } from "../../assets/icons";
import { useNavigation } from "@react-navigation/native";

const Otp = () => {
    const navigation=useNavigation();
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

    const handleSubmit=()=>{

    }

    const handleNav=()=>{
        navigation.navigate('Login');
    }

    return (
        <View style={styles.container}>
            <Image
            source={icon.otp}
            style={styles.otp}
            />
            <Text style={styles.txt}>Verification Code</Text>
            <Text style={styles.txt1}>We have sent the verification code to your email.</Text>
            <View style={styles.inputCon}>
                {code.map((_, index) => (
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
                ))}
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

const styles = StyleSheet.create({
    otp:{
        height:300,
        width:300,
        marginTop:20,
    },
    txt: {
        fontSize: 25,
        fontWeight: '700',
        marginVertical:5,
    },
    txt1: {
        color: 'grey'
    },
    container: {
        flex: 1,
        alignItems: 'center',
    },
    inputCon: {
        flexDirection: 'row',
    },
    inputBox: {
        height: 50,
        width: 50,
        borderWidth: 1,
        borderColor: 'grey',
        textAlign: 'center',
        marginRight: 10,
        borderRadius: 10,
        fontSize: 20,
        marginVertical:10,
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