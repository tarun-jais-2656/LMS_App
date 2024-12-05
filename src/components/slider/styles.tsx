import { StyleSheet } from "react-native";

const styles=StyleSheet.create({
    container: {
        marginTop: 12,
        height: 250,
        marginHorizontal: 16,
        resizeMode:'contain'
    },
    img:{ width: "auto", height: 200 },
    slide: { flex: 1 },
    dot: {
        backgroundColor: "#C6C7CC",
        width: 10,
        height: 10,
        borderRadius: 5,
        marginHorizontal: 3,
    },

    activeDot: {
        backgroundColor: "#2467EC",
        width: 10,
        height: 10,
        borderRadius: 5,
        marginHorizontal: 3,
    },
})
export default styles;