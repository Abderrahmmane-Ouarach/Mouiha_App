import AsyncStorage from "@react-native-async-storage/async-storage";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useRef, useState } from "react";
import { Ionicons } from '@expo/vector-icons'
import { SafeAreaView } from "react-native-safe-area-context";

import {
  ActivityIndicator,
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Question } from "../../lib/questions";
import { useQuestions } from "../../lib/useQuestions";
import type { QuizStackParamList } from "./types";

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

  const { level, retryQuestions } = route.params;

  const { questions, loading } = useQuestions(level, retryQuestions);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [wrongQuestions, setWrongQuestions] = useState<Question[]>([]);
  const [pressedOption, setPressedOption] = useState<number | null>(null);

  const scrollViewRef = useRef<ScrollView>(null);

  const onSelectOption = (index: number) => {
    if (selectedOption !== null) return;
    setSelectedOption(index);
    setShowFeedback(true);

    const correctIndex = questions[currentIndex].correctIndex;
    if (index !== correctIndex) {
      setWrongQuestions((prev) => [...prev, questions[currentIndex]]);
    }

    setTimeout(() => {
      scrollViewRef.current?.scrollToEnd({ animated: true });
    }, 100);
  };

  const onNext = async () => {
    if (!showFeedback) return;

    if (currentIndex + 1 < questions.length) {
      setCurrentIndex(currentIndex + 1);
      setSelectedOption(null);
      setShowFeedback(false);
      setPressedOption(null);
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

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#007acc" />
        <Text style={styles.loadingText}>جاري تحميل الأسئلة...</Text>
      </View>
    );
  }

  if (questions.length === 0) {
    return (
      <View style={styles.centered}>
        <Text style={styles.noQuestionsText}>لا توجد أسئلة لهذا المستوى.</Text>
      </View>
    );
  }

  const question = questions[currentIndex];
  

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#E8F4FD" }}>
    <ScrollView contentContainerStyle={styles.container}>
      <TouchableOpacity
        style={styles.backIconButton}
        onPress={() => navigation.navigate("SelectLevel")}
      >
        <Ionicons name="arrow-back" size={28} color="#007acc" />
      </TouchableOpacity>

      <Text style={styles.levelText}>{getArabicLevelLabel(level)}</Text>

      <View style={styles.progressBarContainer}>
        <View
          style={[
            styles.progressBarFill,
            { width: `${((currentIndex + 1) / questions.length) * 100}%` },
          ]}
        />
      </View>



      

      {question.imageUrl ? (
  <View
    style={{
      width: '100%',
      height: 200,
      borderRadius: 4,
      overflow: 'hidden',
      marginBottom: 15,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 3,
    }}
  >
    <Image
      source={{ uri: question.imageUrl }}
      style={{
        width: '100%',
        height: '100%',
      }}
      resizeMode="cover"
    />
  </View>
) : (

  <View
    style={{
      width: '100%',
      height: 4,
      marginBottom: 15,
      backgroundColor: 'transparent',      
    }}
  />
)}



      <Text style={styles.questionText}>{question.question}</Text>

      {showFeedback ? (
        <>

          <View style={{ marginBottom: -5 }}>
            
            <View
              style={[
                styles.optionButton,
                {
                  backgroundColor:
                    selectedOption === question.correctIndex ? "#d4edda" : "#f8d7da",
                  borderColor:
                    selectedOption === question.correctIndex ? "#28a745" : "#dc3545",
                },
              ]}
            >
              <Text style={[
    styles.optionText,
    { color: selectedOption === question.correctIndex ? "#28a745" : "#dc3545" }
]}>
    {selectedOption === question.correctIndex ? "✓ " : "✗ "}
    {question.options[selectedOption!]}
</Text>

            </View>
          </View>

          {selectedOption !== question.correctIndex && (
            <View style={{ marginBottom: -20 }}>
              
              <View
                style={[
                  styles.optionButton,
                  { backgroundColor: "#d4edda", borderColor: "#28a745" },
                ]}
              >
                <Text style={styles.optionText}>{question.options[question.correctIndex]}</Text>
              </View>
            </View>
          )}

          {/* Explication */}
          <View style={styles.explanationBox}>
            <Text style={styles.explanationText}>{question.explanation}</Text>
          </View>

          {/* Bouton suivant */}
          <TouchableOpacity style={styles.nextButton} onPress={onNext}>
            <Text style={styles.nextButtonText}>
              {currentIndex + 1 < questions.length ? "السؤال التالي" : "عرض النتيجة"}
            </Text>
          </TouchableOpacity>
        </>
      ) : (

        question.options.map((option, idx) => {
          const isPressed = pressedOption === idx;

          return (
            <Pressable
              key={idx}
              style={[
                styles.optionButton,
                {
                  backgroundColor: isPressed ? "#e0f0ff" : "white",
                  borderColor: isPressed ? "#3399ff" : "#007acc",
                  shadowColor: isPressed ? "#3399ff" : "#000",
                  shadowOffset: { width: 0, height: 1 },
                  shadowOpacity: isPressed ? 0.6 : 0.1,
                  shadowRadius: isPressed ? 5 : 1,
                  elevation: isPressed ? 3 : 1,
                },
              ]}
              onPress={() => onSelectOption(idx)}
              disabled={selectedOption !== null}
              onPressIn={() => setPressedOption(idx)}
              onPressOut={() => setPressedOption(null)}
            >
              <Text style={styles.optionText}>{option}</Text>
            </Pressable>
          );
        })
      )}
    </ScrollView>
    </SafeAreaView>
  );
}


