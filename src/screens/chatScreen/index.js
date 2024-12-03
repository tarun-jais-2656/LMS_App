import React, { useEffect, useState } from "react";
import { Image, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Bubble, GiftedChat, InputToolbar, Send } from 'react-native-gifted-chat'
import { useNavigation, useRoute } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import firestore from '@react-native-firebase/firestore';
import { icon } from "../../assets/icons";

export const ChatScreen = () => {
    const [messages, setMessages] = useState([])
    const route = useRoute();
    const [userUID, setUserUID] = useState(null);
    const { course } = route.params;
    // const chatImg = icon.account
    // const chatName = "Tarun Jaiswal"
    const chatImg = course.visible_instructors_img;
    const chatName = course.visible_instructors;

    const getUserUid = async () => {
        const uid = await AsyncStorage.getItem('userUID');
        setUserUID(uid);
    };

    useEffect(() => {
        getUserUid();
        setMessages([
            {
                _id: 1,
                text: 'Hello developer',
                createdAt: new Date(),
                user: {
                    _id: 2,
                    name: 'React Native',
                    avatar: chatImg,
                },
            },
        ])
    }, [])

    const onSend = async (messageArray) => {

        const msg = messageArray[0];
        const myMsg = {
            ...msg,
            senderId: userUID,
            recieverId: course.id
        }
        setMessages(previousMessages =>
            GiftedChat.append(previousMessages, myMsg),
        )
        firestore()
            .collection('users')
            .doc(userUID)
            .collection('chats')
            .doc(course.id.toString())
            .set({
                ...myMsg,
                createdAt: new Date()
            })
    };
    const navigation = useNavigation();

    const handleNav = () => {
        navigation.navigate('CoursePlaylist', { course })
    }

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
                renderSend={props=>{
                    return(
                        // <View style={{flexDirection:'rw'}}>

                        // </View>
                        <Send {...props} containerStyle={{justifyContent:'center'}}>
                            <Image
                            source={icon.send}
                            style={{height:25,width:25,marginRight:15}}
                            />

                        </Send>
                    )
                }}
                renderInputToolbar={props=>{
                    return(
                        <View style={{padding:10,backgroundColor:'#F0F0F0'}}>
                        <InputToolbar {...props} containerStyle={{borderRadius:10,justifyContent:'center',marginBottom:20}}>
                        </InputToolbar>
                        </View>
                    )
                }}
                renderBubble={props => {
                    return (
                        <Bubble
                            {...props}
                            wrapperStyle={{
                                right: {
                                    backgroundColor: 'skyblue'
                                }
                            }}
                        />
                    )
                }}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        // marginBottom: 30,
    },
    header: {
        backgroundColor: 'skyblue',
        // paddingTop: 50,  
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 5,
        justifyContent: 'space-between'
    },
    name: {
        fontSize: 20,
        fontWeight: '700',
        // width:150,
    },
    back: {
        height: 25,
        width: 25,
        marginHorizontal: 10
    },
    img: {
        backgroundColor: 'grey',
        height: 80,
        width: 80,
        borderRadius: 100,
        marginRight: 10
    },
    flx: {
        flexDirection: 'row',
        alignItems: 'center'
    }
})