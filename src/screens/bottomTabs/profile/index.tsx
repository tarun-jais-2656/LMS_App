import React, { Component } from "react";
import { Alert, Image, SafeAreaView, Text, TouchableOpacity, View } from "react-native";
import styles from "./styles";
import { icon } from "../../../assets/icons";
import { useNavigation } from "@react-navigation/native";
import auth from '@react-native-firebase/auth';
import AsyncStorage from "@react-native-async-storage/async-storage";

export const Profile = () => {
    const navigation = useNavigation()

    const onLogout = async () => {
        try {
            // Sign out from Firebase
            await auth().signOut();

            // Remove user UID from AsyncStorage
            await AsyncStorage.removeItem('userUID');
            
            Alert.alert("Logout successfully");
            navigation.navigate('Login'); // Or any other route you want
        } catch (error) {
            Alert.alert("Unable to Logout");
        }
    };
    return (
        <SafeAreaView style={styles.safe}>
            <View style={styles.profileView}>
                <Image source={icon.profile}
                    style={styles.profileImg}
                />
                <View style={styles.txtView}>
                    <Text style={styles.txt1}>Tarun Jaiswal</Text>
                    <TouchableOpacity onPress={() => navigation.navigate('EditProfile')}>
                        <View style={{ flexDirection: 'row' }}>
                            <Text style={styles.txt2}>Account Settings</Text>
                            <Image source={icon.next}
                                style={styles.nextImg}
                            />
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
            <View style={styles.view}>
                <View style={styles.cont}>
                    <Image source={icon.learn}
                        style={styles.img}
                    />
                    <Text style={styles.txt} onPress={() => navigation.navigate('MyCourses')}>My Courses</Text>
                </View>
                <View style={styles.cont}>
                    <Image source={icon.support}
                        style={styles.img}
                    />
                    <Text style={styles.txt}>Support</Text>
                </View>
                <View style={styles.cont}>
                    <Image source={icon.logout}
                        style={styles.img}
                    />
                    <Text style={styles.txt} onPress={onLogout}>Logout</Text>
                </View>
            </View>
        </SafeAreaView>
    )
}