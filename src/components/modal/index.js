import React, { useState } from "react";
import { Alert, Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import Modal from "react-native-modal";
import Button from "../button";
import { icon } from "../../assets/icons";


export const Modalpay = ({ isModalVisible, onBackdropPress, total,handlePayment }) => {
    //    console.log(isModalVisible)
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
                            style={{ height: 20, width: 20 }}
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

const styles = StyleSheet.create({
    flx: {
        flexDirection: 'row',
    },
    modalsContent: {
        backgroundColor: '#E6EDF3',
        padding: 30,
        // alignItems: 'center',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        height: '40%',
    },
    modal: {
        justifyContent: 'flex-end',
        margin: 0,
    },
    head: {
        fontSize: 18,
        fontWeight: '700',
        // alignSelf: 'center'
    },
    card: {
        marginTop: 20,
        color: 'grey'
    },
    input: {
        borderWidth: 1,
        borderColor: 'grey',
        paddingVertical: 10,
        borderTopRightRadius: 10,
        borderTopLeftRadius: 10,
        paddingHorizontal: 10,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    input1: {
        borderWidth: 1,
        borderColor: 'grey',
        paddingVertical: 10,
        borderBottomLeftRadius: 10,
        paddingHorizontal: 10,
        width: '50%'
    },
    input2: {
        borderWidth: 1,
        borderColor: 'grey',
        paddingVertical: 10,
        borderBottomRightRadius: 10,
        paddingHorizontal: 10,
        width: '50%'
    },
    btn: {
        backgroundColor: '#51a6f5',
        borderRadius: 10,
        paddingVertical: 10,
        marginTop: 30
    },
    btntxt: {
        fontSize: 18,
        fontWeight: '700',
        color: '#FFFFFF',
        alignSelf: 'center'
    }
})