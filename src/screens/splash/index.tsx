import React, { useEffect, useState } from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import { icon } from "../../assets/icons";
import { useNavigation } from "@react-navigation/native";
import auth from '@react-native-firebase/auth';
import AsyncStorage from "@react-native-async-storage/async-storage";


const Splash = () => {
    const navigation = useNavigation()
    const [user, setUser] = useState();
    // console.log(user)
    const onAuthStateSave = (user: any) => setUser(user)

    const getUserUid = async () => {
        try {
          // Retrieve the UID from AsyncStorage
          const uid = await AsyncStorage.getItem('userUID');
          
          if (uid !== null) {
            // If the UID exists in AsyncStorage, you can use it
            console.log('User UID:', uid);
            return uid;
          } else {
            console.log('No UID found');
            return null;
          }
        } catch (error) {
          console.error('Error retrieving UID from AsyncStorage', error);
          return null;
        }
      };

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
        getUserUid();
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