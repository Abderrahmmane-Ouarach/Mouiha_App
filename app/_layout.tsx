import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LandingScreen from "./index"; // This is your app/index.tsx
import AppTabs from "./Tabs";
import * as Font from "expo-font";
import { useState, useEffect } from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";

const Stack = createNativeStackNavigator();

export default function RootLayout() {
  const [fontsLoaded, setFontsLoaded] = useState(false);

  useEffect(() => {
    Font.loadAsync({
      "Tajawal-Regular": require("../assets/fonts/Tajawal-Regular.ttf"),
      "Tajawal-Bold": require("../assets/fonts/Tajawal-Bold.ttf"),
      "Tajawal-Medium": require("../assets/fonts/Tajawal-Medium.ttf"),
      "Tajawal-Light": require("../assets/fonts/Tajawal-Light.ttf"),
      "Tajawal-ExtraBold": require("../assets/fonts/Tajawal-ExtraBold.ttf"),
      "Tajawal-ExtraLight": require("../assets/fonts/Tajawal-ExtraLight.ttf"),
      "Tajawal-Black": require("../assets/fonts/Tajawal-Black.ttf"),
    }).then(() => setFontsLoaded(true));
  }, []);

  if (!fontsLoaded) return null;

  return (
    <SafeAreaProvider>
      {/* Gère automatiquement la status bar (Android/iOS) */}
      <StatusBar style="auto" />

      <Stack.Navigator
        initialRouteName="Landing"
        screenOptions={{
          headerShown: false,
          contentStyle: { backgroundColor: "#fff" }, // évite le clignotement noir
        }}
      >
        <Stack.Screen name="Landing" component={LandingScreen} />
        <Stack.Screen name="Main" component={AppTabs} />
      </Stack.Navigator>
    </SafeAreaProvider>
  );
}
