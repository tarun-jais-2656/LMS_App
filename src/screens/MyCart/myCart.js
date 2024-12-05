import React, { useEffect, useState } from "react";
import { Alert, Dimensions, FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useDispatch, useSelector } from "react-redux";
import { Modalpay } from "../../components/modal";
import { addToPaidCourses } from "/Users/ai/Desktop/Projects/LMS/src/redux/paidCourses/paidCoursesSlice.js";
import { clearCart, removeFromCart } from "/Users/ai/Desktop/Projects/LMS/src/redux/myCart/myCartSlice.js";
import { addCourseToCart } from "../../redux/myCart/myCartSlice";
import firestore from '@react-native-firebase/firestore';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { icon } from "../../assets/icons";
import { Header } from "../../components/header";
import { useNavigation } from "@react-navigation/native";

const { width } = Dimensions.get('window');

export default function MyCart() {
    const navigation=useNavigation();
    const [isModalVisible, setModalVisible] = useState(false);
    const dispatch = useDispatch();
    const myCartCourses = useSelector(state => state.cart);
    let total = 0;
    myCartCourses.forEach(course => {
        total += course.price;
    });

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


    useEffect(() => {
        fetchCartData();
    }, []);

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
            Alert.alert('Success', 'Course removed from your cart.');

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
                    <Text style={styles.name}>{item.visible_instructors}</Text>
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
                <View style={{flex:1,marginTop:10}}>
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

const styles = StyleSheet.create({
    container1:{
        flex:1
    },
    container: {
        flex: 1,
        marginHorizontal: 16,
    },
    card: {
        backgroundColor: 'white',
        borderRadius: 8,
        padding: 10,
        marginBottom: 10,
        elevation: 5,
        shadowColor: '#000',
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
        paddingBottom: 20,
        alignItems: 'center',
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
    },
    empty:{
        flex:0.8,
        alignItems:'center',
        justifyContent:'center'
    },
    emptyCart:{
        height:300,
        width:300
    },
    txtCart:{
        fontSize:18,
        fontWeight:'600',
        color:'#bf73f5'
    }
});
