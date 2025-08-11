// app/quizz/types.ts

import type { Question } from '../../lib/questions'; // adapte ce chemin selon ton projet

export type QuizStackParamList = {
  SelectLevel: undefined; // pas de params
  Play: {
    level: string;
    retryQuestions?: Question[]; // optionnel si tu veux rejouer questions ratées
  };
  Result: {
    score: number;
    total: number;
    wrongQuestions: Question[];
    level: string;
  };
};
