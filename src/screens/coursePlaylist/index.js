import { useRoute } from "@react-navigation/native";
import React from "react";
import { Image, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Module } from "./component/module";

export const CoursePlaylist = () => {
    const route = useRoute();
    const { course } = route.params;
    console.log(course)
    return (
        <SafeAreaView style={styles.container}>
            <ScrollView showsVerticalScrollIndicator={false}>
                <Image source={{ uri: course.image_480x270 }} style={styles.image} />
                <Text style={styles.title}>{course.title}</Text>
                <Text style={styles.instructor}>Your Instructor</Text>

                <View style={styles.flx}>
                    <Image source={{uri:course.visible_instructors_img}} style={styles.profile} />
                    <View>
                        <Text style={styles.colorTxt}>{course.visible_instructors}</Text>
                        <Text style={styles.colorTxt}>4.7 Rating</Text>
                        <TouchableOpacity style={styles.btn}>
                            <Text>Ask your Doubt</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <Module module={"Module 1"} title={"Introduction to the course"} />
                <Module module={"Module 2"} title={"Introduction to the course"} />
                <Module module={"Module 3"} title={"Introduction to the course"} />
                <Module module={"Module 4"} title={"Introduction to the course"} />
                <Module module={"Module 5"} title={"Introduction to the course"} />
                <Module module={"Module 6"} title={"Introduction to the course"} />
                <Module module={"Module 7"} title={"Introduction to the course"} />
                <Module module={"Module 8"} title={"Introduction to the course"} />
                <Module module={"Module 9"} title={"Introduction to the course"} />
                <Module module={"Module 10"} title={"Introduction to the course"} />
            </ScrollView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        marginHorizontal: 16,
    },
    image: {
        width: '100%',
        height: 200,
        borderRadius: 8,
        marginBottom: 10,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        marginTop: 10,
    },
    instructor: {
        fontSize: 18,
        fontWeight: '700',
        marginTop: 20
    },
    colorTxt: {
        color: 'grey',
        marginVertical: 3
    },
    profile: {
        backgroundColor: 'grey',
        height: 100,
        width: 100,
        borderRadius: 100,
        marginRight: 10
    },
    flx: {
        flexDirection: 'row',
        marginTop: 10,
        alignItems: 'center',
        borderBottomWidth: 1,
        paddingBottom: 10,
        borderBottomColor: '#C8C8C8',
    },
    btn: {
        backgroundColor: '#4a91bd',
        paddingVertical: 10,
        alignItems: 'center',
        borderRadius: 10,
        paddingHorizontal: 10,
        width: 280
    }

})