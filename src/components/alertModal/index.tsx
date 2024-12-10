import React from 'react';
import { View, Text, Button, StyleSheet, TouchableOpacity } from 'react-native';
import Modal from 'react-native-modal';

const AlertModal = ({ isModalVisible, msg, onBackdropPress, onClose }) => {
  return (
    <Modal
      isVisible={isModalVisible}
      onBackdropPress={onBackdropPress}
      animationIn="fadeIn"
      animationOut="fadeOut"
      backdropOpacity={0.5}
      useNativeDriver={true}
    >
      <View style={styles.modalContent}>
        <Text style={styles.modalText}>{msg}</Text>
        <TouchableOpacity onPress={onClose} style={styles.btn}>
            <Text style={styles.txt}>OK</Text>
        </TouchableOpacity>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContent: {
    backgroundColor: 'white',
    paddingVertical: 60,
    borderRadius: 10,
    alignItems: 'center',
  },
  modalText: {
    fontSize: 18,
    fontWeight:'700',
    marginBottom: 15,
  },
  txt:{
    fontWeight:'500'
  },
  btn:{
    backgroundColor:'skyblue',
    paddingVertical:10,
    paddingHorizontal:30,
    borderRadius:10,
  }
});

export default AlertModal;
