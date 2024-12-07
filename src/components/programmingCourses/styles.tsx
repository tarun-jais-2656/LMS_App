import { Dimensions, StyleSheet } from "react-native";

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    heading: {
        fontSize: 20,
        fontWeight: '700',
        marginLeft: 16,
        marginTop: 10,
        // marginBottom: 10
    },
    card: {
        backgroundColor: 'white',
        borderRadius: 8,
        marginHorizontal: 8,
        width: width * 0.8,
        // aspectRatio: 1,
        height: 335,
        padding: 10,
        elevation: 5, // Shadow for Android
        shadowColor: '#000', // Shadow for iOS
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
        marginVertical: 20
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
export default styles;