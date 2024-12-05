import { useNavigation } from '@react-navigation/native';
import React, { useState, useEffect } from 'react';
import { View, FlatList, Text, TextInput, StyleSheet, SafeAreaView, TouchableOpacity, Image } from 'react-native';
import { useSelector } from 'react-redux';

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
                keyExtractor={(item) => item.id.toString()}
            />

        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        marginHorizontal: 16,
    },
    searchInput: {
        height: 40,
        borderColor: '#ccc',
        borderWidth: 1,
        marginBottom: 20,
        paddingLeft: 10,
        borderRadius: 8,
    },
    categoryContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginBottom: 20,
    },
    categoryButton: {
        backgroundColor: 'lightgrey',
        borderRadius: 20,
        paddingVertical: 6,
        paddingHorizontal: 12,
        marginRight: 10,
        marginBottom: 10,
    },
    selectedCategory: {
        backgroundColor: '#007BFF',
    },
    categoryText: {
        fontSize: 14,
        color: '#333',
    },
    card: {
        backgroundColor: 'white',
        borderRadius: 8,
        marginBottom: 10,
        height: 350,
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
    noCoursesText: {
        fontSize: 16,
        textAlign: 'center',
        color: 'gray',
    },
});
