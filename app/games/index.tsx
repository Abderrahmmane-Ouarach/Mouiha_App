import { useNavigation } from "@react-navigation/native";
import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Animated
} from "react-native";
import { useRef } from "react";

const games = [
  { title: "ذاكرة الماء", path: "FlipMacher", image: require("../../assets/images/mouiha.png") },
  { title: "التلوين", path: "FlipMacher", image: require("../../assets/images/mouiha.png") },
  { title: "احفظ القطرة", path: "SaveTheDrop", image: require("../../assets/images/mouiha.png") },
];

export default function Games() {
  const navigation = useNavigation();

  // Create an array of refs for animations
  const scaleAnims = useRef(games.map(() => new Animated.Value(1))).current;

  const handlePress = (path: string) => {
    navigation.navigate(path as never);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}> ألعاب التوعية بالماء</Text>

      <View style={styles.gamesGrid}>
        {games.map((game, index) => {
          const onPressIn = () => {
            Animated.spring(scaleAnims[index], {
              toValue: 0.95,
              useNativeDriver: true,
            }).start();
          };

          const onPressOut = () => {
            Animated.spring(scaleAnims[index], {
              toValue: 1,
              friction: 3,
              useNativeDriver: true,
            }).start(() => handlePress(game.path));
          };

          return (
            <Animated.View
              key={game.title}
              style={[styles.gameCard, { transform: [{ scale: scaleAnims[index] }] }]}
            >
              <TouchableOpacity
                activeOpacity={0.8}
                onPressIn={onPressIn}
                onPressOut={onPressOut}
                style={{ alignItems: "center", width: "100%" }}
              >
                <Image source={game.image} style={styles.gameImage} />
                <Text style={styles.gameCardText}>{game.title}</Text>
              </TouchableOpacity>
            </Animated.View>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#e6f2ff",
    alignItems: "center",
    paddingTop: 40,
    paddingBottom: 20,
  },
  header: {
    fontSize: 22,
    fontFamily: "Tajawal-Bold",
    color: "#007acc",
    marginBottom: 15,
    textAlign: "center",
  },
  gamesGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    marginTop: 10,
    gap: 14,
  },
  gameCard: {
    backgroundColor: "#fff",
    borderRadius: 20,
    padding: 14,
    margin: 6,
    alignItems: "center",
    width: 150,
    shadowColor: "#007acc",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 3,
    borderWidth: 2,
    borderColor: "#cce6ff",
  },
  gameImage: {
    width: 80,
    height: 80,
    borderRadius: 16,
    marginBottom: 10,
    resizeMode: "contain",
    backgroundColor: "#f0f8ff",
    padding: 10,
  },
  gameCardText: {
    fontSize: 16,
    color: "#007acc",
    textAlign: "center",
    fontFamily: "Tajawal-Bold",
  },
});
