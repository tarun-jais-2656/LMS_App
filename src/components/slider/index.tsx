import { useNavigation } from "@react-navigation/native";
import React from "react";
import { Image, StyleSheet, TouchableOpacity, View } from "react-native";
import Swiper from "react-native-swiper";
import styles from "./styles";


export const Slider = ({ bannerData, time }) => {
    const navigation = useNavigation()
    const handleNav = () => {
        navigation.navigate('Search');
    }
    return (
        <View style={styles.container}>
            <Swiper
                dotStyle={styles.dot}
                activeDotStyle={styles.activeDot}
                autoplay={true}
                autoplayTimeout={time}
            >
                {bannerData.map((item, index) => (
                    <View key={index} style={styles.slide}>
                        <TouchableOpacity onPress={handleNav}>
                            <Image
                                source={item.bannerImageUrl}
                                style={styles.img}
                            />
                        </TouchableOpacity>
                    </View>
                ))}
            </Swiper>
        </View>
    )
}

