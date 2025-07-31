// app/quizz/navigation.tsx
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SelectLevel from './select-level';
import Play from './play';
import Result from './result';
import type { QuizStackParamList } from './types';

const Stack = createNativeStackNavigator<QuizStackParamList>();

export default function QuizNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="SelectLevel" component={SelectLevel} />
      <Stack.Screen name="Play" component={Play} />
      <Stack.Screen name="Result" component={Result} />
    </Stack.Navigator>
  );
}
