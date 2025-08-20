import React from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import { WebView } from 'react-native-webview';
import { Video } from "expo-av";
import { RouteProp, useRoute } from '@react-navigation/native';

type VideoItem = {
  id: string;
  youtubeId?: string;   // optionnel
  localUri?: string;    // string pour les vidéos locales
  title: string;
};

type RouteParams = {
  video: VideoItem;
};

const screenWidth = Dimensions.get('window').width;

export default function VideoPlayer(): React.JSX.Element {
  const route = useRoute<RouteProp<{ params: RouteParams }, 'params'>>();
  const { video } = route.params;

  return (
    <View style={styles.container}>
      {video.localUri ? (
        <Video
          source={{ uri: video.localUri }}
          style={styles.video}
          useNativeControls
          
          shouldPlay
        />
      ) : video.youtubeId ? (
        <WebView
          style={styles.video}
          javaScriptEnabled
          source={{ uri: `https://www.youtube.com/embed/${video.youtubeId}` }}
        />
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    justifyContent: 'center',
    marginTop: 30,
  },
  video: {
    width: screenWidth,
    height: 220,
  },
});