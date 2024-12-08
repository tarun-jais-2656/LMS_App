import { useNavigation, useRoute } from "@react-navigation/native";
import React from "react";
import { Dimensions, Image, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Module } from "./component/module";
import { Header } from "../../components/header";
import styles from "./styles";
const { width } = Dimensions.get('window');


export const CoursePlaylist = () => {
    const route = useRoute();
    const { course } = route.params;
    console.log(course)
    const navigation = useNavigation();

    const handlenav = () => {
        navigation.navigate('VideoPlayer',{course})
    }
    const handleNav = () => {
        navigation.reset({
            index: 0,
            routes: [{ name: 'BottomTab', params: { screen: 'MyCourses' } }]
        });

    };


    const handleNavToChat = () => {
        navigation.navigate('ChatScreen', { course })
    }
    return (
        <View style={styles.container}>
            <Header title={"CoursePlayList"} onpress={handleNav} />
            <SafeAreaView style={styles.subCon}>
                <ScrollView showsVerticalScrollIndicator={false}>
                    <Image source={{ uri: course.image_480x270 }} style={styles.image} />
                    <Text style={styles.title}>{course.title}</Text>
                    <Text style={styles.instructor}>Your Instructor</Text>
                    <View style={styles.flx}>
                        <Image source={{ uri: course.visible_instructors_img || course.visible_instructors[0].image_100x100 }} style={styles.profile} />
                        <View style={{ width: width / 1.6 }}>
                            <Text style={styles.colorTxt}>{Array.isArray(course.visible_instructors) ? course.visible_instructors[0].title.slice(0,25) : course.visible_instructors.slice(0,25)}...</Text>
                            <Text style={styles.colorTxt}>4.7 Rating</Text>
                            <TouchableOpacity style={styles.btn} onPress={handleNavToChat}>
                                <Text style={styles.txt}>Ask your doubt</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <Module module={"Module 1"} title={"Welcome to the Course: What You'll Learn"} handlenav={handlenav} />
                    <Module module={"Module 2"} title={"Foundations of the course: Key Concepts Explained"} handlenav={handlenav} />
                    <Module module={"Module 3"} title={"How to Prepare for Success in this course"} handlenav={handlenav} />
                    <Module module={"Module 4"} title={"Mastering Topics: In-Depth Exploration"} handlenav={handlenav} />
                    <Module module={"Module 5"} title={"Real-World Use Cases of this course"} handlenav={handlenav} />
                    <Module module={"Module 6"} title={"Troubleshooting and Overcoming Challenges"} handlenav={handlenav} />
                    <Module module={"Module 7"} title={"Leveling Up: Advanced Techniques and Strategies"} handlenav={handlenav} />
                    <Module module={"Module 8"} title={"Collaborating Effectively"} handlenav={handlenav} />
                    <Module module={"Module 9"} title={"Learning from the Experts: Real-World Case Studies"} handlenav={handlenav} />
                    <Module module={"Module 10"} title={"Course Recap and How to Continue Your Learning Journey"} handlenav={handlenav} />
                </ScrollView>
            </SafeAreaView>
        </View>
    )
}