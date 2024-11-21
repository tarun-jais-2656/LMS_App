import React, { useState } from "react";
import { View, Text, StyleSheet, Image, SafeAreaView, Dimensions, TouchableOpacity, ScrollView } from "react-native";
import { useNavigation, useRoute } from '@react-navigation/native';
import Video from 'react-native-video'
import { useDispatch, useSelector } from "react-redux";
import { addCourseToCart } from "../../redux/myCart/myCartSlice";



const { width, height } = Dimensions.get("window"); // Get screen dimensions

export default function CourseDetail() {
    const navigation=useNavigation();
    const dispatch = useDispatch();
    const [addedToCart, setAddedToCart] = useState(false);

    const handlePress = () => {
        if (!addedToCart) {
            dispatch(addCourseToCart(course));
        }
        if (addedToCart) {
            navigation.navigate('MyCart'); // Replace 'MyCart' with your actual screen name
          }
        setAddedToCart(!addedToCart); // Toggle the state
    };
    // const myCartCourses=useSelector(state=>state.cart);
    // console.log(myCartCourses);

    const route = useRoute();
    const { course } = route.params;
    // console.log(course)

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView showsVerticalScrollIndicator={false} >
                {/* <Video
                source={{ uri: res[0].url }}
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
                        <TouchableOpacity style={{ borderWidth: 1, padding: 10, backgroundColor: '#6e30ba', alignItems: 'center', borderRadius: 10, marginBottom: 10 }}>
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
        fontWeight:'700'
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
        // width: width, // Use full screen width
        height: 220, // You can adjust this depending on the aspect ratio or desired height
    },
});
