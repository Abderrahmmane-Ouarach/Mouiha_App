// app/quizz/lib/questions.ts

export type Question = {
  id: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
};

const questionsData: Record<string, Question[]> = {
  niveau1: [
    {
      id: 'n1q1',
      question: "كم من الماء يمكن أن يهدره صنبور يقطر في اليوم؟",
      options: ["1 لتر", "10 لترات", "50 لترًا", "100 لتر"],
      correctIndex: 2,
      explanation: "يمكن أن يهدر صنبور يقطر حتى 50 لترًا من الماء يوميًا.",
    },
    {
      id: 'n1q2',
      question: "ما هو أفضل وقت لسقي النباتات؟",
      options: ["في الظهر", "في المساء", "في الصباح", "في العصر"],
      correctIndex: 2,
      explanation: "الصباح هو أفضل وقت لتقليل التبخر.",
    },
  ],
  niveau2: [
    {
      id: 'n2q1',
      question: "أي نشاط منزلي يستهلك أكبر كمية من الماء؟",
      options: ["الاستحمام", "دورة المياه", "غسل الملابس", "غسالة الصحون"],
      correctIndex: 1,
      explanation: "تستهلك دورات المياه حوالي 30% من المياه المنزلية.",
    },
    {
      id: 'n2q2',
      question: "أي نوع من الماء يُستخدم غالبًا في الزراعة؟",
      options: ["ماء صالح للشرب", "ماء المطر", "المياه المعالجة", "ماء مالح"],
      correctIndex: 2,
      explanation: "يتم استخدام المياه المعالجة بشكل متزايد في الري.",
    },
  ],
  niveau3: [
    {
      id: 'n3q1',
      question: "ما هي نسبة المياه العذبة على سطح الأرض؟",
      options: ["10%", "25%", "2.5%", "50%"],
      correctIndex: 2,
      explanation: "فقط 2.5% من المياه على الأرض هي مياه عذبة.",
    },
    {
      id: 'n3q2',
      question: "ما هو العمل الذي يساعد في الحفاظ على المياه الجوفية؟",
      options: ["غسل السيارة بالخرطوم", "تركيب خزان لجمع ماء المطر", "زيادة ضغط المياه", "استخدام المبيدات"],
      correctIndex: 1,
      explanation: "جمع ماء المطر يقلل من استهلاك المياه الجوفية.",
    },
  ],
};

export function getQuestionsByLevel(level: string): Promise<Question[]> {
  return Promise.resolve(questionsData[level] || []);
}
