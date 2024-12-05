import React, { useState, useEffect } from 'react';
import { View, FlatList, Text, Image, StyleSheet, Dimensions, TouchableOpacity, Linking } from 'react-native';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { addCourse } from '../../redux/courseDetail/courseDetailSlice';
import videos from "/Users/ai/Desktop/Projects/LMS/src/jsons/programmingVideo.json"

const { width } = Dimensions.get('window');

const ProgrammingCourses = () => {
    const navigation = useNavigation();
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(true);
    const dispatch = useDispatch();

    // api response updation course data with video URL and price
    const enrichCoursesWithVideos = (coursesData) => {
        // console.log(coursesData)
        return coursesData.map(course => {
            const video = videos.videos.filter(video => video.id == course.id);
            // console.log(video)
            return {
                ...course,
                videoUrl: video ? video[0].url : null,
                price: video ? video[0].price : null,
                cat: video ? video[0].cat : null,
            };
        });
    };

    const handleNav = (course) => {
        navigation.navigate('CourseDetail', { course });
    };

    useEffect(() => {
        const fetchCourses = async () => {
            try {
                const response = await axios.get(
                    'https://www.udemy.com/api-2.0/discovery-units/all_courses/?page_size=60&subcategory=&instructional_level=&lang=&price=&duration=&closed_captions=&subs_filter_type=&subcategory_id=8&source_page=subcategory_page&locale=en_US&navigation_locale=en&skip_price=true&sos=ps&fl=scat'
                );

                // Enrich the API response with video data
                console.log(response);
                const enrichedCourses = enrichCoursesWithVideos(response.data.unit.items);
                setCourses(enrichedCourses);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching courses:', error);
                setLoading(false);
            }
        };

        fetchCourses();
    }, []);

    // console.log(courses)

    useEffect(() => {
        // Dispatch enriched courses to Redux store
        courses.forEach(item => {
            dispatch(addCourse(item));
        });
    }, [courses]);

    const myCourses = useSelector(state => state.course);
    const first= myCourses.slice(0, 10);
    const second = myCourses.slice(10,20);
    const third=myCourses.slice(20,30);
    console.log(first)
    console.log(second)
    console.log(third)

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
        <View>
            <View style={styles.container}>
                {loading ? (
                    <Text>Loading...</Text>
                ) : (
                    <FlatList
                        data={first}
                        renderItem={renderCourse}
                        keyExtractor={(item) => item.id.toString()}
                        horizontal
                        showsHorizontalScrollIndicator={false}
                    />
                )}
            </View>

            <View style={styles.container}>
                {loading ? (
                    <Text>Loading...</Text>
                ) : (
                    <FlatList
                        data={second}
                        renderItem={renderCourse}
                        keyExtractor={(item) => item.id.toString()}
                        horizontal
                        showsHorizontalScrollIndicator={false}
                    />
                )}
            </View>

            <View style={styles.container}>
                {loading ? (
                    <Text>Loading...</Text>
                ) : (
                    <FlatList
                        data={third}
                        renderItem={renderCourse}
                        keyExtractor={(item) => item.id.toString()}
                        horizontal
                        showsHorizontalScrollIndicator={false}
                    />
                )}
            </View>
        </View>

    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    card: {
        backgroundColor: 'white',
        borderRadius: 8,
        marginRight: 16,
        width: width * 0.8,
        // aspectRatio: 1,
        height: 350,
        padding: 10,
        elevation: 5, // Shadow for Android
        shadowColor: '#000', // Shadow for iOS
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
        marginVertical:20
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
    videoContainer: {
        marginTop: 10,
    },
    videoPrice: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#000',
    },
    videoLink: {
        fontSize: 12,
        color: 'blue',
    },
    link: {
        textDecorationLine: 'underline',
    }
});

export default ProgrammingCourses;
