import React, { useRef, useState, useEffect } from "react";
import { SafeAreaView, Dimensions, StyleSheet, View, TouchableOpacity, Image, Text } from "react-native";
import Video from "react-native-video";
import { icon } from "../../assets/icons";
import Slider from '@react-native-community/slider';
import Orientation from 'react-native-orientation-locker';
import { Header } from "../../components/header";
import { useNavigation } from "@react-navigation/native";

const { width, height } = Dimensions.get("window"); // Get screen dimensions

export default function VideoPlayer() {
  const [clicked, setClicked] = useState(false);
  const [paused, setPaused] = useState(true); 
  const [progress, setProgress] = useState({ currentTime: 0, seekableDuration: 0 });
  const [fullScreen, setFullScreen] = useState(false);
  const ref = useRef();

  // Format the time to MM:SS
  const format = seconds => {
    let mins = parseInt(seconds / 60)
      .toString()
      .padStart(2, '0');
    let secs = (Math.trunc(seconds) % 60).toString().padStart(2, '0');
    return `${mins}:${secs}`;
  };

  // Handle fullscreen toggle
  const handleFullscreenToggle = () => {
    if (fullScreen) {
      Orientation.lockToPortrait();
    } else {
      Orientation.lockToLandscape();
    }
    setFullScreen(!fullScreen);
  };

  // Update progress when video plays
  const handleProgress = e => {
    setProgress({
      currentTime: e.currentTime,
      seekableDuration: e.seekableDuration,
    });
  };

  // Seek video
//   const handleSeek = value => {
//     ref.current.seek(value);
//   };
const navigation=useNavigation();
const handleNav = () => {
  navigation.reset({
      index: 0,
      routes: [{ name: 'CoursePlaylist', params: { screen: 'course' } }]
  });

};


  return (
    <View>
      <Header title={"VideoPlayer"}/>
    <View style={styles.container}>
      <TouchableOpacity
        style={{ width: width, height: fullScreen ? '100%' : height / 3 }}
        onPress={() => setClicked(!clicked)}
      >
        <Video
          source={{ uri: 'https://sample-videos.com/video321/mp4/720/big_buck_bunny_720p_30mb.mp4' }}
          style={styles.video}
          resizeMode="contain"
          paused={paused}
          ref={ref}
          onProgress={handleProgress}
          onEnd={() => setPaused(true)}
        />

        {clicked && (
          <TouchableOpacity style={styles.overlay}>
            <View style={styles.controlButtons}>
              <TouchableOpacity
                onPress={() => ref.current.seek(progress.currentTime - 10)}
              >
                <Image
                  source={icon.backward}
                  style={styles.controlIcon}
                />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => setPaused(!paused)}
              >
                <Image
                  source={paused ? icon.playbutton : icon.pause}
                  style={[styles.controlIcon, { marginLeft: 50 }]}
                />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => ref.current.seek(progress.currentTime + 10)}
              >
                <Image
                  source={icon.forward}
                  style={[styles.controlIcon, { marginLeft: 50 }]}
                />
              </TouchableOpacity>
            </View>

            <View style={styles.sliderContainer}>
              <Text style={{ color: 'white' }}>
                {format(progress.currentTime)}
              </Text>
              <Slider
                style={styles.slider}
                minimumValue={0}
                maximumValue={progress.seekableDuration || 0}
                minimumTrackTintColor="#FFFFFF"
                maximumTrackTintColor="#fff"
                value={progress.currentTime}
                // onValueChange={handleSeek}
              />
              <Text style={{ color: 'white' }}>
                {format(progress.seekableDuration)}
              </Text>
            </View>

            <View style={styles.fullscreenButtonContainer}>
              <TouchableOpacity onPress={handleFullscreenToggle}>
                <Image
                  source={fullScreen ? icon.minimize : icon.fullsize}
                  style={styles.fullscreenIcon}
                />
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
        )}
      </TouchableOpacity>
    </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  video: {
    width: width,
    height: height / 3,
  },
  overlay: {
    height: height / 3.82,
    width: width,
    marginTop: 33,
    position: 'absolute',
    backgroundColor: 'rgba(0,0,0,0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  controlButtons: {
    flexDirection: 'row',
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
    bottom: 0,
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
