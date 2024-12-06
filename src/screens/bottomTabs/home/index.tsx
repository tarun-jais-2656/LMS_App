import React, { useEffect, useRef, useState } from "react";
import { Alert, FlatList, Image, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { icon } from "../../../assets/icons";
import ProgrammingCourses from "../../../components/programmingCourses";
import courses from "/Users/ai/Desktop/Projects/LMS/src/jsons/dummy5Courses.json"
import { useNavigation, useRoute } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import firestore from '@react-native-firebase/firestore';
import { useDispatch, useSelector } from "react-redux";
import { addCourseToCart } from "../../../redux/myCart/myCartSlice";
import { addToPaidCourses } from "../../../redux/paidCourses/paidCoursesSlice";
import { Slider } from "../../../components/slider";
import styles from "./styles";


const bannerData1 = [
    {
        bannerImageUrl: icon[1]
    },
    {
        bannerImageUrl: icon[2]
    },
    {
        bannerImageUrl: icon[3]
    },
    {
        bannerImageUrl: icon[4]
    },
];

export function Home() {
    const navigation = useNavigation();
    const inputRef = useRef(null);

    const CourseItem = ({ name, img, price }) => (
        <View style={styles.item}>
            <Image source={{ uri: img }} style={styles.image} />
            <View style={styles.textContainer}>
                <Text style={styles.title}>{name}</Text>
                <Text style={styles.price}>${price.toFixed(2)}</Text>
            </View>
        </View>
    );

    const handleNav = () => {
        if (inputRef.current) {
            inputRef.current.blur();
        }
        navigation.navigate('Search')
    }

    const name = AsyncStorage.getItem('name')
    const myCartCourses = useSelector(state => state.cart);
    const count = myCartCourses.length;
    const dispatch = useDispatch();

    const fetchCartData = async () => {
        try {
            const userUID = await AsyncStorage.getItem('userUID');

            const cartSnapshot = await firestore()
                .collection('users')
                .doc(userUID)
                .collection('cart')
                .get();

            const cartItems = cartSnapshot.docs.map(doc => doc.data());
            cartItems.forEach(item => {
                const alreadyInCart = myCartCourses.some(course => course.id === item.id);
                if (!alreadyInCart) {
                    dispatch(addCourseToCart(item));
                }
            });
        } catch (error) {
            console.error('Error fetching cart data:', error);
            Alert.alert('Error loading cart data');
        }
    };

    const paidCourses = useSelector(state => state.paidCourses);
    const fetchPaidCourses = async () => {
        try {
            const userUID = await AsyncStorage.getItem('userUID');

            const paidSnapshot = await firestore()
                .collection('users')
                .doc(userUID)
                .collection('paidCourses')
                .get();

            const paidItems = paidSnapshot.docs.map(doc => doc.data());
            paidItems.forEach(item => {
                const alreadyInPaidCourse = paidCourses.some(course => course.id === item.id);
                if (!alreadyInPaidCourse) {
                    dispatch(addToPaidCourses(item));
                }
            });
        } catch (error) {
            console.error('Error fetching paidCourse data:', error);
            Alert.alert('Error loading paidCourse data');
        }
    };

    useEffect(() => {
        fetchCartData();
        fetchPaidCourses();
    }, []);


    return (
        <SafeAreaView style={styles.cont}>
            <View style={styles.head}>
                <View style={styles.flexRow}>
                    <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
                        <Image
                            source={icon.userr}
                            style={styles.userr}
                        />
                    </TouchableOpacity>
                    <View>
                        <Text style={styles.txt1}>Hello,</Text>
                        <Text style={styles.txt2}>{name}</Text>
                    </View>
                </View>
                <TouchableOpacity onPress={() => navigation.navigate('MyCart')}>
                    { count >0 ?
                    <View style={{position:'relative'}}>
                    <Image
                        source={icon.bag}
                        style={styles.bag}
                    />
                    <View style={styles.cnt}>
                        <Text style={styles.cntTxt}>{count}</Text>
                    </View>
                    </View>:
                    <Image
                        source={icon.bag}
                        style={styles.bag}
                    />
                    }
                </TouchableOpacity>
            </View>
            <View style={styles.searchBar}>
                <Image
                    source={icon.search1}
                    style={styles.search}
                />
                <TextInput
                    placeholder="Search"
                    style={styles.searchInput}
                    numberOfLines={1}
                    onFocus={handleNav}
                    ref={inputRef}
                />
            </View>
            <ScrollView showsVerticalScrollIndicator={false}>
                <Slider bannerData={bannerData1} time={2} />
                <ProgrammingCourses />
                <Text style={styles.heading}>Trending Courses</Text>
                <View>
                    <FlatList
                        data={courses.courses}
                        renderItem={({ item }) => <CourseItem {...item} />}
                        keyExtractor={(item, index) => index.toString()}
                        horizontal
                        showsHorizontalScrollIndicator={false}
                    />
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}