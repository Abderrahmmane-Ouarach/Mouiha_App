import type { NavigationProp } from "@react-navigation/native";
import { useNavigation } from "@react-navigation/native";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function App() {
  const navigation = useNavigation<NavigationProp<any>>();

  const handleStart = () => {
  navigation.navigate("Main", { screen: "Home" });
};

  return (
    <View style={styles.container}>
      {/* Logo */}
      <Image
        source={require("../assets/images/logoONEE .png")}
        style={styles.logo}
        resizeMode="contain"
      />

      {/* Section centrale */}
      <View style={styles.centerSection}>
        <Text style={styles.welcomeText}>مرحبا بكم في مويهة !</Text>
        <Text style={styles.sloganText}>بالوعي... نحمي نعمة الماء</Text>

        <Image
          source={require("../assets/images/uyu.gif")}
          style={styles.gif}
        />
        <Image  
          source={require("../assets/images/1753462668554.png")}
          style={{ width: 200, height: 200, marginTop: 0, marginBottom: 0}}
          resizeMode="contain"
        />

        <View style={{ height: 10 }} />

        <TouchableOpacity style={styles.button} onPress={handleStart}>
  <Text style={styles.buttonText}>الدخول</Text>
</TouchableOpacity>
      </View>

      {/* Footer */}
      <Text style={styles.footer}>© ONEE - 2025</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f0f8ff",
    alignItems: "center",
    justifyContent: "space-between",
    paddingTop: 50,
    paddingBottom: 20,
  },
  logo: {
    width: 320,
    height: 60,
    marginTop: 10,
  },
  centerSection: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 20,
    marginTop: -10,
  },
  welcomeText: {
    fontSize: 23,
    fontFamily: "Tajawal-ExtraBold",
    color: "#004080",
    textAlign: "center",
    marginBottom: 11,
  },
  sloganText: {
    fontSize: 12,
    marginTop: 2,
    color: "#888",
    fontFamily: "Tajawal-Bold",
  },
  gif: {
    width: 200,
    height: 300,
    marginTop: 20,
    marginBottom: -120,
  },
  button: {
    backgroundColor: "#007acc",
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 25,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontFamily: "Tajawal-Bold",
  },
  footer: {
    fontSize: 14,
    color: "#888",
    marginBottom: 15,
  },
});
