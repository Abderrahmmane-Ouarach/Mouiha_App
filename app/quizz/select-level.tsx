import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useEffect, useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import type { QuizStackParamList } from "./types";

type NavigationProp = NativeStackNavigationProp<QuizStackParamList, "SelectLevel">;

const LEVELS = ["niveau1", "niveau2", "niveau3", "niveau4", "niveau5"];

export default function SelectLevel() {
  const navigation = useNavigation<NavigationProp>();
  const [unlockedLevels, setUnlockedLevels] = useState<string[]>(["niveau1"]); // au moins niveau1 déverrouillé

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

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>اختر المستوى</Text>
      {LEVELS.map((level) => {
        const isUnlocked = unlockedLevels.includes(level);
        const arabicLabel = `المستوى ${level.replace("niveau", "")}`;
        return (
          <TouchableOpacity
            key={level}
            style={[styles.levelButton, !isUnlocked && styles.lockedButton]}
            onPress={() => onSelectLevel(level)}
            disabled={!isUnlocked}
          >
            <View style={styles.row}>
              <Text
                style={[styles.levelText, !isUnlocked && styles.lockedText]}
              >
                {arabicLabel}
              </Text>
              {!isUnlocked && (
                <Ionicons
                  name="lock-closed"
                  size={20}
                  color="gray"
                  style={styles.lockIcon}
                />
              )}
            </View>
          </TouchableOpacity>
        );
      })}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: "#E8F6FF",
    flexGrow: 1,
    justifyContent: "center",
  },
  title: {
    fontSize: 28,
    fontFamily: "Tajawal-Bold",
    marginBottom: 30,
    textAlign: "center",
  },
  levelButton: {
    backgroundColor: "#007acc",
    paddingVertical: 15,
    marginBottom: 15,
    borderRadius: 10,
    paddingHorizontal: 15,
  },
  lockedButton: {
    backgroundColor: "#ccc",
  },
  row: {
    flexDirection: "row-reverse",
    alignItems: "center",
    justifyContent: "space-between",
  },
  levelText: {
    fontSize: 22,
    fontFamily: "Tajawal-Bold",
    color: "white",
    textAlign: "right",
    flex: 1,
  },
  lockedText: {
    color: "#666",
  },
  lockIcon: {
    marginRight: 10,
  },
});