const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: "#E8F4FD", 
    flexGrow: 1,
    marginTop: -15,
  },
  backIconButton: {
  position: "absolute",
  top: 25,  
  left: 15, 
  zIndex: 10,
  backgroundColor: "white",
  borderRadius: 20,
  padding: 6,
  shadowColor: "#000",
  shadowOffset: { width: 0, height: 2 },
  shadowOpacity: 0.3,
  shadowRadius: 3,
  elevation: 4,
},


  
  questionCount: {
    fontSize: 18,
    fontFamily: "Tajawal-Regular",
    marginBottom: 18,
    textAlign: "right",
    writingDirection: "rtl",
    color: "#333",
  },
  questionImage: {
    width: "100%",
    height: 180,
    borderRadius: 15,
    marginBottom: 20,
    resizeMode: "cover",
  },
  questionText: {
    fontSize: 22,
    fontFamily: "Tajawal-Bold",
    marginBottom: 20,
    lineHeight: 30,
    textAlign: "center",
    writingDirection: "rtl",
    color: "#123456",
  },
  optionButton: {
    borderWidth: 1,
    borderRadius: 15,
    paddingVertical: 16,
    paddingHorizontal: 20,
    marginBottom: 14,
    borderColor: "#007acc",
    backgroundColor: "white",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 1,
    elevation: 1,
  },
  optionText: {
    fontSize: 18,
    fontFamily: "Tajawal-Bold",
    textAlign: "right",
    writingDirection: "rtl",
    color: "#003366",
  },
  explanationBox: {
    backgroundColor: "#fff8e1",
    padding: 16,
    borderRadius: 15,
    marginVertical: 20,
    borderColor: "#ffe082",
    borderWidth: 1,
  },
  explanationText: {
    fontSize: 18,
    color: "#7c5d00",
    textAlign: "right",
    writingDirection: "rtl",
    fontFamily: "Tajawal-Medium",
    lineHeight: 26,
  },
  nextButton: {
    backgroundColor: "#007acc",
    padding: 18,
    borderRadius: 15,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ffffff",
    marginTop: -10,
  
    
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
  loadingText: {
    marginTop: 10,
    fontFamily: "Tajawal-Regular",
    color: "#007acc",
  },
  noQuestionsText: {
    fontFamily: "Tajawal-Regular",
    fontSize: 18,
    color: "#444",
  },
  levelText: {
  fontSize: 24,
  fontFamily: "Tajawal-Bold",
  marginBottom: 10,
  textAlign: "right",
  writingDirection: "rtl",
  color: "#004a8f",
  marginTop: 5,
  flexDirection: "column",
  alignItems: "flex-end",
  paddingHorizontal: 20,
},

progressBarContainer: {
  width: "100%",
  height: 5,
  backgroundColor: "#d0e6fd",
  borderRadius: 5,
  overflow: "hidden",
  position: "relative",
  marginTop: 8,
  marginBottom: 20,
  justifyContent: "center",
},

progressBarFill: {
  position: "absolute",
  left: 0,
  top: 0,
  bottom: 0,
  backgroundColor: "#123456",
  borderRadius: 5,    
  zIndex: 1,
  justifyContent: "center",
  alignItems: "center",
  paddingHorizontal: 5,  
  flexDirection: "row",
},


});
