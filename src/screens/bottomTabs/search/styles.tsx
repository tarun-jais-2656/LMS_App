import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 16,
        marginHorizontal: 16,
    },
    searchInput: {
        height: 40,
        color:'#000000',
        borderColor: '#ccc',
        borderWidth: 1,
        marginBottom: 20,
        paddingLeft: 10,
        borderRadius: 8,
        backgroundColor:'#fff'
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

export default styles;
