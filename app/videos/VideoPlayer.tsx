import { RouteProp, useRoute } from '@react-navigation/native';
import { ResizeMode, Video } from "expo-av";
import { useState } from 'react';
import { ActivityIndicator, Dimensions, StyleSheet, View } from 'react-native';
import { WebView } from 'react-native-webview';

type VideoItem = {
  id: string;
  youtubeId?: string;   
  localUri?: string;   
  title: string;
};

type RouteParams = {
  video: VideoItem;
};

const screenWidth = Dimensions.get('window').width;

export default function VideoPlayer(): React.JSX.Element {
  const route = useRoute<RouteProp<{ params: RouteParams }, 'params'>>();
  const { video } = route.params;
  const [isReady, setIsReady] = useState(false);

  return (
    <View style={styles.container}>
      {video.localUri ? (
        <>
          <Video
  source={typeof video.localUri === "number" ? video.localUri : { uri: video.localUri }}
  style={styles.video}
  useNativeControls
  resizeMode={ResizeMode.CONTAIN}
  shouldPlay
  onLoad={() => setIsReady(true)}
/>

          {!isReady && <ActivityIndicator size="large" color="#fff" />}
        </>
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