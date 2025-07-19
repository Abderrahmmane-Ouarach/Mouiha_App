import React from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import { WebView } from 'react-native-webview';
import { RouteProp, useRoute } from '@react-navigation/native';

type VideoItem = {
  id: string;
  title: string;
  url: string;
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
      <WebView
        source={{ uri: video.url }}
        style={styles.video}
        javaScriptEnabled
        domStorageEnabled
        allowsFullscreenVideo
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    justifyContent: 'center',
  },
  video: {
    width: screenWidth,
    height: 220,
  },
});
