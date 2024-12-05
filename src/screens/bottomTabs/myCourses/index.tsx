import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useEffect } from "react";
import { FlatList, Text, View, StyleSheet, SafeAreaView, Alert, TouchableOpacity, Image, Dimensions } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import {useNavigation } from "@react-navigation/native";
import styles from "./styles";

export function MyCourses() {
  const navigation = useNavigation();
  const paidCourses = useSelector(state => state.paidCourses);

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
        </View>
      </TouchableOpacity>
    )
  };

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={paidCourses}
        renderItem={renderCourse}
        showsVerticalScrollIndicator={false}
        keyExtractor={(item) => item.id.toString()}
      />
    </SafeAreaView>
  );
}

