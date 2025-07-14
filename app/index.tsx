import { Link } from "expo-router";
import { Alert, Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";


export default function App() {
  console.log("hi");
  
  const handleStart = () => {
  Alert.alert("Bienvenue !", "Navigation vers la suite prévue ici.");
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
  <Text style={styles.welcomeText}>
    Bienvenue à Mouiha!
  </Text>
  <Text style={styles.solganText}>
    Préservons l’eau, protégeons la vie
  </Text>

  <Image
        source={require('../assets/images/uyu.gif')}
        style={styles.gif}
      />

  {/* Espacement ajouté ici pour faire remonter le bouton */}
  <View style={{ height: 10}} />

  {/* <TouchableOpacity style={styles.button} onPress={handleStart}>
  
  <Text style={styles.buttonText}>➔	  Commencer</Text>
</TouchableOpacity> */}
<Link href="/home" asChild>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>➔    Commencer</Text>
        </TouchableOpacity>
      </Link>

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
    width: 320, height: 60, marginTop: 10 
  },
  centerSection: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 20,
  },
  welcomeText: {
    fontSize: 23,
    fontWeight: "600",
    color: "#004080",
    textAlign: "center",
    marginBottom: 11,
    fontFamily: "Inter-SemiBold"
  },
  solganText:{
fontSize: 12,
marginTop:2,
color: "#888",
  }, 
  gif: {
    width: 200,
    height: 300,
  },
  button: {
  backgroundColor: "#007acc",
  paddingVertical: 12,
  paddingHorizontal: 25,
  borderRadius: 25,
  flexDirection: "row", // ← important
  alignItems: "center",
  justifyContent: "center",
  gap: 10, // ou marginRight dans l'icône si React Native < 0.71
},
buttonIcon: {
  width: 16,
  height: 16,
  marginRight: 8,
  tintColor: "#fff", 
},
buttonText: {
  color: "#fff",
  fontSize: 16,
  fontWeight: "600",
},

  footer: {
    fontSize: 14,
    color: "#888",
  },
});
