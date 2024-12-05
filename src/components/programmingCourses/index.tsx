import React, { useState, useEffect } from 'react';
import { View, FlatList, Text, Image, StyleSheet, Dimensions, TouchableOpacity, Linking, ActivityIndicator } from 'react-native';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { addCourse } from '../../redux/courseDetail/courseDetailSlice';
import videos from "/Users/ai/Desktop/Projects/LMS/src/jsons/programmingVideo.json"
import { Slider } from '../slider';
import { icon } from '../../assets/icons';
import styles from './styles';


const bannerData1 = [
    {
        bannerImageUrl: icon[77]
    },
    {
        bannerImageUrl: icon[100]
    },
    {
        bannerImageUrl: icon[66]
    },
    {
        bannerImageUrl: icon[44]
    },
    {
        bannerImageUrl: icon[11]
    },
];

const ProgrammingCourses = () => {
    const navigation = useNavigation();
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(true);
    const dispatch = useDispatch();

    const enrichCoursesWithVideos = (coursesData) => {
        return coursesData.map(course => {
            const video = videos.videos.filter(video => video.id == course.id);
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


    useEffect(() => {
        // Dispatch enriched courses to Redux store
        courses.forEach(item => {
            dispatch(addCourse(item));
        });
    }, [courses]);

    const myCourses = useSelector(state => state.course);
    const first = myCourses.slice(0, 10);
    const second = myCourses.slice(10, 20);
    const third = myCourses.slice(20, 30);

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
                <Text style={styles.heading}>Recommended Courses</Text>
                {loading ? (
                    <ActivityIndicator size="small" color="#0000ff" />
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
                <Text style={styles.heading}>Trending Courses</Text>
                {loading ? (
                    <ActivityIndicator size="small" color="#0000ff" />
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
            <Slider bannerData={bannerData1} time={1.25}/>

            <View style={styles.container}>
                <Text style={styles.heading}>Featured Courses</Text>
                {loading ? (
                    <ActivityIndicator size="small" color="#0000ff" />
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
export default ProgrammingCourses;
