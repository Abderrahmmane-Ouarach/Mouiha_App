import React from 'react';
import { View, StyleSheet, Image, ScrollView, Dimensions } from 'react-native';
import { Video } from 'expo-av';

const screenWidth = Dimensions.get('window').width;

export default function Videos() {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Image
        source={require('../../assets/images/logoONEE .png')}
        style={styles.logo}
        resizeMode="contain"
      />

       <View style={styles.videoWrapper}>
        <Video
          source={require('../../assets/videoss/Capsules de sensibilisation Mouiha/Capsule 1.mp4')}
          useNativeControls
          shouldPlay={false}
          resizeMode="contain" // show full video, may add black bars
          style={styles.video}
        />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 40,
    paddingBottom: 40,
    alignItems: 'center',
    backgroundColor: '#e6f2ff',
  },
  logo: {
    width: screenWidth * 0.6, // smaller logo
    height: 40,
    marginBottom: 20,
  },
   videoWrapper: {
    width: 300,
    height: 169, // 16:9 aspect ratio for most videos
    backgroundColor: '#000',
    borderRadius: 10,
    overflow: 'hidden',
    marginBottom: 30,
    alignSelf: 'center',
  },
  video: {
    width: '100%',
    height: '100%',
  },
});
