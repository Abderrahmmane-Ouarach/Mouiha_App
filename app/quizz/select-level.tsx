import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useEffect, useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  Pressable,
  Animated,
  Easing,
} from "react-native";
import type { QuizStackParamList } from "./types";
import { useLevels } from "../../lib/useLevels"; // adapte le chemin

type NavigationProp = NativeStackNavigationProp<QuizStackParamList, "SelectLevel">;

export default function SelectLevel() {
  const navigation = useNavigation<NavigationProp>();
  const { levels, loading } = useLevels();
  const [unlockedLevels, setUnlockedLevels] = useState<string[]>(["niveau1"]);

  useEffect(() => {
    (async () => {
      try {
        const saved = await AsyncStorage.getItem("unlockedLevels");
        if (saved) {
          setUnlockedLevels(JSON.parse(saved));
        }
      } catch (e) {
        console.error("Erreur lecture niveaux débloqués", e);
      }
    })();
  }, []);

  const onSelectLevel = (level: string) => {
    if (!unlockedLevels.includes(level)) return;
    navigation.navigate("Play", { level });
  };

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text style={{fontFamily:"Tajawal-Medium"}}>جاري تحميل المستويات...</Text>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>اختر المستوى</Text>
      {levels.map((level) => {
        const isUnlocked = unlockedLevels.includes(level);
        const arabicLabel = `المستوى ${level.replace("niveau", "")}`;
        return (
          <LevelButton
            key={level}
            label={arabicLabel}
            locked={!isUnlocked}
            onPress={() => onSelectLevel(level)}
          />
        );
      })}
    </ScrollView>
  );
}

function LevelButton({
  label,
  locked,
  onPress,
}: {
  label: string;
  locked: boolean;
  onPress: () => void;
}) {
  const scale = new Animated.Value(1);

  const handlePressIn = () => {
    Animated.timing(scale, {
      toValue: 0.95,
      duration: 100,
      easing: Easing.out(Easing.ease),
      useNativeDriver: true,
    }).start();
  };
  const handlePressOut = () => {
    Animated.timing(scale, {
      toValue: 1,
      duration: 100,
      easing: Easing.out(Easing.ease),
      useNativeDriver: true,
    }).start();
  };

  return (
    <Pressable
      onPress={onPress}
      disabled={locked}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      style={({ pressed }) => [
        styles.levelButton,
        locked ? styles.lockedButton : styles.unlockedButton,
        pressed && !locked && styles.pressedButton,
      ]}
    >
      <Animated.View style={{ transform: [{ scale }] }}>
        <View style={styles.row}>
          <Text style={[styles.levelText, locked && styles.lockedText]}>
            {label}
          </Text>
          {locked && (
            <Ionicons
              name="lock-closed"
              size={24}
              color="#666"
              style={styles.lockIcon}
            />
          )}
        </View>
      </Animated.View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 28,
    backgroundColor: "#E8F6FF",
    flexGrow: 1,
    justifyContent: "center",
  },
  title: {
    fontSize: 32,
    fontFamily: "Tajawal-Bold",
    marginBottom: 40,
    textAlign: "center",
    color: "#004a8f",
  },
  levelButton: {
    paddingVertical: 18,
    marginBottom: 18,
    borderRadius: 16,
    paddingHorizontal: 22,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.25,
    shadowRadius: 10,
    elevation: 7,
  },
  unlockedButton: {
    backgroundColor: "#007acc",
    shadowColor: "#004a8f",
  },
  lockedButton: {
    backgroundColor: "#d1d5db",
    shadowColor: "#999",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 4,
  },
  pressedButton: {
    opacity: 0.75,
  },
  row: {
    flexDirection: "row-reverse",
    alignItems: "center",
    justifyContent: "space-between",
  },
  levelText: {
    fontSize: 24,
    fontFamily: "Tajawal-Bold",
    color: "white",
    textAlign: "right",
    flex: 1,
  },
  lockedText: {
    color: "#777",
  },
  lockIcon: {
    marginRight: 14,
  },
});
