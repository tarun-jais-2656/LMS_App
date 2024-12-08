import React, { useRef, useState, useEffect } from "react";
import { SafeAreaView, Dimensions, StyleSheet, View, TouchableOpacity, Image, Text } from "react-native";
import Video from "react-native-video";
import { icon } from "../../assets/icons";
import Slider from '@react-native-community/slider';
import { Header } from "../../components/header";
import { useNavigation, useRoute } from "@react-navigation/native";
import Orientation from 'react-native-orientation-locker';

const { width, height } = Dimensions.get("window");

export default function VideoPlayer() {
  const [clicked, setClicked] = useState(false);
  const [paused, setPaused] = useState(true);
  const [progress, setProgress] = useState({ currentTime: 0, seekableDuration: 0 });
  const [fullScreen, setFullScreen] = useState(false);
  const ref = useRef();
  const navigation = useNavigation();
  const route = useRoute();
  const { course } = route.params;
  console.log(course)

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
    setFullScreen(!fullScreen);
    if (fullScreen) {
      Orientation.lockToPortrait();
    } else {
      Orientation.lockToLandscape();
    }
  };

  // Update progress when video plays
  const handleProgress = e => {
    setProgress({
      currentTime: e.currentTime,
      seekableDuration: e.seekableDuration,
    });
  };

  // Seek video
  // const handleSeek = value => {
  //   ref.current.seek(value);
  // };

  const handleNav = () => {
    navigation.reset({
      index: 0,
      routes: [{ name: 'CoursePlaylist', params: {course } }]
    });
  };

  return (
    <View style={{ flex: 1 }}>
      <Header title="Video Player" onpress={handleNav}/>
      <SafeAreaView style={styles.container}>
        <View style={styles.videoContainer}>
          <TouchableOpacity
            // style={{  height: fullScreen ? '100%' : height / 3 }}
            onPress={() => setClicked(!clicked)}
          >
            <Video
              source={{ uri: course.videoUrl }}
              style={styles.video}
              resizeMode="contain"
              paused={paused}
              ref={ref}
              onProgress={handleProgress}
              onEnd={() => setPaused(true)}
              fullscreen={fullScreen} // Control fullscreen state
              onFullscreenPlayerWillPresent={() => setFullScreen(true)} // Listen for fullscreen event
              onFullscreenPlayerWillDismiss={() => setFullScreen(false)} // Handle fullscreen exit
            />

            {clicked && (
              <View style={styles.overlay}>
                <View style={styles.controlButtons}>
                  <TouchableOpacity onPress={() => ref.current.seek(progress.currentTime - 10)}>
                    <Image source={icon.backward} style={styles.controlIcon} />
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => setPaused(!paused)}>
                    <Image
                      source={paused ? icon.playbutton : icon.pause}
                      style={[styles.controlIcon, { marginLeft: 50 }]}
                    />
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => ref.current.seek(progress.currentTime + 10)}>
                    <Image source={icon.forward} style={[styles.controlIcon, { marginLeft: 50 }]} />
                  </TouchableOpacity>
                </View>

                <View style={styles.sliderContainer}>
                  <Text style={{ color: 'white' }}>{format(progress.currentTime)}</Text>
                  <Slider
                    style={styles.slider}
                    minimumValue={0}
                    maximumValue={progress.seekableDuration || 0}
                    minimumTrackTintColor="#FFFFFF"
                    maximumTrackTintColor="#fff"
                    value={progress.currentTime}
                  // onValueChange={handleSeek}
                  />
                  <Text style={{ color: 'white' }}>{format(progress.seekableDuration)}</Text>
                </View>

                <View style={styles.fullscreenButtonContainer}>
                  <TouchableOpacity onPress={handleFullscreenToggle}>
                    <Image
                      source={fullScreen ? icon.minimize : icon.fullsize}
                      style={styles.fullscreenIcon}
                    />
                  </TouchableOpacity>
                </View>
              </View>
            )}
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </View>
  );
}

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

