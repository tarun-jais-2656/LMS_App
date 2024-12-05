import React, { useState } from "react";
import { View, Text, StyleSheet, Image, SafeAreaView, Dimensions, TouchableOpacity, ScrollView, Alert } from "react-native";
import { useNavigation, useRoute } from '@react-navigation/native';
import Video from 'react-native-video';
import { useDispatch } from "react-redux";
import { Modalpay } from "../../components/modal";
import { addToPaidCourses } from "/Users/ai/Desktop/Projects/LMS/src/redux/paidCourses/paidCoursesSlice.js";
import AsyncStorage from "@react-native-async-storage/async-storage";
import firestore from '@react-native-firebase/firestore';
import { icon } from "../../assets/icons";
import { Header } from "../../components/header";

const { width, height } = Dimensions.get("window");

export default function CourseDetail() {
    const navigation = useNavigation();
    const dispatch = useDispatch();
    const [addedToCart, setAddedToCart] = useState(false);
    const [isModalVisible, setModalVisible] = useState(false);

    const route = useRoute();
    const { course } = route.params;
    console.log(course);


    const handlePress = async () => {
        try {
            const userUID = await AsyncStorage.getItem('userUID');

            if (!addedToCart) {
                await firestore()
                    .collection('users')
                    .doc(userUID)
                    .collection('cart')
                    .doc(course.id.toString())
                    .set({
                        id: course.id,
                        title: course.title,
                        price: course.price,
                        image_480x270: course.image_480x270,
                        visible_instructors: course.visible_instructors[0].title,
                        videoUrl: course.videoUrl,
                        visible_instructors_img:course.visible_instructors[0].image_100x100,
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

    const handlePayment = async () => {
        try {
            const userUID = await AsyncStorage.getItem('userUID');

            if (userUID) {
                await firestore()
                    .collection('users')
                    .doc(userUID)
                    .collection('paidCourses')
                    .doc(course.id.toString())
                    .set({
                        id: course.id,
                        title: course.title,
                        price: course.price,
                        image_480x270: course.image_480x270,
                        visible_instructors: course.visible_instructors[0].title,
                        visible_instructors_img:course.visible_instructors[0].image_100x100,
                        videoUrl: course.videoUrl,
                    });
                setModalVisible(false);
                Alert.alert("Payment done successfully.");
            } else {
                Alert.alert('User ID not found.');
            }
        } catch (error) {
            console.error('Error adding paidCourse:', error);
            Alert.alert('Error adding paidCourse.');
        }
    };
    const handleNav = () => {
        navigation.reset({
            index: 0,
            routes: [{ name: 'BottomTab'}]
        });

    };

    return (
        <View style={styles.container1}>
            <Header title={"CourseDetail"} onpress={handleNav}/>
        <SafeAreaView style={styles.container}>
            <ScrollView showsVerticalScrollIndicator={false}>
                {course ? (
                    <>
                        <Image source={{ uri: course.image_480x270 }} style={styles.image} />
                        <Text style={styles.description}>{course.headline}</Text>
                        <Text style={styles.title}>{course.title}</Text>
                        <Text style={styles.instructor}>Instructor: <Text style={styles.colorTxt}>{course.visible_instructors[0].title}</Text></Text>
                        <Text style={styles.rating}>Rating: <Text style={styles.colorTxt}>{course.avg_rating}</Text></Text>
                        <Text style={styles.hours}>Duration: <Text style={styles.colorTxt}>{course.content_info_short}</Text></Text>
                        <View style={styles.view}>
                            <Text style={styles.hours}><Text style={styles.colorTxt1}>${course.price}</Text></Text>
                            <View style={styles.view1}>
                                <Text style={styles.best}>BestSeller</Text>
                            </View>
                        </View>
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
                        <Text style={styles.heading}>What you'll learn</Text>
                        <View style={styles.txtView}>
                            <View style={styles.flx}>
                                <Image style={styles.icon} source={icon.star} />
                                <Text style={styles.txt}>{course.objectives_summary[0]}</Text>
                            </View>
                            <View style={styles.flx}>
                                <Image style={styles.icon} source={icon.star} />
                                <Text style={styles.txt}>{course.objectives_summary[1]}</Text>
                            </View>
                            <View style={styles.flx}>
                                <Image style={styles.icon} source={icon.star} />
                                <Text style={styles.txt}>{course.objectives_summary[2]}</Text>
                            </View>
                        </View>
                        <Text style={styles.heading}>This course includes</Text>
                        <View>
                            <View style={styles.flx}>
                                <Image style={styles.icon} source={icon.hours1} />
                                <Text style={styles.txt}>{course.content_info_short} on-demand video</Text>
                            </View>
                            <View style={styles.flx}>
                                <Image style={styles.icon} source={icon.file1} />
                                <Text style={styles.txt}>Support files</Text>
                            </View>
                            <View style={styles.flx}>
                                <Image style={styles.icon} source={icon.article} />
                                <Text style={styles.txt}>{course.num_published_lectures} Total articles</Text>
                            </View>
                            <View style={styles.flx}>
                                <Image style={styles.icon} source={icon.assign} />
                                <Text style={styles.txt}>19 Assignments</Text>
                            </View>
                            <View style={styles.flx}>
                                <Image style={styles.icon} source={icon.coding} />
                                <Text style={styles.txt}>23 Coding Assignments</Text>
                            </View>
                            <View style={styles.flx}>
                                <Image style={styles.icon} source={icon.limitless} />
                                <Text style={styles.txt}>Full lifetime access</Text>
                            </View>
                            <View style={styles.flx}>
                                <Image style={styles.icon} source={icon.phone} />
                                <Text style={styles.txt}>Accessible to android and ios both</Text>
                            </View>
                            <View style={styles.flx}>
                                <Image style={styles.icon} source={icon.phone} />
                                <Text style={styles.txt}>Certificate of Completion</Text>
                            </View>
                        </View>
                        <Text style={styles.heading}>Requirements</Text>
                        <View style={styles.flx}>
                            <Image style={styles.icon} source={icon.dot} />
                            <Text style={styles.txt}>No programming experience needed - I'll teach{"\n"}you everything you need to know</Text>
                        </View>
                        <View style={styles.flx}>
                            <Image style={styles.icon} source={icon.dot} />
                            <Text style={styles.txt}>A phone android or ios with access to the internet</Text>
                        </View>
                        <View style={styles.flx}>
                            <Image style={styles.icon} source={icon.dot} />
                            <Text style={styles.txt}>No paid software required = I'll teach you how to setup environment for this course</Text>
                        </View>
                        <Text style={styles.heading}>Description</Text>
                        <Text style={styles.txt}>Welcome to {course.title} - {course.headline}. With over {course.num_subscribers} subscriber and {course.avg_rating} rating, my courses are to much for any learner.</Text>
                        <Text style={styles.heading}>Student Feedback</Text>
                        <View style={styles.review}>
                            <View style={styles.flx1}>
                                <Text style={styles.rate}>{course.avg_rating.toFixed(1)}</Text>
                                <Text style={styles.txt2}>course rating</Text>
                            </View>
                            <Image source={icon.rating} style={styles.ratingImg}/>
                        </View>
                        <View style={styles.review}>
                            <Text style={styles.name}>Albert William</Text>
                            <Text style={styles.txt3}>⭐⭐⭐⭐⭐   4 weeks ago</Text>
                            <Text style={styles.txt3}>Thank you for your kind words! We are thrilled to have made an impact on your studies! Your continued success is very important to us. We are here to support you as you continue on your learning journey. Wishing you continued success in your studies.</Text>
                        </View>
                        <View style={styles.review}>
                            <Text style={styles.name}>Akshat Sinha</Text>
                            <Text style={styles.txt3}>⭐⭐⭐   8 weeks ago</Text>
                            <Text style={styles.txt3}>Thank you for your kind words! We are thrilled to have made an impact on your studies! Your continued success is very important to us. We are here to support you as you continue on your learning journey. Wishing you continued success in your studies.</Text>
                        </View>
                        <View style={styles.review}>
                            <Text style={styles.name}>Harsh Garg</Text>
                            <Text style={styles.txt3}>⭐⭐⭐⭐⭐   12 weeks ago</Text>
                            <Text style={styles.txt3}>Thank you for your kind words! We are thrilled to have made an impact on your studies! Your continued success is very important to us. We are here to support you as you continue on your learning journey. Wishing you continued success in your studies.</Text>
                        </View>
                        <View style={styles.review}>
                            <Text style={styles.name}>Jhon Duo</Text>
                            <Text style={styles.txt3}>⭐⭐   18 weeks ago</Text>
                            <Text style={styles.txt3}>Thank you for your kind words! We are thrilled to have made an impact on your studies! Your continued success is very important to us. We are here to support you as you continue on your learning journey. Wishing you continued success in your studies.</Text>
                        </View>
                        <TouchableOpacity style={styles.btn}>
                            <Text style={styles.btnTxt}>See more Reviews</Text>
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
        </View>
    );
}

const styles = StyleSheet.create({
    container1: {
        flex: 1,
    },
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
    view: {
        flexDirection: 'row',
        justifyContent: "space-between",
        alignItems: 'center'
    },
    view1: {
        padding: 10,
        backgroundColor: '#9dcf82',
        marginBottom: 10,
        borderRadius: 8,
    },
    best: {
        fontWeight: '600',
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
        fontWeight: '700',
        fontSize: 30
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
    heading: {
        fontSize: 20,
        fontWeight: 'bold',
        marginTop: 30,
    },
    txtView: {
        // marginLeft: 20,
    },
    txt: {
        fontSize: 16,
        margin: 6,
        color: 'grey',
    },
    icon: {
        width: 20,
        height: 20,
        margin: 6
    },
    flx: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    flx1: {
        flexDirection: 'row',
        // alignItems:'flex-end',
        marginVertical: 15
    },
    rate: {
        fontSize: 30,
        fontWeight: '700',
    },
    txt2: {
        color: 'grey',
        alignSelf: 'flex-end',
        marginBottom: 5,
        fontSize: 16
    },
    ratingImg:{
        resizeMode:'contain',
        height:250,
        width:400,
    },
    name:{
        fontSize: 16,
        fontWeight: 'bold',
    },
    txt3:{
        color:'grey',
        marginTop:5,
    },
    review:{
        marginBottom:20,
    },
    btn:{
        paddingVertical:10,
        borderRadius:8,
        borderWidth:1,
        alignItems:'center'
    },
    btnTxt:{
        fontSize:16,
        fontWeight:'600'
    },
});
