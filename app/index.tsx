import { useEffect, useRef } from "react";
import { View, Text, StyleSheet, Image, Animated } from "react-native";
import { useNavigation } from "@react-navigation/native";
import type { StackNavigationProp } from "@react-navigation/stack";
import * as SplashScreen from 'expo-splash-screen';

export default function Intro() {
  const navigation = useNavigation<StackNavigationProp<any>>();
  const dot1 = useRef(new Animated.Value(0)).current;
  const dot2 = useRef(new Animated.Value(0)).current;
  const dot3 = useRef(new Animated.Value(0)).current;
  const dot4 = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Empêche Expo de cacher son splash automatiquement
    SplashScreen.preventAutoHideAsync();

    // Animation des points flottants
    const animateDots = () => {
      Animated.sequence([
        Animated.timing(dot1, { toValue: 1, duration: 250, useNativeDriver: true }),
        Animated.timing(dot2, { toValue: 1, duration: 250, useNativeDriver: true }),
        Animated.timing(dot3, { toValue: 1, duration: 250, useNativeDriver: true }),
        Animated.timing(dot4, { toValue: 1, duration: 250, useNativeDriver: true }),
        Animated.timing(dot1, { toValue: 0, duration: 250, useNativeDriver: true }),
        Animated.timing(dot2, { toValue: 0, duration: 250, useNativeDriver: true }),
        Animated.timing(dot3, { toValue: 0, duration: 250, useNativeDriver: true }),
        Animated.timing(dot4, { toValue: 0, duration: 250, useNativeDriver: true }),
      ]).start(() => animateDots());
    };

    animateDots();

    const timer = setTimeout(async () => {
      await SplashScreen.hideAsync(); // cache le splash Expo
      navigation.replace("Main", { screen: "Home" });
    }, 2500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <View style={styles.container}>
      {/* Logo principal */}
      <Image 
        source={require("../assets/images/logoo.png")} 
        style={styles.logo} 
      />

      {/* Points flottants en dessous */}
      <View style={styles.dotsContainer}>
        <Animated.Text style={[styles.dot, { opacity: dot1 }]}>●</Animated.Text>
        <Animated.Text style={[styles.dot, { opacity: dot2 }]}>●</Animated.Text>
        <Animated.Text style={[styles.dot, { opacity: dot3 }]}>●</Animated.Text>
        <Animated.Text style={[styles.dot, { opacity: dot4 }]}>●</Animated.Text>
      </View>
    </View>
  );
}


const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    alignItems: "center", 
    justifyContent: "center", 
    backgroundColor: "#f0f8ff" 
  },
  logo: { 
    width: 300, 
    height: 500, 
    marginBottom: 20, 
    resizeMode: "contain" 
  },
  dotsContainer: {
    flexDirection: 'row',
    marginTop: 20,
    alignItems: 'center',
  },
  dot: {
    fontSize: 14,
    color: "#4a90e2",
    marginHorizontal: 4,
  },
  subtitle: { 
    fontSize: 14, 
    fontFamily: "Tajawal-Bold", 
    color: "#666" 
  },
});