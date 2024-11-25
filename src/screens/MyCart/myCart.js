import React, { useState } from "react";
import { Alert, Dimensions, FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useDispatch, useSelector } from "react-redux";
import { Modalpay } from "../../components/modal";
import { addToPaidCourses } from "/Users/ai/Desktop/Projects/LMS/src/redux/paidCourses/paidCoursesSlice.js"; // Import addToPaidCourses action
import { removeFromCart } from "/Users/ai/Desktop/Projects/LMS/src/redux/myCart/myCartSlice.js" // Import removeFromCart action


const { width } = Dimensions.get('window');
export default function MyCart() {
    const [isModalVisible, setModalVisible] = useState(false);
    const myCartCourses = useSelector(state => state.cart);
    const dispatch = useDispatch();
    // console.log(myCartCourses);
    let total = 0;
    for (let i = 0; i < myCartCourses.length; i++) {
        total += myCartCourses[i].price;
    }
    // console.log(total)

    const onBackdropPress = () => {
        setModalVisible(!isModalVisible);
    }

    const handlePayment = () => {
        // Move all courses from cart to paidCourses and remove them from the cart
        myCartCourses.forEach(course => {
            dispatch(addToPaidCourses(course));  // Add to paid courses list
            dispatch(removeFromCart(course.id));  // Remove from cart
        });
        setModalVisible(false);
        Alert.alert("Payment done successfully.")
    }


    const renderCourse = ({ item }) => (
        <TouchableOpacity>
            <View style={styles.card}>
                <View style={styles.imgRemove}>
                    <Image source={{ uri: item.image_480x270 }} style={styles.image} />
                    <TouchableOpacity style={styles.removeBtn}>
                        <Text style={styles.txt}>Remove</Text>
                    </TouchableOpacity>
                </View>
                <Text style={styles.title}>{item.title}</Text>
                <Text style={styles.name}>{item.visible_instructors[0].title}</Text>
                <Text style={styles.hours}>Price:  <Text style={styles.colorTxt1}>${item.price}</Text></Text>
            </View>
        </TouchableOpacity>
    );

    return (
        <SafeAreaView style={styles.container}>
            <FlatList
                data={myCartCourses}
                renderItem={renderCourse}
                keyExtractor={(item) => item.id.toString()}
                showsVerticalScrollIndicator={false}
            />

            <View style={styles.txtView}>
                <Text style={styles.txt2}>Total Price: ${total}</Text>
                <TouchableOpacity style={styles.btn} onPress={() => setModalVisible(!isModalVisible)}>
                    <Text style={styles.txtBtn}>Go For Payment</Text>
                </TouchableOpacity>
            </View>
            <Modalpay
                isModalVisible={isModalVisible}
                onBackdropPress={onBackdropPress}
                total={total}
                handlePayment={handlePayment} // Pass handlePayment function
            />
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginHorizontal: 16,
    },
    card: {
        backgroundColor: 'white',
        borderRadius: 8,
        padding: 10,
        marginBottom: 10,
        elevation: 5, // Shadow for Android
        shadowColor: '#000', // Shadow for iOS
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
    },
    imgRemove: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    removeBtn: {
        backgroundColor: "red",
        justifyContent: 'center',
        marginVertical: 30,
        paddingHorizontal: 10,
        borderRadius: 10,
    },
    txt: {
        fontSize: 14,
        fontWeight: '700',
        color: '#FFFFFF'
    },
    image: {
        height: 100,
        width: width / 2,
        borderRadius: 8,
        // resizeMode: 'contain'
    },
    title: {
        fontSize: 16,
        fontWeight: 'bold',
        marginTop: 10,
    },
    name: {
        fontSize: 14,
        color: 'gray',
        marginVertical: 5,
    },
    hours: {
        fontSize: 16,
        marginBottom: 10,
    },
    colorTxt1: {
        fontWeight: '700'
    },
    txtView: {
        paddingVertical: 20,
        alignItems: 'center'
    },
    txt2: {
        fontSize: 20,
        fontWeight: '700'
    },
    txtBtn: {
        fontSize: 18,
        fontWeight: '700',
        color: "#FFFFFF"
    },
    btn: {
        backgroundColor: '#51a6f5',
        paddingVertical: 10,
        width: width * 0.93,
        alignItems: 'center',
        marginTop: 5,
        borderRadius: 10
    }
})