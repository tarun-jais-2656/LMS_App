import React from "react";
import { SafeAreaView, Dimensions, StyleSheet, View } from "react-native";
import Video from "react-native-video";

const { width, height } = Dimensions.get("window"); // Get screen dimensions

export default function Player() {
    return (
        <SafeAreaView style={styles.container}>
            <Video
                // source={{ uri: 'https://sample-videos.com/video321/mp4/720/big_buck_bunny_720p_30mb.mp4' }}
                style={styles.video}
                resizeMode="contain"
            />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1, // Ensure SafeAreaView takes up the full screen
        
    },
    video: {
        width: width, // Use full screen width
        height: height/3, // You can adjust this depending on the aspect ratio or desired height
    },
});
