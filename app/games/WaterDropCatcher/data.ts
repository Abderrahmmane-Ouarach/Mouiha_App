// data.ts - Game data and configurations

import { Level, WaterFact } from './types';

export const GAME_CONFIG = {
  GAME_DURATION: 30, // seconds
  BUCKET_WIDTH: 80,
  BUCKET_HEIGHT: 60,
  DROP_SIZE: 30,
  GAME_WIDTH: 350,
  GAME_HEIGHT: 600,
  GROUND_OFFSET: 100,
};

export const LEVELS: Level[] = [
  {
    level: 1,
    dropSpeed: 2,
    spawnRate: 1500, // milliseconds
    pollutedDropRate: 20, // 20% polluted
    scoreMultiplier: 1,
  },
  {
    level: 2,
    dropSpeed: 3,
    spawnRate: 1200,
    pollutedDropRate: 30, // 30% polluted
    scoreMultiplier: 1.2,
  },
  {
    level: 3,
    dropSpeed: 4,
    spawnRate: 1000,
    pollutedDropRate: 40, // 40% polluted
    scoreMultiplier: 1.5,
  },
  {
    level: 4,
    dropSpeed: 5,
    spawnRate: 800,
    pollutedDropRate: 45, // 45% polluted
    scoreMultiplier: 2,
  },
  {
    level: 5,
    dropSpeed: 6,
    spawnRate: 600,
    pollutedDropRate: 50, // 50% polluted
    scoreMultiplier: 2.5,
  },
];

export const WATER_FACTS: WaterFact[] = [
  {
    id: 1,
    fact: "الماء يشكل 60% من جسم الإنسان البالغ",
    tip: "اشرب 8 أكواب من الماء يومياً للحفاظ على صحتك"
  },
  {
    id: 2,
    fact: "2.2 مليار شخص لا يحصلون على مياه شرب آمنة",
    tip: "لا تترك الصنبور مفتوحاً عند غسل الأسنان"
  },
  {
    id: 3,
    fact: "يحتاج الشخص الواحد إلى 20-50 لتر من الماء يومياً",
    tip: "استخدم دش سريع بدلاً من الاستحمام في البانيو"
  },
  {
    id: 4,
    fact: "97% من المياه على الأرض مالحة وغير صالحة للشرب",
    tip: "احرص على إصلاح أي تسريب في المواسير فوراً"
  },
  {
    id: 5,
    fact: "يمكن أن يعيش الإنسان بدون طعام لأسابيع ولكن بدون ماء لأيام فقط",
    tip: "اجمع ماء المطر لسقي النباتات"
  },
  {
    id: 6,
    fact: "تحتاج إنتاج برجر واحد إلى 2400 لتر من الماء",
    tip: "قلل من استهلاك اللحوم للحفاظ على الماء"
  },
  {
    id: 7,
    fact: "70% من المياه العذبة تُستخدم في الزراعة",
    tip: "ازرع نباتات تحتاج كمية قليلة من الماء"
  },
  {
    id: 8,
    fact: "يموت طفل كل دقيقة بسبب الأمراض المنقولة بالماء الملوث",
    tip: "تأكد من نظافة خزانات المياه في منزلك"
  }
];

export const getRandomWaterFact = (): WaterFact => {
  const randomIndex = Math.floor(Math.random() * WATER_FACTS.length);
  return WATER_FACTS[randomIndex];
};