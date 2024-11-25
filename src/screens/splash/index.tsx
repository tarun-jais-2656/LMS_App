import React, { useEffect, useState } from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import { icon } from "../../assets/icons";
import { useNavigation } from "@react-navigation/native";
import auth from '@react-native-firebase/auth';


const Splash = () => {
    const navigation = useNavigation()
    const [user, setUser] = useState();
    console.log(user)
    const onAuthStateSave = (user: any) => setUser(user)


    useEffect(() => {
        const res = auth().onAuthStateChanged(onAuthStateSave)
        return res;
    }, []);

    useEffect(() => {
        if (user !== undefined) {
            setTimeout(() => {
                if (user) {
                    navigation.navigate('BottomTab');
                } else {
                    navigation.reset({index:0,routes:[{name:'GetStarted'}]});
                }
            }, 2000);
        }
    }, [user, navigation]);




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