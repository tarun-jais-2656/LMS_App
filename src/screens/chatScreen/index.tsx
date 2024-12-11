import React, { useEffect, useState } from "react";
import { Image, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Bubble, GiftedChat, InputToolbar, Send } from 'react-native-gifted-chat';
import { useNavigation, useRoute } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import firestore from '@react-native-firebase/firestore';
import { icon } from "../../assets/icons";
import styles from "./styles";

export const ChatScreen = () => {
    const [messages, setMessages] = useState([]);
    const [userUID, setUserUID] = useState(null);
    const route = useRoute();
    const { course } = route.params;
    const navigation = useNavigation();
    const chatImg = course.visible_instructors_img || course.visible_instructors[0].image_100x100;
    const chatName = Array.isArray(course.visible_instructors) ? course.visible_instructors[0].title : course.visible_instructors;

    const getUserUid = async () => {
        const uid = await AsyncStorage.getItem('userUID');
        setUserUID(uid);
    };

    useEffect(() => {
        getUserUid();
        if (userUID) {
            const unsubscribe = firestore()
                .collection('users')
                .doc(userUID)
                .collection('chats')
                .doc(course.id.toString())
                .collection('messages')
                .orderBy('createdAt', 'asc')
                .onSnapshot(snapshot => {
                    const fetchedMessages = snapshot.docs.map(doc => {
                        const messageData = doc.data();
                        return {
                            _id: doc.id,
                            text: messageData.text,
                            createdAt: messageData.createdAt.toDate(),
                            user: {
                                _id: messageData.senderId,
                                name: messageData.senderId === userUID ? 'You' : chatName,
                                avatar: chatImg,
                            },
                        };
                    });
                    setMessages(fetchedMessages.reverse());
                });
            return () => unsubscribe();
        }
    }, [userUID, course.id]);

    //try catch is missing in onSend

    const onSend = async (messageArray) => {
        const msg = messageArray[0];
        const myMsg = {
            ...msg,
            senderId: userUID,
            recieverId: course.id,
            createdAt: new Date(),
        };
        setMessages(previousMessages => GiftedChat.append(previousMessages, myMsg));
        await firestore()
            .collection('users')
            .doc(userUID)
            .collection('chats')
            .doc(course.id.toString())
            .collection('messages')
            .add({
                ...myMsg,
                createdAt: new Date(),
            });
    };
    const handleNav = () => {
        navigation.pop();
        navigation.navigate('CoursePlaylist', { course }); 
    };

    //inline function needs to be changed

    const onRenderSend = props => {
        return (
            <Send {...props} containerStyle={{ justifyContent: 'center' }}>
                <Image
                    source={icon.send}
                    style={styles.sendbtn}
                />
            </Send>
        );
    }

    return (
        <View style={styles.container}>
            <SafeAreaView style={styles.bg}>
                <View style={styles.header}>
                    <View style={styles.flx}>
                        <TouchableOpacity onPress={handleNav}>
                            <Image
                                source={icon.backs}
                                style={styles.back}
                            />
                        </TouchableOpacity>
                        <Image
                            source={{ uri: chatImg }}
                            style={styles.img}
                        />
                        <Text style={styles.name}>{chatName.slice(0, 10)}...</Text>
                    </View>
                    <View style={styles.flx}>
                        <Image
                            source={icon.video}
                            style={styles.back}
                        />
                        <Image
                            source={icon.phonecall}
                            style={styles.back}
                        />
                        <Image
                            source={icon.dots}
                            style={styles.back}
                        />
                    </View>
                </View>
            </SafeAreaView>
            <GiftedChat
                messages={messages}
                onSend={messages => onSend(messages)}
                user={{
                    _id: userUID,
                }}
                alwaysShowSend
                renderSend={onRenderSend}
                renderInputToolbar={props => {
                    return (
                        <View style={styles.input}>
                            <InputToolbar {...props} containerStyle={styles.inpCont} />
                        </View>
                    );
                }}
                renderBubble={props => {
                    return (
                        <Bubble
                            {...props}
                            wrapperStyle={{
                                right: {
                                    backgroundColor: 'skyblue',
                                },
                            }}
                        />
                    );
                }}
            />
        </View>
    );
};
