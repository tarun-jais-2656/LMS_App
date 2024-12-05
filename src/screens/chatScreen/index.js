import React, { useEffect, useState } from "react";
import { Image, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Bubble, GiftedChat, InputToolbar, Send } from 'react-native-gifted-chat';
import { useNavigation, useRoute } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import firestore from '@react-native-firebase/firestore';
import { icon } from "../../assets/icons";

export const ChatScreen = () => {
    const [messages, setMessages] = useState([]);
    const [userUID, setUserUID] = useState(null);
    const route = useRoute();
    const { course } = route.params;

    const chatImg = course.visible_instructors_img;
    const chatName = course.visible_instructors;

    const getUserUid = async () => {
        const uid = await AsyncStorage.getItem('userUID');
        setUserUID(uid);
    };

    useEffect(() => {
        getUserUid();

        // Fetch existing messages from Firestore when the screen is loaded
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
                    setMessages(fetchedMessages.reverse()); // Reverse messages to show latest at bottom
                });

            // Cleanup subscription on unmount
            return () => unsubscribe();
        }
    }, [userUID, course.id]);

    const onSend = async (messageArray) => {
        const msg = messageArray[0];
        const myMsg = {
            ...msg,
            senderId: userUID,
            recieverId: course.id,
            createdAt: new Date(),
        };

        // Append message to local state (GiftedChat will update the UI)
        setMessages(previousMessages => GiftedChat.append(previousMessages, myMsg));

        // Store message in Firestore
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

    const navigation = useNavigation();

    const handleNav = () => {
        navigation.reset({
            index: 0,
            routes: [{ name: 'CoursePlaylist', params: { course } }]
        });

    };

    return (
        <View style={styles.container}>
            <SafeAreaView style={{ backgroundColor: 'skyblue' }}>
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
                renderSend={props => {
                    return (
                        <Send {...props} containerStyle={{ justifyContent: 'center' }}>
                            <Image
                                source={icon.send}
                                style={{ height: 25, width: 25, marginRight: 15 }}
                            />
                        </Send>
                    );
                }}
                renderInputToolbar={props => {
                    return (
                        <View style={{ padding: 10, backgroundColor: '#F0F0F0' }}>
                            <InputToolbar {...props} containerStyle={{ borderRadius: 10, justifyContent: 'center', marginBottom: 20 }} />
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

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    header: {
        backgroundColor: 'skyblue',
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 5,
        justifyContent: 'space-between',
    },
    name: {
        fontSize: 20,
        fontWeight: '700',
    },
    back: {
        height: 25,
        width: 25,
        marginHorizontal: 10,
    },
    img: {
        backgroundColor: 'grey',
        height: 80,
        width: 80,
        borderRadius: 100,
        marginRight: 10,
    },
    flx: {
        flexDirection: 'row',
        alignItems: 'center',
    },
});
