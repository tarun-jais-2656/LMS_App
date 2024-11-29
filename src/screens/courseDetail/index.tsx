import React, { useState } from "react";
import { View, Text, StyleSheet, Image, SafeAreaView, Dimensions, TouchableOpacity, ScrollView, Alert } from "react-native";
import { useNavigation, useRoute } from '@react-navigation/native';
import Video from 'react-native-video';
import { useDispatch } from "react-redux";
import { Modalpay } from "../../components/modal";
import { addToPaidCourses } from "/Users/ai/Desktop/Projects/LMS/src/redux/paidCourses/paidCoursesSlice.js";
import AsyncStorage from "@react-native-async-storage/async-storage";
import firestore from '@react-native-firebase/firestore';

const { width, height } = Dimensions.get("window");

export default function CourseDetail() {
    const navigation = useNavigation();
    const dispatch = useDispatch();
    const [addedToCart, setAddedToCart] = useState(false);
    const [isModalVisible, setModalVisible] = useState(false);

    const route = useRoute();
    const { course } = route.params;
    // console.log(course);
    

    const handlePress = async () => {
        try {
            const userUID = await AsyncStorage.getItem('userUID');  
            if (!userUID) {
                Alert.alert('You must be logged in to add courses to your cart.');
                return;
            }

            if (!addedToCart) {
                await firestore()
                    .collection('users')  
                    .doc(userUID)  
                    .collection('cart')  
                    .doc(course.id.toString())  
                    .set({
                        courseId: course.id,
                        title: course.title,
                        price: course.price,
                        image: course.image_480x270,
                        instructor:course.visible_instructors[0].title,
                        videoUrl:course.videoUrl,
                    });
            } else {
                navigation.navigate('MyCart');  
            }

            setAddedToCart(!addedToCart); 
        } catch (error) {
            console.error('Error adding course to cart:', error);
            Alert.alert('Error adding course to cart.');
        }
    };

    const onBackdropPress = () => {
        setModalVisible(!isModalVisible);
    };

    const handlePayment = () => {
        dispatch(addToPaidCourses(course));
        setModalVisible(false);
        Alert.alert("Payment done successfully.");
    };

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView showsVerticalScrollIndicator={false}>
                {/* <Video
                source={{ uri: course.videoUrl}}
                style={styles.video}
                resizeMode="contain"
            /> */}
                {course ? (
                    <>
                        <Image source={{ uri: course.image_480x270 }} style={styles.image} />
                        <Text style={styles.description}>{course.headline}</Text>
                        <Text style={styles.title}>{course.title}</Text>
                        <Text style={styles.instructor}>Instructor: <Text style={styles.colorTxt}>{course.visible_instructors[0].title}</Text></Text>
                        <Text style={styles.rating}>Rating: <Text style={styles.colorTxt}>{course.avg_rating}</Text></Text>
                        <Text style={styles.hours}>Duration: <Text style={styles.colorTxt}>{course.content_info_short}</Text></Text>
                        <Text style={styles.hours}>Price:  <Text style={styles.colorTxt1}>${course.price}</Text></Text>
                        <TouchableOpacity style={{ borderWidth: 1, padding: 10, backgroundColor: '#6e30ba', alignItems: 'center', borderRadius: 10, marginBottom: 10 }} onPress={() => setModalVisible(!isModalVisible)}>
                            <Text style={{ fontSize: 18, fontWeight: '700', color: '#FFFFFF', }}>Buy now</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={{
                                borderWidth: 1,
                                padding: 10,
                                backgroundColor: '#1d7826',
                                alignItems: 'center',
                                borderRadius: 10,
                            }}
                            onPress={handlePress}
                        >
                            <Text style={{ fontSize: 18, fontWeight: '700', color: '#FFFFFF' }}>
                                {addedToCart ? 'Go To Cart' : 'Add to Cart'}
                            </Text>
                        </TouchableOpacity>
                    </>
                ) : (
                    <Text>No course data available</Text>
                )}
                <Modalpay
                    isModalVisible={isModalVisible}
                    onBackdropPress={onBackdropPress}
                    total={course.price}
                    handlePayment={handlePayment}
                />
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginHorizontal: 16,
        marginTop: 10,
    },
    image: {
        width: '100%',
        height: 200,
        borderRadius: 8,
        marginBottom: 10,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    instructor: {
        fontSize: 16,
        marginBottom: 10,
    },
    colorTxt: {
        color: 'grey'
    },
    colorTxt1: {
        fontWeight: '700'
    },
    rating: {
        fontSize: 16,
        marginBottom: 10,
    },
    hours: {
        fontSize: 16,
        marginBottom: 10,
    },
    description: {
        fontSize: 14,
        color: 'gray',
        marginTop: 10,
    },
    video: {
        height: 220,
    },
});
