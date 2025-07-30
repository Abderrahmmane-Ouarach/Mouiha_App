import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function Quiz() {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image
          source={require("../../assets/images/1753462668554.png")}
          style={{ width: 150, height: 150, marginTop: 0, marginBottom: 0 }}
          resizeMode="contain"
        />
      </View>
      <View style={styles.levelContainer}>
        <Text style={styles.levelTitle}>Choose Your Quiz Level</Text>
        <Text style={styles.levelSubtitle}>
          Select the age group that best fits your knowledge about water
          conservation
        </Text>
        <View style={styles.levelButtonsContainer}>
          <TouchableOpacity style={styles.levelButton}>
            <Text style={styles.levelButtonText}>6 - 9</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.levelButton}>
            <Text style={styles.levelButtonText}>10 - 14</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.levelButton}>
            <Text style={styles.levelButtonText}>All people</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#e6f2ff", // Softer blue background
    alignItems: "center",
    paddingTop: 50,
    paddingBottom: 20,
  },
  header: {
    width: "100%",
    height: 60,
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
    marginBottom: 20,
  },
  logo: {
    width: 280,
    height: 45,
    alignSelf: "center",
  },
  iconButton: {
    position: "absolute",
    right: 5,
    top: 5,
    padding: 8,
  },
  icon: {
    fontSize: 28,
    color: "#007acc",
  },
  placeholder: {
    marginBottom: 15,
  },
  levelContainer: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 20,
    marginVertical: 20,
    marginHorizontal: 16,
    shadowColor: "#007acc",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 2,
    alignItems: "center",
    justifyContent: "center",
  },
  levelTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#007acc",
    marginBottom: 8,
    textAlign: "center",
  },
  levelSubtitle: {
    fontSize: 14,
    color: "#555",
    marginBottom: 18,
    textAlign: "center",
  },
  levelButtonsContainer: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    gap: 10,
  },
  levelButton: {
    backgroundColor: "#007acc",
    paddingVertical: 10,
    paddingHorizontal: 18,
    borderRadius: 20,
    marginVertical: 6,
    width: 140,
    alignItems: "center",
  },
  levelButtonText: {
    color: "#fff",
    fontSize: 15,
    fontWeight: "600",
  },
});
