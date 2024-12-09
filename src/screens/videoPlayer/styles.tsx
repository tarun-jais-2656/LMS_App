import { Dimensions, StyleSheet } from "react-native";
const { width, height } = Dimensions.get("window");

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    videoContainer: {
        flex: 1,
    },
    video: {
        width: "100%",
        height: height / 3,
    },
    overlay: {
        height: '100%',
        width: '100%',
        position: 'absolute',
        backgroundColor: 'rgba(0,0,0,0.5)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    controlButtons: {
        flexDirection: 'row',
        justifyContent: 'center',
    },
    controlIcon: {
        width: 30,
        height: 30,
        tintColor: 'white',
    },
    sliderContainer: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        position: 'absolute',
        bottom: 40,
        paddingLeft: 20,
        paddingRight: 20,
        alignItems: 'center',
    },
    slider: {
        width: '80%',
        height: 40,
    },
    fullscreenButtonContainer: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        position: 'absolute',
        top: 10,
        paddingLeft: 20,
        paddingRight: 20,
        alignItems: 'center',
    },
    fullscreenIcon: {
        width: 24,
        height: 24,
        tintColor: 'white',
    },
});

export default styles;

