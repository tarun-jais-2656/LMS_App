import { useNavigation } from '@react-navigation/native';
import React, { useState, useEffect } from 'react';
import { View, FlatList, Text, TextInput, StyleSheet, SafeAreaView, TouchableOpacity, Image } from 'react-native';
import { useSelector } from 'react-redux';
import styles from './styles';

export function Search() {
    const navigation = useNavigation();
    const [query, setQuery] = useState('');
    const [selectedCategory, setSelectedCategory] = useState(null);
    const allCourses = useSelector(state => state.course);
    const [filteredCourses, setFilteredCourses] = useState([]);
    const tag = ['Programming', 'FrontEnd', 'BackEnd', 'LatestTech', 'CoreSkills', 'Development']
    const handleNav = (course) => {
        navigation.navigate('CourseDetail', { course });
    };

    useEffect(() => {
        let filtered = [];
        if (selectedCategory) {
            if (selectedCategory === 'allCourses') {
                filtered = allCourses;
            } else {
                filtered = allCourses.filter(course => course.cat.toLowerCase() === selectedCategory.toLowerCase());
            }
        }
        if (query !== '') {
            filtered = filtered.filter(course =>
                course.title.toLowerCase().includes(query.toLowerCase())
            );
        }
        if (query === '' && selectedCategory === null) {
            filtered = [];
        }
        if (query !== '' && selectedCategory === null) {
            filtered = allCourses.filter(course =>
                course.title.toLowerCase().includes(query.toLowerCase())
            );
        }
        setFilteredCourses(filtered);
    }, [query, selectedCategory, allCourses]);

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
                placeholderTextColor={"#ccc"}
                value={query}
                onChangeText={setQuery}
            />
            <View style={styles.categoryContainer}>
                <TouchableOpacity
                    style={[
                        styles.categoryButton,
                        selectedCategory === 'allCourses' && styles.selectedCategory
                    ]}
                    onPress={() => setSelectedCategory('allCourses')}
                >
                    <Text style={styles.categoryText}>All Courses</Text>
                </TouchableOpacity>
                {tag.map(category => (
                    <TouchableOpacity
                        key={category}
                        style={[
                            styles.categoryButton,
                            selectedCategory === category && styles.selectedCategory
                        ]}
                        onPress={() => setSelectedCategory(selectedCategory === category ? null : category)}
                    >
                        <Text style={styles.categoryText}>{category}</Text>
                    </TouchableOpacity>
                ))}
            </View>
            <FlatList
                data={filteredCourses}
                renderItem={renderCourse}
                showsVerticalScrollIndicator={false}
                keyExtractor={(item) => item.id.toString()}
            />
        </SafeAreaView>
    );
}

