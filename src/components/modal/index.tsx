import React, { useState } from "react";
import { Alert, Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import Modal from "react-native-modal";
import { icon } from "../../assets/icons";
import styles from "./styles";

export const Modalpay = ({ isModalVisible, onBackdropPress, total, handlePayment }) => {
    return (
        <Modal
            isVisible={isModalVisible}
            onBackdropPress={onBackdropPress}
            animationIn="slideInUp"
            animationOut="slideOutDown"
            backdropOpacity={0.5}
            style={styles.modal}
        >
            <View style={styles.modalsContent}>
                <View>
                    <Text style={styles.head}>Add your payment information</Text>
                    <Text style={styles.card}>Card information</Text>
                    <View style={styles.input}>
                        <TextInput
                            placeholder="Card number"
                            keyboardType="numeric"
                        />
                        <Image
                            source={icon.visa}
                            style={styles.img}
                        />
                    </View>
                    <View style={styles.flx}>
                        <TextInput
                            placeholder="MM/YY"
                            style={styles.input1}
                            keyboardType="numeric"
                        />
                        <TextInput
                            placeholder="CVC"
                            style={styles.input2}
                            keyboardType="numeric"
                        />
                    </View>
                    <TouchableOpacity style={styles.btn} onPress={handlePayment}>
                        <Text style={styles.btntxt}>Pay ${total}</Text>
                    </TouchableOpacity>
                </View>
            </View>

        </Modal>
    )
}