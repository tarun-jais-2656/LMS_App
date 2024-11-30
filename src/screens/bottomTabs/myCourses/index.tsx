import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useEffect } from "react";
import { FlatList, Text, View, StyleSheet, SafeAreaView, Alert } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import firestore from '@react-native-firebase/firestore';
import { addToPaidCourses } from "../../../redux/paidCourses/paidCoursesSlice";


export function MyCourses() {
  const dispatch = useDispatch();
  const paidCourses = useSelector(state => state.paidCourses); // Get paid courses from Redux
  console.log("===purchased========>", paidCourses)

  const fetchPaidCourses = async () => {
    try {
      const userUID = await AsyncStorage.getItem('userUID');

      const paidSnapshot = await firestore()
        .collection('users')
        .doc(userUID)
        .collection('paidCourses')
        .get();

      const paidItems = paidSnapshot.docs.map(doc => doc.data());

      paidItems.forEach(item => {
        const alreadyInPaidCourse = paidCourses.some(course => course.id === item.id);
        if (!alreadyInPaidCourse) {
          dispatch(addToPaidCourses(item));
        }
      });
    } catch (error) {
      console.error('Error fetching paidCourse data:', error);
      Alert.alert('Error loading paidCourse data');
    }
  };


  useEffect(() => {
    fetchPaidCourses();
  }, []);



  const renderCourse = ({ item }) => (
    <View style={styles.card}>
      <Text style={styles.title}>{item.title}</Text>
      {/* <Text style={styles.name}>{item.visible_instructors}</Text> */}
      <Text style={styles.hours}>Price:  <Text style={styles.colorTxt1}>${item.price}</Text></Text>
    </View>
  );

  return (
    <SafeAreaView style={{ flex: 1, marginHorizontal: 16 }}>
      <FlatList
        data={paidCourses}
        renderItem={renderCourse}
        keyExtractor={(item) => item.id.toString()}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 10,
    marginBottom: 10,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 10,
  },
  name: {
    fontSize: 14,
    color: 'gray',
    marginVertical: 5,
  },
  hours: {
    fontSize: 16,
    marginBottom: 10,
  },
  colorTxt1: {
    fontWeight: '700',
  }
});
