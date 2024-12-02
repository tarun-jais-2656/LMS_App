import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useEffect } from "react";
import { FlatList, Text, View, StyleSheet, SafeAreaView, Alert, TouchableOpacity, Image, Dimensions } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import firestore from '@react-native-firebase/firestore';
import { addToPaidCourses } from "../../../redux/paidCourses/paidCoursesSlice";
import { useNavigation } from "@react-navigation/native";

const { width } = Dimensions.get('window');
export function MyCourses() {
  const navigation = useNavigation();
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

  const handleNav = (course) => {
    navigation.navigate('CoursePlaylist', { course });
  };



  const renderCourse = ({ item }) => {
    return (
      <TouchableOpacity  onPress={() => handleNav(item)}>
        <View style={styles.card}>
          <View style={styles.imgRemove}>
            <Image source={{ uri: item.image_480x270 }} style={styles.image} />
            <TouchableOpacity style={styles.removeBtn}>
              <Text style={styles.txt}>Enrolled</Text>
            </TouchableOpacity>
          </View>
          <Text style={styles.title}>{item.title}</Text>
          <Text style={styles.name}>{item.visible_instructors}</Text>
        </View>
      </TouchableOpacity>
    )
  };


  return (
    <SafeAreaView style={{ flex: 1, marginHorizontal: 16 }}>
      <FlatList
        data={paidCourses}
        renderItem={renderCourse}
        showsVerticalScrollIndicator={false}
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
  imgRemove: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  removeBtn: {
    backgroundColor: "#9dcf82",
    justifyContent: 'center',
    marginVertical: 30,
    paddingHorizontal: 10,
    borderRadius: 10,
  },
  txt: {
    fontSize: 14,
    fontWeight: '700',
    color: '#FFFFFF'
  },
  image: {
    height: 100,
    width: width / 2,
    borderRadius: 8,
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
  colorTxt1: {
    fontWeight: '700',
  }
});
