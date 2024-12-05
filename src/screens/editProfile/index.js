import React, { useState } from "react";
import { View, Text, Image, SafeAreaView, TouchableOpacity, TextInput, FlatList, } from "react-native";
import DateTimePicker from '@react-native-community/datetimepicker';
import styles from "./styles";
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import { icon } from "../../assets/icons";
import Modal from "react-native-modal";

const EditProfile = ({ navigation }) => {
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [pic, setPic] = useState('');
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [genderModalVisible, setGenderModalVisible] = useState(false);
    const [selectedGender, setSelectedGender] = useState('');
    const [genders] = useState(['Male', 'Female', 'Other']);
    const [isModalVisible, setIsModalVisible] = useState(false);

    const launchGallery = async () => {
        launchImageLibrary({ mediaType: 'photo' }, result => {
            if (result.didCancel) {
                console.log('User cancelled image picker');
            } else if (result.error) {
                console.log('ImagePicker Error: ', result.error);
            } else {
                setPic(result.assets[0].uri);
                setIsModalVisible(!isModalVisible);
            }
        });
    };

    const launchCam = async () => {
        launchCamera({ mediaType: 'photo' }, result => {
            if (result.didCancel) {
                console.log('User cancelled image picker');
            } else if (result.error) {
                console.log('ImagePicker Error: ', result.error);
            } else {
                setPic(result.assets[0].uri);
                setIsModalVisible(!isModalVisible);
            }
        });
    };

    const handleNavBack = () => {
        navigation.reset({
            index: 0,
            routes: [{ name: 'BottomTab', params: { screen: 'Profile' } }],
        });
    };

    const toggleGenderModal = () => {
        setGenderModalVisible(prev => !prev);
    };

    const selectGender = (gender) => {
        setSelectedGender(gender);
        setGenderModalVisible(false);
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

    return (
        <SafeAreaView style={styles.safeArea}>
            <View style={styles.container}>
                <View style={styles.subcontainer}>
                    <TouchableOpacity onPress={handleNavBack}>
                        <View style={styles.backView}>
                            <Image source={icon.back1} style={styles.back} />
                        </View>
                    </TouchableOpacity>
                    <View style={styles.txtV}>
                        <Text style={styles.txt1}>Edit Profile</Text>
                    </View>
                </View>

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
                    <TextInput style={styles.name} placeholder="Name" />
                    <TextInput style={styles.username} placeholder="Username" />

                    <View style={styles.calView}>
                        <TextInput
                            placeholder="Birthday"
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

                    <View style={styles.genderView}>
                        <TextInput
                            placeholder="Gender"
                            style={styles.gender}
                            value={selectedGender}
                            editable={false}
                        />
                        <TouchableOpacity onPress={toggleGenderModal}>
                            <View style={styles.dropView}>
                                <Image source={icon.drop} style={styles.dropImg} />
                            </View>
                        </TouchableOpacity>
                    </View>

                    <Modal transparent={true} visible={genderModalVisible} animationType="slide">
                        <View style={styles.genderModalView}>
                            <View style={styles.genderModal}>
                                <FlatList
                                    data={genders}
                                    keyExtractor={(item) => item}
                                    renderItem={({ item }) => (
                                        <TouchableOpacity onPress={() => selectGender(item)}>
                                            <Text style={styles.genderItem}>{item}</Text>
                                        </TouchableOpacity>
                                    )}
                                />
                                <TouchableOpacity onPress={toggleGenderModal}>
                                    <Text style={styles.cancel}>Cancel</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </Modal>
                    <View style={styles.emailView}>
                        <TextInput placeholder="Email ID" style={styles.email} />
                    </View>

                    <View style={styles.updateButton}>
                        <TouchableOpacity>
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
    );
};

export default EditProfile;
