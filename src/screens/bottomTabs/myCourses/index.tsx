import React from "react";
import { FlatList, Text, View, StyleSheet, SafeAreaView } from "react-native";
import { useSelector } from "react-redux";

export function MyCourses() {
  const paidCourses = useSelector(state => state.paidCourses); // Get paid courses from Redux

  const renderCourse = ({ item }) => (
    <View style={styles.card}>
      <Text style={styles.title}>{item.title}</Text>
      <Text style={styles.name}>{item.visible_instructors[0].title}</Text>
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
