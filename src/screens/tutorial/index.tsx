import React, { useState } from "react";
import { icon } from "../../assets/icons";
import AppIntroSlider from "react-native-app-intro-slider";
import { useNavigation } from "@react-navigation/native";
import { Alert, Image, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { responsiveWidth } from "react-native-responsive-dimensions";
import Login from "../login";
import AsyncStorage from "@react-native-async-storage/async-storage";
const data=[
    {
        id: 1,
        title: "Start your learning journey with dose of fun!",
        description: "Our engaging learning videos will spark",
        sortDescrition: "your curiosity & enjoyable.",
        image: icon.intro_1,
      },
      {
        id: 2,
        title: "Discover your passion, elevate your expertise",
        description: "Our comprehensive our courses and expert",
        sortDescrition: "instructors to guide every step.",
        image: icon.intro_2,
      },
      {
        id: 3,
        title: "Get online certificate with Unusual skills",
        description: "To earn an online certificate, individuals",
        sortDescrition: "typically need to complete the required coursework.",
        image: icon.intro_3,
      },
]
const renderItem=({item})=>(
    <View style={styles.render}>
        <Image 
        source={item.image}
        style={styles.slideImg}
        />
        <Text style={styles.txt}>{item.title}</Text>
        <Text style={styles.txt1}>{item.description}</Text>
        <Text style={styles.txt1}>{item.sortDescrition}</Text>
    </View>
)


const Tutorial=()=>{
    const navigation = useNavigation()
    const [tut,setTut]=useState('flase');

    const onPress=async()=>{
        setTut('true')
        await AsyncStorage.setItem('tut', tut);
        navigation.navigate('Login')
    }
    return(
        <SafeAreaView style={styles.container}>
        <AppIntroSlider
        renderItem={renderItem}
        data={data}
        onDone={()=>{
            navigation.reset({index:0,routes:[{name:'Login'}]});
        }}
        onSkip={()=>{
            navigation.reset({index:0,routes:[{name:'Login'}]});
        }}
        renderNextButton={()=>(
            <Text style={styles.btnTxt}>Next</Text>
        )}
        renderDoneButton={()=>(
            <Text style={styles.btnTxt } onPress={onPress}>Done</Text>
        )}
        showSkipButton={false}
        dotStyle={styles.dot}
        // bottomButton={true}
        activeDotStyle={styles.activeDot}
        />
        </SafeAreaView>
    )
}
export default Tutorial;

const styles=StyleSheet.create({
    render:{
        alignItems:'center',
        marginTop:20
    },
    slideImg:{
        marginVertical:20,
    },
    container:{
        flex:1,
    },
    txt: {
        fontSize: 20,
        fontWeight: '600',
        marginVertical: 3,
    },
    txt1: {
        fontSize: 14,
        fontWeight: '400',
        color:'grey',
    },
    // btn:{
    //     backgroundColor:'#51a6f5',
    //     width:responsiveWidth(92),
    //     height:responsiveWidth(12),
    //     borderRadius:10,
    //     justifyContent:'center',
    //     alignItems:'center'
    // },
    dot:{
        width:responsiveWidth(2.5),
        height:responsiveWidth(2.5),
        borderRadius:5,
        marginHorizontal:5,
        backgroundColor:'grey'
    },
    activeDot:{
        backgroundColor:'#2467Ec',
        width:responsiveWidth(2.5),
        height:responsiveWidth(2.5),
        borderRadius:5,
        marginHorizontal:5,
    },
    btnTxt:{
        color:'#51a6f5',
        fontSize:20,
        fontWeight:'700',
        marginTop:10
    },
})