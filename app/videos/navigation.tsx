import { createNativeStackNavigator } from '@react-navigation/native-stack';
import VideosHome from './index'
import VideoPlayer from './VideoPlayer'

const Stack = createNativeStackNavigator();

export default function VideosNavigation() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="VideoHome" component={VideosHome} />
      <Stack.Screen name="VideoPlayer" component={VideoPlayer} options={{ title: "Video Player" }} />
    </Stack.Navigator>
  );
}