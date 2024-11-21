import React from "react";
import { FlatList, Image, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { icon } from "../../../assets/icons";
import { responsiveWidth } from "react-native-responsive-dimensions";
import Swiper from "react-native-swiper";
import ProgrammingCourses from "../../../components/programmingCourses";
import courses from "/Users/ai/Desktop/Projects/LMS/src/jsons/dummy5Courses.json"
import { useNavigation } from "@react-navigation/native";


const bannerData = [
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
    const navigation=useNavigation();
    const CourseItem = ({ name, img, price }) => (
        <View style={styles.item}>
            <Image source={{ uri: img }} style={styles.image} />
            <View style={styles.textContainer}>
                <Text style={styles.title}>{name}</Text>
                <Text style={styles.price}>${price.toFixed(2)}</Text>
            </View>
        </View>
    );

    return (
        <SafeAreaView style={styles.cont}>
            <View style={styles.head}>
                <View style={styles.flexRow}>
                    <Image
                        source={icon.userr}
                        style={styles.userr}
                    />
                    <View>
                        <Text style={styles.txt1}>Hello,</Text>
                        <Text style={styles.txt2}>Tarun</Text>
                    </View>
                </View>
                <TouchableOpacity onPress={()=>navigation.navigate('MyCart')}>
                <Image
                    source={icon.bag}
                    style={styles.bag}
                />
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
                />
            </View>
            <ScrollView>
            <View style={styles.container}>
                <Swiper
                    dotStyle={styles.dot}
                    activeDotStyle={styles.activeDot}
                    autoplay={true}
                    autoplayTimeout={2}
                >
                    {bannerData.map((item, index) => (
                        <View key={index} style={styles.slide}>
                            <Image
                                source={item.bannerImageUrl}
                                style={{ width: 380, height: 200 }}
                            />
                        </View>
                    ))}
                </Swiper>
            </View>
            <View>
                <FlatList
                    data={courses.courses}
                    renderItem={({ item }) => <CourseItem {...item} />}
                    keyExtractor={(item, index) => index.toString()}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                />
            </View>
            <ProgrammingCourses />
            </ScrollView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    cont: {
        flex: 1
    },
    flexRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    head: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginHorizontal: 16,
        alignItems: 'center',
        marginVertical: 10,
    },
    userr: {
        height: 37,
        width: 37,
        marginRight: 10,
        alignSelf: 'center'
    },
    bag: {
        height: 35,
        width: 35,
    },
    txt2: {
        fontWeight: '600',
        fontSize: 15,
    },
    txt1: {
        fontWeight: '500',
        fontSize: 13,
        color: 'grey'
    },
    searchBar: {
        borderWidth: 0.17,
        flexDirection: 'row',
        marginHorizontal: 16,
        padding: 10,
        backgroundColor: '#FFFFFF',
        borderColor: 'grey',
        borderRadius: 10,
        alignItems: 'center'
    },
    search: {
        height: 20,
        width: 20,
        tintColor: 'grey'
    },
    searchInput: {
        marginHorizontal: 15,
    },
    container: {
        marginTop: 12,
        height: 250,
        marginHorizontal: 16,
        resizeMode:'contain'
    },

    slide: { flex: 1 },

    background: {
        width: "100%",
        height: 27,
        resizeMode: "stretch",
        zIndex: 1,
    },

    dot: {
        backgroundColor: "#C6C7CC",
        width: 10,
        height: 10,
        borderRadius: 5,
        marginHorizontal: 3,
    },

    activeDot: {
        backgroundColor: "#2467EC",
        width: 10,
        height: 10,
        borderRadius: 5,
        marginHorizontal: 3,
    },

    backgroundView: {
        position: "absolute",
        zIndex: 5,
        paddingHorizontal: 18,
        paddingVertical: 30,
        flexDirection: "row",
        alignItems: "center",
    },

    backgroundViewContainer: {
        width: responsiveWidth(45),
        height: responsiveWidth(30),
        marginTop: -50,
    },

    backgroundViewText: {
        color: "white",
        fontSize: 3,
    },

    backgroundViewOffer: {
        color: "rgba(255, 255, 255, 0.7)",
        fontSize: 14,
        marginTop: 5,
    },

    backgroundViewImage: {
        width: 38,
        height: 22,
        top: -15,
    },

    backgroundViewButtonContainer: {
        borderWidth: 1.1,
        borderColor: "rgba(255, 255, 255, 0.5)",
        width: 109,
        height: 32,
        borderRadius: 5,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 25,
    },

    backgroundViewButtonText: {
        color: "#FFFF",
    },
    item: {
        padding: 10,
        borderRadius: 8,
        marginRight: 15, // Space between items
        backgroundColor: '#fff',
      },
      image: {
        width: 350, // Make the image a rectangle with custom width
        height: 200, // Custom height for the rectangular shape
        borderRadius: 8,
      },
      textContainer: {
        flexDirection:'row',
        justifyContent:'space-between',
        marginTop:10
      },
      title: {
        fontSize: 16,
        fontWeight: 'bold',
      },
      price: {
        fontSize: 14,
        color: '#888',
      },
})