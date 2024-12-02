import { useNavigation } from '@react-navigation/native';
import React, { useState, useEffect } from 'react';
import { View, FlatList, Text, TextInput, StyleSheet, SafeAreaView, TouchableOpacity, Image } from 'react-native';
import { useSelector } from 'react-redux';

export function Search() {
    const navigation=useNavigation();
    const [query, setQuery] = useState('');
    const allCourses = useSelector(state => state.course);
    const [filteredCourses, setFilteredCourses] = useState(allCourses);

    const handleNav = (course) => {
        navigation.navigate('CourseDetail', { course }); 
    };

   
    useEffect(() => {
        setFilteredCourses(
            allCourses.filter(course => 
                course.title.toLowerCase().includes(query.toLowerCase())
            )
        );
    }, [query, allCourses]);

    const renderCourse = ({ item }) => (
        <TouchableOpacity onPress={() => handleNav(item)}>
            <View style={styles.card}>
                <Image source={{ uri: item.image_480x270 }} style={styles.image} />
                <Text style={styles.title}>{item.title}</Text>
                <Text style={styles.name}>{item.visible_instructors[0].title}</Text>
                <Text style={styles.rating}>Rating: {item.avg_rating}</Text>
                <Text style={styles.rating}>Hours: {item.content_info_short}</Text>
                <Text style={styles.rating}>Price: {item.price}</Text>
            </View>
        </TouchableOpacity>
    );

    return (
        <SafeAreaView style={styles.container}>
            <TextInput
                style={styles.searchInput}
                placeholder="Search by course title"
                value={query}
                onChangeText={setQuery}
            />
            <FlatList
                data={filteredCourses}
                renderItem={renderCourse}
                keyExtractor={(item) => item.id.toString()}
            />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        marginHorizontal:16
    },
    searchInput: {
        height: 40,
        borderColor: '#ccc',
        borderWidth: 1,
        marginBottom: 20,
        paddingLeft: 10,
        borderRadius: 8,
    },
    card: {
        backgroundColor: 'white',
        borderRadius: 8,
        // marginRight: 16,
        marginBottom:10,
        height:350,
        padding: 10,
        elevation: 5, // Shadow for Android
        shadowColor: '#000', // Shadow for iOS
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
    },
    image: {
        width: '100%',
        height: 180,
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
        marginTop: 5,
    },
    rating: {
        fontSize: 12,
        marginTop: 5,
        fontWeight: 'bold',
    },
});

