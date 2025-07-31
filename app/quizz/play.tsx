import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useEffect, useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { getQuestionsByLevel, Question } from "./lib/questions"; // ✅ Utiliser le type importé
import type { QuizStackParamList } from "./types";

import AsyncStorage from "@react-native-async-storage/async-storage";

type PlayNavigationProp = NativeStackNavigationProp<QuizStackParamList, "Play">;
type PlayRouteProp = RouteProp<QuizStackParamList, "Play">;
const levelLabels: Record<string, string> = {
  niveau1: "الأول",
  niveau2: "الثاني",
  niveau3: "الثالث",
  niveau4: "الرابع",
  niveau5: "الخامس",
};

function getArabicLevelLabel(level: string): string {
  return `المستوى ${levelLabels[level] || level}`;
}

export default function Play() {
  const navigation = useNavigation<PlayNavigationProp>();
  const route = useRoute<PlayRouteProp>();

  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [wrongQuestions, setWrongQuestions] = useState<Question[]>([]);

  const { level, retryQuestions } = route.params;
  const [questions, setQuestions] = useState<Question[]>([]);

  useEffect(() => {
    if (retryQuestions && retryQuestions.length > 0) {
      setQuestions(retryQuestions);
    } else {
      getQuestionsByLevel(level).then((q) => {
        setQuestions(q);
      });
    }

    setCurrentIndex(0);
    setSelectedOption(null);
    setShowFeedback(false);
    setWrongQuestions([]);
  }, [level, retryQuestions]);

  const onSelectOption = (index: number) => {
    if (selectedOption !== null) return;
    setSelectedOption(index);
    setShowFeedback(true);

    const correctIndex = questions[currentIndex].correctIndex;
    if (index !== correctIndex) {
      setWrongQuestions((prev) => [...prev, questions[currentIndex]]);
    }
  };

  const onNext = async () => {
    if (!showFeedback) return;

    if (currentIndex + 1 < questions.length) {
      setCurrentIndex(currentIndex + 1);
      setSelectedOption(null);
      setShowFeedback(false);
    } else {
      const score = questions.length - wrongQuestions.length;
      const total = questions.length;

      if (score === total) {
        try {
          const saved = await AsyncStorage.getItem("unlockedLevels");
          const unlockedLevels: string[] = saved
            ? JSON.parse(saved)
            : ["niveau1"];

          const levelNumber = parseInt(level.replace("niveau", ""), 10);
          const nextLevel = `niveau${levelNumber + 1}`;

          if (!unlockedLevels.includes(nextLevel)) {
            unlockedLevels.push(nextLevel);
            await AsyncStorage.setItem(
              "unlockedLevels",
              JSON.stringify(unlockedLevels)
            );
          }
        } catch (e) {
          console.error("Erreur sauvegarde niveau débloqué", e);
        }
      }

      navigation.navigate("Result", {
        score,
        total,
        wrongQuestions,
        level,
      });
    }
  };

  if (questions.length === 0) {
    return (
      <View style={styles.centered}>
        <Text>Aucune question disponible pour ce niveau.</Text>
      </View>
    );
  }

  const question = questions[currentIndex];

  return (
    <ScrollView contentContainerStyle={styles.container}>
<Text style={styles.levelText}>{getArabicLevelLabel(level)}</Text>

      <Text style={styles.questionCount}>
        السؤال {currentIndex + 1} من {questions.length}
      </Text>

      <Text style={styles.questionText}>{question.question}</Text>

      {question.options.map((option, idx) => {
        const isSelected = selectedOption === idx;
        const isCorrect = question.correctIndex === idx;

        let backgroundColor = "white";
        let borderColor = "#007acc";

        if (showFeedback) {
          if (isSelected) {
            backgroundColor = isCorrect ? "#d4edda" : "#f8d7da";
            borderColor = isCorrect ? "#28a745" : "#dc3545";
          } else if (isCorrect) {
            backgroundColor = "#d4edda";
            borderColor = "#28a745";
          }
        }

        return (
          <TouchableOpacity
            key={idx}
            style={[styles.optionButton, { backgroundColor, borderColor }]}
            onPress={() => onSelectOption(idx)}
            disabled={selectedOption !== null}
          >
            <Text style={styles.optionText}>{option}</Text>
          </TouchableOpacity>
        );
      })}

      {showFeedback && (
        <>
          <View style={styles.explanationBox}>
            <Text style={styles.explanationText}>{question.explanation}</Text>
          </View>
          <TouchableOpacity style={styles.nextButton} onPress={onNext}>
            <Text style={styles.nextButtonText}>
              {currentIndex + 1 < questions.length
                ? "السؤال التالي"
                : "عرض النتيجة"}
            </Text>
          </TouchableOpacity>
        </>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    
    padding: 20,
    backgroundColor: "#F5F9FC",
    flexGrow: 1,
  },
  levelText: {
    fontSize: 20,
    fontFamily: "Tajawal-Bold",
    marginBottom: 10,
    textAlign: "right",
    writingDirection: "rtl",
    color: "#005e9c",
    marginTop: 70,
  },
  questionCount: {
    fontSize: 18,
    fontFamily: "Tajawal-Regular",
    marginBottom: 20,
    textAlign: "right",
    writingDirection: "rtl",
    color: "#333",
    
  },
  questionText: {
    fontSize: 22,
    fontFamily: "Tajawal-Bold",
    marginBottom: 20,
    
    textAlign: "right",
    writingDirection: "rtl",
    color: "#1a1a1a",
  },
  optionButton: {
    borderWidth: 1,
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderColor: "#007acc",
    backgroundColor: "white",
  },
  optionText: {
    fontSize: 18,
    fontFamily: "Tajawal-Regular",
    textAlign: "right",
    writingDirection: "rtl",
  },
  explanationBox: {
    backgroundColor: "#fff8e1",
    padding: 16,
    borderRadius: 10,
    marginVertical: 20,
    borderColor: "#ffe082",
    borderWidth: 1,
    
  },
  explanationText: {
    fontSize: 18,
    color: "#7c5d00",
    textAlign: "right",
    writingDirection: "rtl",
    fontFamily: "Tajawal-bold",
  },
  nextButton: {
    backgroundColor: "#007acc",
    padding: 16,
    borderRadius: 10,
    alignItems: "center",
  },
  nextButtonText: {
    color: "white",
    fontSize: 20,
    fontFamily: "Tajawal-Bold",
  },
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
