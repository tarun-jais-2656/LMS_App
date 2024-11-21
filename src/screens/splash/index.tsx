import React, { useEffect } from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import { icon } from "../../assets/icons";
import { useNavigation } from "@react-navigation/native";

const Splash = () => {
    const navigation = useNavigation()
    useEffect(() => {
        setTimeout(() => {
            navigation.navigate('GetStarted');
        }, 2000);
    }, []);
    return (
        <View style={styles.container}>
            <Image
                source={icon.appinventiv}
            />
        </View>
    )
}

export default Splash;

const styles = StyleSheet.create({
    container: { justifyContent: 'center', alignItems: 'center', flex: 1, backgroundColor: '#51a6f5' },
});