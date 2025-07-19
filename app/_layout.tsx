import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LandingScreen from "./index"; // This is your app/index.tsx
import AppTabs from "./Tabs";
import Videos from "./videos";
import VideoPlayer from "./videos/VideoPlayer";
import * as Font from 'expo-font';
import { useState, useEffect } from 'react';

const Stack = createNativeStackNavigator();

export default function RootLayout() {
  const [fontsLoaded, setFontsLoaded] = useState(false);

  useEffect(() => {
    Font.loadAsync({
      'Tajawal-Regular': require('../assets/fonts/Tajawal-Regular.ttf'),
      'Tajawal-Bold': require('../assets/fonts/Tajawal-Bold.ttf'),
      'Tajawal-Medium': require('../assets/fonts/Tajawal-Medium.ttf'),
      'Tajawal-Light': require('../assets/fonts/Tajawal-Light.ttf'),
      'Tajawal-ExtraBold': require('../assets/fonts/Tajawal-ExtraBold.ttf'),
      'Tajawal-ExtraLight': require('../assets/fonts/Tajawal-ExtraLight.ttf'),
      'Tajawal-Black': require('../assets/fonts/Tajawal-Black.ttf'),
    }).then(() => setFontsLoaded(true));
  }, []);

  if (!fontsLoaded) return null;
  
  
  return (
    <Stack.Navigator
      initialRouteName="Landing"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="Landing" component={LandingScreen} />
      <Stack.Screen name="Main" component={AppTabs} />
      <Stack.Screen name="Videos" component={Videos} />
      <Stack.Screen
        name="VideoPlayer"
        component={VideoPlayer}
        options={{ title: "Video Player" }}
      />
    </Stack.Navigator>
  );
}
