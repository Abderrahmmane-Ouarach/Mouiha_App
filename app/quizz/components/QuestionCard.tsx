import { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Question } from '../../../lib/questions';

type Props = {
  question: Question;
  onAnswer: (isCorrect: boolean) => void;
};

export default function QuestionCard({ question, onAnswer }: Props) {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);

  const handleSelect = (index: number) => {
    if (isAnswered) return; // bloquer si déjà répondu
    setSelectedIndex(index);
    setIsAnswered(true);
    onAnswer(index === question.correctIndex);
  };

  return (
    <View style={styles.card}>
      <Text style={styles.questionText}>{question.question}</Text>
      {question.options.map((option, index) => {
        const isCorrect = index === question.correctIndex;
        const isSelected = index === selectedIndex;

        let backgroundColor = '#eee';
        if (isAnswered) {
          if (isSelected) backgroundColor = isCorrect ? '#4CAF50' : '#F44336'; // vert ou rouge
          else if (isCorrect) backgroundColor = '#4CAF50'; // montre la bonne réponse
        }

        return (
          <TouchableOpacity
            key={index}
            style={[styles.optionButton, { backgroundColor }]}
            onPress={() => handleSelect(index)}
            disabled={isAnswered}
          >
            <Text style={styles.optionText}>{option}</Text>
          </TouchableOpacity>
        );
      })}
      {isAnswered && (
        <View style={styles.explanationBox}>
          <Text style={styles.explanationText}>{question.explanation}</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 20,
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 8,
  },
  questionText: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 20,
  },
  optionButton: {
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderRadius: 6,
    marginVertical: 6,
  },
  optionText: {
    fontSize: 16,
  },
  explanationBox: {
    marginTop: 20,
    padding: 15,
    backgroundColor: '#e0f7fa',
    borderRadius: 6,
  },
  explanationText: {
    fontSize: 14,
    color: '#00796b',
  },
});
