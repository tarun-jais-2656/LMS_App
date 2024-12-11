import React, { Component, useEffect, useState } from "react";
import { Alert, Image, SafeAreaView, Text, TouchableOpacity, View } from "react-native";
import styles from "./styles";
import { icon } from "../../../assets/icons";
import { useNavigation } from "@react-navigation/native";
import auth from '@react-native-firebase/auth';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useDispatch } from "react-redux";
import { clearCart } from "../../../redux/myCart/myCartSlice";
import { clearPaidCourses } from "../../../redux/paidCourses/paidCoursesSlice";

export const Profile = () => {
    const navigation = useNavigation()
    const name = AsyncStorage.getItem('name')
    const dispatch = useDispatch();
    const [pic, setPic] = useState();

    const loadProfilePic = async () => {
        try {
            const storedPic = await AsyncStorage.getItem('userProfilePic');
            if (storedPic) {
                setPic(storedPic);
            } else {
                setPic(null);
            }
        } catch (error) {
            console.error('Error loading profile picture from AsyncStorage:', error);
        }
    };
    
    useEffect(() => {
        loadProfilePic();
    }, []);

    const onLogout = async () => {
        try {
            await auth().signOut();
            await AsyncStorage.removeItem('userUID');
            await AsyncStorage.removeItem('name');
            await AsyncStorage.removeItem('userProfilePic');
            await AsyncStorage.removeItem('isLogin');
            dispatch(clearCart());
            dispatch(clearPaidCourses());
            navigation.reset({ index: 0, routes: [{ name: 'Login' }] });
        } catch (error) {
            Alert.alert("Unable to Logout");
        }
    };
    return (
        <SafeAreaView style={styles.safe}>
            <View style={styles.profileView}>
                <Image source={pic ? { uri: pic } : icon.profile}
                    style={styles.profileImg}
                />
                <View style={styles.txtView}>
                    <Text style={styles.txt1}>{name}</Text>
                    <TouchableOpacity onPress={() => navigation.navigate('EditProfile')}>
                        <View style={styles.flx}>
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