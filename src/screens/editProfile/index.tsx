import React, { useEffect, useState } from "react";
import { View, Text, Image, SafeAreaView, TouchableOpacity, TextInput, FlatList, Alert, } from "react-native";
import DateTimePicker from '@react-native-community/datetimepicker';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import { icon } from "../../assets/icons";
import Modal from "react-native-modal";
import styles from "./styles";
import { Header } from "../../components/header";
import AsyncStorage from "@react-native-async-storage/async-storage";

const EditProfile = ({ navigation }) => {
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [pic, setPic] = useState('');
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [isModalVisible, setIsModalVisible] = useState(false);

    const launchGallery = async() => {
        launchImageLibrary({ mediaType: 'photo' },  result => {
            if (result.didCancel) {
                console.log('User cancelled image picker');
            } else if (result.error) {
                console.log('ImagePicker Error: ', result.error);
            } else {
                const imageUri = result.assets[0].uri;
                setPic(imageUri);
                setIsModalVisible(!isModalVisible); 
            }
        });
    };
    
    const launchCam = async() => {
        launchCamera({ mediaType: 'photo' },result => {
            if (result.didCancel) {
                console.log('User cancelled image picker');
            } else if (result.error) {
                console.log('ImagePicker Error: ', result.error);
            } else {
                const imageUri = result.assets[0].uri;
                setPic(imageUri); 
                setIsModalVisible(!isModalVisible); 
            }
        });
    };

    const saveImg=async()=>{
        await AsyncStorage.setItem('userProfilePic', pic);
        Alert.alert("Profile updated successfully!")
    }

    const onpress = () => {
        navigation.reset({
            index: 0,
            routes: [{ name: 'BottomTab', params: { screen: 'Profile' } }],
        });
    };
    
    const toggleDatePicker = () => {
        setShowDatePicker(prev => !prev);
    };

    const handleDateChange = (event, selectedDate) => {
        if (selectedDate) {
            setSelectedDate(selectedDate);
            setShowDatePicker(false);
        } else {
            setShowDatePicker(false);
        }
    };

    useEffect(() => {
        const loadProfilePic = async () => {
          try {
            const storedPic = await AsyncStorage.getItem('userProfilePic');
            if (storedPic) {
              setPic(storedPic);  
            } else {
              setPic(null); 
            }
          } catch (error) {
            console.error('Error loading profile picture from AsyncStorage:', error);
          }
        };
    
        loadProfilePic();
      }, []);


    return (
        <View style={{flex:1}}>
        <Header title={"Edit Profile"} onpress={onpress}/>
        <SafeAreaView style={styles.safeArea}>
            <View style={styles.container}>
                <View style={styles.profileView}>
                    <View style={styles.profileSub}>
                        <View style={styles.profileSub2}>
                            <Image source={pic ? { uri: pic } : icon.profile} style={styles.profileImg} />
                        </View>
                    </View>
                    <View>
                        <Text style={styles.profileTxt}>Profile Picture</Text>
                        <Text style={styles.profileTxt2} onPress={() => setIsModalVisible(true)}>Change Photo</Text>
                    </View>
                </View>

                <View style={styles.inputView}>
                    <TextInput style={styles.name} placeholder="Name" placeholderTextColor={"#ccc"} />
                    <TextInput style={styles.username} placeholder="Username" placeholderTextColor={"#ccc"} />

                    <View style={styles.calView}>
                        <TextInput
                            placeholder="Birthday"
                            placeholderTextColor={"#ccc"}
                            style={styles.birth}
                            value={selectedDate.toLocaleDateString()}
                            editable={false}
                        />
                        <TouchableOpacity onPress={toggleDatePicker}>
                            <View style={styles.calImgView}>
                                <Image source={icon.calender} style={styles.calImg} />
                            </View>
                        </TouchableOpacity>
                    </View>

                    {showDatePicker && (
                        <DateTimePicker
                            value={selectedDate}
                            mode="date"
                            display="default"
                            onChange={handleDateChange}
                        />
                    )}
                    <TextInput style={styles.name} placeholder="Email" placeholderTextColor={"#ccc"} />

                    <View style={styles.updateButton}>
                        <TouchableOpacity onPress={saveImg}>
                            <Text style={styles.updateButtonTxt}>Update</Text>
                        </TouchableOpacity>
                    </View>                    
                </View>
            </View>

            <Modal
                isVisible={isModalVisible}
                onBackdropPress={() => setIsModalVisible(false)}
                animationIn="slideInUp"
                animationOut="slideOutDown"
                backdropOpacity={0.5}
                style={styles.modal}
            >
                <View style={styles.modalsContent}>
                    <View style={styles.modalHeading}>
                        <Text style={styles.modalHeadingTxt}>Profile Photo</Text>
                    </View>
                    <TouchableOpacity onPress={launchGallery}>
                        <View style={styles.modalContentView}>
                            <View style={styles.galView}>
                                <Image source={icon.gallery} style={styles.galImg} />
                                <Text style={styles.galTxt}>Upload from Gallery</Text>
                            </View>
                            <Image source={icon.next} style={styles.nxtImg} />
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={launchCam}>
                        <View style={styles.modalContentView}>
                            <View style={styles.galView}>
                                <Image source={icon.cam} style={styles.galImg} />
                                <Text style={styles.galTxt}>Use Camera</Text>
                            </View>
                            <Image source={icon.next} style={styles.nxtImg} />
                        </View>
                    </TouchableOpacity>
                    <View style={styles.modalContentView}>
                        <View style={styles.galView}>
                            <Image source={icon.avatar} style={styles.galImg} />
                            <Text style={styles.galTxt}>Select an Avatar</Text>
                        </View>
                        <Image source={icon.next} style={styles.nxtImg} />
                    </View>
                </View>
            </Modal>
        </SafeAreaView>
        </View>
    );
};

export default EditProfile;
