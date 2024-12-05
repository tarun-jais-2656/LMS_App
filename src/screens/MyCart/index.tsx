import React, { useEffect, useState } from "react";
import { Alert, Dimensions, FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { Modalpay } from "../../components/modal";
import { clearCart, removeFromCart } from "../../redux/myCart/myCartSlice";
import firestore from '@react-native-firebase/firestore';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { icon } from "../../assets/icons";
import { Header } from "../../components/header";
import { useNavigation } from "@react-navigation/native";
import styles from "./styles";


export default function MyCart() {
    const navigation=useNavigation();
    const [isModalVisible, setModalVisible] = useState(false);
    const dispatch = useDispatch();

    const myCartCourses = useSelector(state => state.cart);
    let total = 0;
    myCartCourses.forEach(course => {
        total += course.price;
    });

    const handlePayment = async () => {
        try {
            const userUID = await AsyncStorage.getItem('userUID');

            if (userUID) {
                for (const item of myCartCourses) {
                    await firestore()
                        .collection('users')
                        .doc(userUID)
                        .collection('paidCourses')
                        .doc(item.id.toString())
                        .set({
                            id: item.id,
                            title: item.title,
                            price: item.price,
                            image_480x270: item.image_480x270,
                            visible_instructors: item.visible_instructors,
                            visible_instructors_img: item.visible_instructors_img,
                            videoUrl: item.videoUrl,
                        });
                }

                dispatch(clearCart());
                setModalVisible(false);

                await firestore()
                    .collection('users')
                    .doc(userUID)
                    .collection('cart')
                    .get()
                    .then(querySnapshot => {
                        if (!querySnapshot.empty) {
                            querySnapshot.forEach(doc => doc.ref.delete());
                        }
                    });

                Alert.alert("Payment done successfully.");

            } else {
                Alert.alert('User ID not found.');
            }
        } catch (error) {
            console.error('Error adding paidCourse:', error);
            Alert.alert('Error adding paidCourse.');
        }
    };

    const handleRemoveCourse = async (id) => {
        const Id = String(id);
        try {
            const userUID = await AsyncStorage.getItem('userUID');

            await firestore()
                .collection('users')
                .doc(userUID)
                .collection('cart')
                .doc(Id)
                .delete();

            dispatch(removeFromCart(id));

        } catch (error) {
            console.error('Error removing course:', error);
            Alert.alert('Error', 'There was an issue removing the course from your cart.');
        }
    };

    const onBackdropPress = () => {
        setModalVisible(!isModalVisible);
    };

    const renderCourse = ({ item }) => {
        return (
            <TouchableOpacity>
                <View style={styles.card}>
                    <View style={styles.imgRemove}>
                        <Image source={{ uri: item.image_480x270 }} style={styles.image} />
                        <TouchableOpacity style={styles.removeBtn} onPress={() => handleRemoveCourse(item.id)}>
                            <Text style={styles.txt}>Remove</Text>
                        </TouchableOpacity>
                    </View>
                    <Text style={styles.title}>{item.title}</Text>
                    <Text style={styles.hours}>
                        Price:  <Text style={styles.colorTxt1}>${item.price}</Text>
                    </Text>
                </View>
            </TouchableOpacity>
        )
    };

    const handleNav = () => {
        navigation.reset({
            index: 0,
            routes: [{ name: 'BottomTab', params: { screen: 'Home' } }]
        });
    };

    return (
        <View style={styles.container1}>
        <Header title={"MyCart"} onpress={handleNav}/>
        <View style={styles.container}>
            {myCartCourses.length > 0 ?
                <View style={styles.flat}>
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
                </View>
                : <View style={styles.empty}>
                    <Image source={icon.emptyCart} style={styles.emptyCart}/>
                    <Text style={styles.txtCart}>Your cart is empty!</Text>
                </View>
            }

            <Modalpay
                isModalVisible={isModalVisible}
                onBackdropPress={onBackdropPress}
                total={total}
                handlePayment={handlePayment}
            />
        </View>
        </View>
    );
}
