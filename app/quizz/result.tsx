// app/quizz/result.tsx
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { QuizStackParamList } from './types';

type ResultNavigationProp = NativeStackNavigationProp<QuizStackParamList, 'Result'>;
type ResultRouteProp = RouteProp<QuizStackParamList, 'Result'>;

export default function Result() {
  const navigation = useNavigation<ResultNavigationProp>();
  const route = useRoute<ResultRouteProp>();

  const { score, total, wrongQuestions, level } = route.params;

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>نتيجة {level.replace('niveau', 'المستوى ')}</Text>
      <Text style={styles.score}>
        نتيجتك: {score} / {total}
      </Text>

      {wrongQuestions.length > 0 ? (
        <>
          <Text style={styles.subtitle}>الأسئلة التي أخطأت فيها:</Text>
          {wrongQuestions.map((q, idx) => (
            <View key={idx} style={styles.wrongQuestionBox}>
              <Text style={styles.questionText}>{q.question}</Text>
              <Text style={styles.explanationText}>{q.explanation}</Text>
            </View>
          ))}
          <TouchableOpacity
            style={styles.retryButton}
            onPress={() => navigation.navigate('Play', { level, retryQuestions: wrongQuestions })}
          >
            <Text style={styles.retryButtonText}>أعد محاولة الأسئلة الخاطئة</Text>
          </TouchableOpacity>
        </>
      ) : (
        <Text style={styles.congratsText}>
  أحسنت!{'\n'}أجبت على جميع الأسئلة بشكل صحيح 🎉
</Text>



      )}
      <Text style={[styles.congratsTtext]}>
  يمكنك الآن الانتقال إلى المستوى التالي 
</Text>

      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.navigate('SelectLevel')}
      >
        <Text style={styles.backButtonText}>العودة إلى اختيار المستوى</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#E8F6FF',
    flexGrow: 1,
    
    
  },
  title: {
    fontSize: 20,
    
    marginBottom: 15,
    marginTop:100,
    textAlign: 'center',
    fontFamily: 'Tajawal-Bold',
  },
  score: {
    fontSize: 20,
    marginBottom: 20,
    textAlign: 'center',
    fontFamily: 'Tajawal-Medium',
  },
  subtitle: {
    fontSize: 18,
    marginTop:32,
    marginBottom: 20,
    textAlign: 'right',
    fontFamily: 'Tajawal-Bold',
  },
  wrongQuestionBox: {
    backgroundColor: '#f8d7da',
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
  },
  questionText: {
    fontSize: 14,
    
    textAlign: 'right',
    fontFamily: 'Tajawal-Bold',
  },
  explanationText: {
    fontSize: 14,
    marginTop: 5,
    textAlign: 'right',
    fontFamily: 'Tajawal-Regular',
  },
  retryButton: {
    marginTop:50,
    backgroundColor: '#dc3545',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 20,
  },
  retryButtonText: {
    color: 'white',
    fontSize: 16,
    fontFamily: 'Tajawal-Bold',
  },
  congratsText: {
    fontSize: 16,
    color: '#28a745',
    textAlign: 'center',
    marginBottom: 20,
    lineHeight:26,
    fontFamily: 'Tajawal-Bold',
  },
  congratsTtext: {
    fontSize: 16,
    color: '#000000ff',
    textAlign: 'center',
    marginBottom: 20,
    lineHeight:26,
    fontFamily: 'Tajawal-Bold',
  },
  backButton: {
    backgroundColor: '#007acc',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  backButtonText: {
    color: 'white',
    fontSize: 16,
    fontFamily: 'Tajawal-Bold',
  },
});
