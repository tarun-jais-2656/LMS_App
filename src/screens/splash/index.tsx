import React, { useEffect, useState } from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import { icon } from "../../assets/icons";
import { useNavigation } from "@react-navigation/native";
import auth from '@react-native-firebase/auth';
import AsyncStorage from "@react-native-async-storage/async-storage";
import styles from "./styles";


const Splash = () => {
    const navigation = useNavigation()
    const [user, setUser] = useState();
    const onAuthStateSave = (user: any) => setUser(user)
    
    const getUserUid = async () => {
        try {
          const uid = await AsyncStorage.getItem('userUID');
          
          if (uid !== null) {
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
        // if (user !== undefined) {
            setTimeout(async() => {
                const tut=await AsyncStorage.getItem('tut')
                if (user) {
                    navigation.reset({index:0,routes:[{name:'BottomTab'}]});
                } else if(tut){
                    navigation.reset({index:0,routes:[{name:'Login'}]});
                }
                else {
                    navigation.reset({index:0,routes:[{name:'GetStarted'}]});
                }
            }, 2000);
        // }
        getUserUid();
    }, [user,navigation]);

    return (
        <View style={styles.container}>
            <Image
                source={icon.appinventiv}
            />
        </View>
    )
}

export default Splash;

