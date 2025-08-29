import React, { useEffect, useRef, useState } from 'react';
import {
  Animated,
  Easing,
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Dimensions,
  Alert,
  StatusBar,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CustomAlert from './CustomAlert';
import { Audio } from 'expo-av';


const { width } = Dimensions.get('window');

type Theme = {
  title: string;
  icons: string[];
  tips: string[];
  fact: string;
  color: string;
  difficulty: string;
  targetTime: number;
  reward: string;
};

type ThemesMap = { [k: number]: Theme };

const ICON_INFO: { [k: string]: string } = {
  '💧': 'كل قطرة مهمة — وفّرها بإغلاق الصنبور جيدًا.',
  '🚿': 'تقليل مدة الاستحمام 1–2 دقيقة يوفر عشرات اللترات.',
  '🏠': 'البيت الذكي يراقب استهلاك الماء ويمنع الهدر.',
  '🔧': 'إصلاح تسرب بسيط يوفر ماءً وكهرباءً أيضاً.',
  '💡': 'الأجهزة الموفّرة تقلل الاستهلاك حتى 50%.',
  '🌱': 'النباتات المحلية تحتاج ماء أقل وتحافظ على البيئة.',
  '♻️': 'إعادة التدوير توفر الماء المستخدم في التصنيع.',
  '🏭': 'الصناعات النظيفة تقلل تلوث المياه الجوفية.',
  '🛡️': 'حماية المصادر المائية مسؤولية الجميع.',
  '⚙️': 'التقنيات الذكية تراقب وتوفر المياه تلقائيًا.',
  '🌳': 'الأشجار تحافظ على المياه الجوفية وتمنع التبخر.',
  '🔬': 'البحث العلمي يطور حلولاً مبتكرة لتوفير المياه.',
  '📱': 'تطبيقات الهاتف تساعد في مراقبة استهلاك المياه.',
  '💻': 'الأنظمة الرقمية تحسن إدارة المياه في المدن.',
  '🌍': 'التعاون العالمي ضروري لحل أزمة المياه.',
  '👥': 'التوعية المجتمعية تضاعف أثر توفير المياه.',
  '❤️': 'حب البيئة يبدأ بالمحافظة على المياه.',
  '🤝': 'الشراكة بين الجميع تحقق الاستدامة المائية.',
  '⭐': 'كن نجماً في المحافظة على المياه.',
  '🏆': 'إنجازك في التوفير يستحق التقدير.',
  '🌊': 'المحيطات والبحار مصدر الحياة على الأرض.',
  '⚗️': 'الكيمياء الخضراء تطور مواد صديقة للمياه.',
  '🚀': 'تقنيات المستقبل ستحل مشاكل المياه.',
  '🔮': 'الرؤية المستقبلية تتطلب حماية المياه اليوم.',
  '☔': 'جمع مياه الأمطار استثمار ذكي للمستقبل.',
  '🧰': 'الأدوات الصحيحة تساعد في صيانة أنظمة المياه.',
  '🧼': 'التنظيف الذكي يوفر المياه والمنظفات.',
  '🐟': 'حماية الأسماك تعني حماية النظم المائية.',
  '🏜️': 'مناطق الجفاف تحتاج حلولاً مبتكرة للمياه.',
  '🪴': 'النباتات المنزلية تحسن جودة الهواء وتوفر المياه.',
  '🧪': 'تحليل المياه يضمن جودتها وسلامة الاستخدام.',
  '🥤': 'زجاجة قابلة لإعادة الاستخدام تقلل ماء تصنيع البلاستيك.',
};

const WATER_THEMES: ThemesMap = {
  1: { 
    title: 'بداية التوفير', 
    icons: ['💧', '💧', '🚿', '🚿'], 
    tips: ['أغلق الصنبور عند غسل أسنانك', 'استحم بسرعة أكبر'], 
    fact: 'توفير دقيقة واحدة من الاستحمام = 19 لتر!', 
    color: '#3498DB', 
    difficulty: '⭐ سهل', 
    targetTime: 25, 
    reward: '🏆 موفر مبتدئ' 
  },
  2: { 
    title: 'البيت الذكي', 
    icons: ['🏠', '🏠', '🔧', '🔧', '💡', '💡'], 
    tips: ['أصلح الصنبور المتسرب فوراً', 'اجمع مياه المطر في وعاء', 'استخدم الغسالة عندما تكون ممتلئة'], 
    fact: 'إصلاح تسرب صغير يوفر 35 لتر يومياً', 
    color: '#2ECC71', 
    difficulty: '⭐⭐ متوسط', 
    targetTime: 35, 
    reward: '🏆 خبير المنزل' 
  },
  3: { 
    title: 'حارس البيئة', 
    icons: ['🌱', '🌱', '♻️', '♻️', '🏭', '🏭', '🛡️', '🛡️'], 
    tips: ['لا تلقي القمامة في النهر', 'ازرع النباتات في حديقتك', 'استخدم منتجات صديقة للبيئة', 'شارك في تنظيف الشواطئ'], 
    fact: 'النباتات تنظف المياه بشكل طبيعي', 
    color: '#E74C3C', 
    difficulty: '⭐⭐⭐ صعب', 
    targetTime: 45, 
    reward: '🏆 حامي البيئة' 
  },
  4: { 
    title: 'تقني المياه', 
    icons: ['⚙️', '⚙️', '🌳', '🌳', '🔬', '🔬', '📱', '📱', '💻', '💻'], 
    tips: ['استخدم الري بالتنقيط للنباتات', 'راقب استهلاك المياه بتطبيق', 'جرب تقنيات توفير المياه الجديدة', 'علم أصدقاءك طرق التوفير', 'استخدم أجهزة قليلة الاستهلاك'], 
    fact: 'التقنيات الحديثة توفر 50% من المياه', 
    color: '#9B59B6', 
    difficulty: '⭐⭐⭐⭐ خبير', 
    targetTime: 55, 
    reward: '🏆 مهندس المياه' 
  },
  5: { 
    title: 'بطل المياه', 
    icons: ['🌍', '🌍', '👥', '👥', '❤️', '❤️', '🤝', '🤝', '⭐', '⭐', '🏆', '🏆'], 
    tips: ['علم الآخرين أهمية توفير المياه', 'شارك في مشاريع المياه المحلية', 'كن قدوة في مجتمعك', 'ادعم المنظمات البيئية', 'انشر الوعي على وسائل التواصل', 'احتفل بإنجازاتك في التوفير'], 
    fact: 'تأثيرك الإيجابي يمكن أن ينقذ آلاف اللترات!', 
    color: '#34495E', 
    difficulty: '⭐⭐⭐⭐⭐ بطل', 
    targetTime: 65, 
    reward: '👑 أسطورة المياه' 
  },
  6: { 
    title: 'خبير عالمي', 
    icons: ['🌊', '🌊', '🔬', '🔬', '🏭', '🏭', '🌍', '🌍', '⚗️', '⚗️', '🚀', '🚀', '🔮', '🔮'], 
    tips: ['ادرس تقنيات تحلية المياه المتقدمة', 'افهم دورة المياه في الطبيعة', 'تعلم معالجة المياه الملوثة', 'اكتشف توليد المياه من الهواء', 'شارك في البحث العلمي', 'طوّر حلولاً مبتكرة', 'كن سفيراً للمياه في العالم'], 
    fact: 'الابتكار في تقنيات المياه يمكن أن يغير العالم!', 
    color: '#1ABC9C', 
    difficulty: '⭐⭐⭐⭐⭐⭐ أسطورة', 
    targetTime: 75, 
    reward: '🌟 سفير المياه العالمي' 
  },
  7: { 
    title: 'أمطار وخزانات', 
    icons: ['☔', '☔', '🧰', '🧰', '🧼', '🧼', '🐟', '🐟', '🪴', '🪴', '🔧', '🔧', '💡', '💡', '🌱', '🌱'], 
    tips: ['ركّب خزان تجميع أمطار', 'صيانة دورية للأنابيب', 'استخدم دلوًا لغسل السيارة', 'احمِ الأنهار من الملوثات', 'استخدم النباتات المحلية', 'صيانة منتظمة للأجهزة'], 
    fact: 'جمع 100 لتر مطر يكفي ريّ حديقة صغيرة لأيام.', 
    color: '#0EA5E9', 
    difficulty: '⭐⭐⭐⭐⭐⭐⭐ صعب جداً', 
    targetTime: 80, 
    reward: '💠 جامع المطر الخبير' 
  },
  8: { 
    title: 'مناخ واعٍ', 
    icons: ['🏜️', '🏜️', '🪴', '🪴', '🔧', '🔧', '💡', '💡', '🌱', '🌱', '☔', '☔', '🧰', '🧰', '🧼', '🧼', '🐟', '🐟'], 
    tips: ['الريّ صباحًا/مساءً', 'نباتات قليلة الاستهلاك', 'سدّ التسريبات فورًا', 'أجهزة موفّرة', 'تربة مُغطّاة تقلل التبخر', 'جمع المياه الرمادية'], 
    fact: 'التغطية العضوية للتربة تقلل فقد الماء حتى 70%.', 
    color: '#16A34A', 
    difficulty: '⭐⭐⭐⭐⭐⭐⭐⭐ خبير متقدم', 
    targetTime: 85, 
    reward: '🌿 صديق المناخ المتقدم' 
  },
  9: { 
    title: 'مختبر المنزل', 
    icons: ['🧪', '🧪', '⚗️', '⚗️', '📱', '📱', '💻', '💻', '🔬', '🔬', '🏠', '🏠', '🌊', '🌊', '🚀', '🚀', '🔮', '🔮', '⚙️', '⚙️'], 
    tips: ['اختبر جودة الماء دوريًا', 'رشّح الماء بدل شراء البلاستيك', 'تابع الاستهلاك عبر التطبيق', 'حلّل الأنماط لتعرف الهدر', 'استخدم المستشعرات الذكية', 'طور نظام مراقبة منزلي'], 
    fact: 'الترشيح المنزلي يقلل القوارير البلاستيكية آلافًا سنويًا.', 
    color: '#7C3AED', 
    difficulty: '⭐⭐⭐⭐⭐⭐⭐⭐⭐ عبقري', 
    targetTime: 90, 
    reward: '🧠 كيميائي ذكي متطور' 
  },
  10: { 
    title: 'مجتمع متعاون', 
    icons: ['👥', '👥', '🤝', '🤝', '❤️', '❤️', '🐟', '🐟', '🌍', '🌍', '⭐', '⭐', '🏆', '🏆', '🌊', '🌊', '🔬', '🔬', '🏭', '🏭', '⚗️', '⚗️'], 
    tips: ['حملات تنظيف', 'ورش توعية', 'مشاركة قصص نجاح', 'إنشاء حدائق مائية صديقة', 'تنظيم فعاليات بيئية', 'قيادة مبادرات محلية'], 
    fact: 'العمل الجماعي يضاعف الأثر التوفيري والفائدة البيئية.', 
    color: '#475569', 
    difficulty: '⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐ قائد', 
    targetTime: 95, 
    reward: '🏅 قائد المجتمع المؤثر' 
  },
  11: { 
    title: 'ابتكار متقدم', 
    icons: ['🚀', '🚀', '🔮', '🔮', '⚙️', '⚙️', '🌊', '🌊', '🧰', '🧰', '☔', '☔', '🧪', '🧪', '💡', '💡', '🔬', '🔬', '📱', '📱', '💻', '💻', '🏠', '🏠'], 
    tips: ['نماذج تنبؤية للهدر', 'أجهزة إنترنت الأشياء', 'صيانة استباقية', 'حصاد أمطار حضري', 'ذكاء اصطناعي للمياه', 'تطوير تطبيقات ذكية'], 
    fact: 'المستشعرات الذكية تكشف التسريب خلال دقائق.', 
    color: '#0F766E', 
    difficulty: '⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐ مبتكر', 
    targetTime: 100, 
    reward: '🔧 مهندس المستقبل العبقري' 
  },
  12: { 
    title: 'أسطورة الماء', 
    icons: ['🌍','🌍','💧','💧','🚿','🚿','🧪','🧪','🪴','🪴','🐟','🐟','☔','☔','🔧','🔧','🚀','🚀','🔮','🔮','⚙️','⚙️','🌊','🌊','🧰','🧰','💡','💡','🔬','🔬','📱','📱'], 
    tips: ['نمذجة استهلاك الأسرة', 'خطط طوارئ للجفاف', 'تعليم الأجيال الصغيرة', 'بحث وتطوير تقنيات جديدة', 'قيادة مشاريع دولية', 'إرشاد الخبراء الآخرين'], 
    fact: 'إستراتيجية متكاملة على مستوى البيت والحي تُحدِث فارقًا ملحوظًا.', 
    color: '#1F2937', 
    difficulty: '⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐ أسطورة عليا', 
    targetTime: 110, 
    reward: '👑 أسطورة الماء الكبرى' 
  },
};
const MISTAKE_ALERTS: { [level: number]: number } = {
  1: 2,  
  2: 3,  
  3: 4,
  4: 5, 
  5: 6,   
  6: 7,  
  7: 8,  
  8: 9, 
  9: 10, 
  10: 11, 
  11: 12, 
  12: 16, 
};



const MAX_LEVEL = Object.keys(WATER_THEMES).length;
const playSound = async (soundFile: any) => {
  try {
    const { sound } = await Audio.Sound.createAsync(soundFile);
    await sound.playAsync();

    sound.setOnPlaybackStatusUpdate((status) => {
      if (status.isLoaded && status.didJustFinish) {
        sound.unloadAsync();
      }
    });
  } catch (error) {
    console.warn('Erreur lecture son:', error);
  }
};

const ACHIEVEMENTS = {
  FIRST_WIN: { id: 'first_win', title: 'أول فوز 🎉', desc: 'مبروك! بدأت رحلتك', color: '#F39C12' },
  FAST_LEARNER: { id: 'fast_learner', title: 'سريع التعلم ⚡', desc: 'أنهيت المستوى بسرعة', color: '#E74C3C' },
  PERFECT_MEMORY: { id: 'perfect_memory', title: 'ذاكرة ممتازة 🧠', desc: 'أخطاء قليلة جداً', color: '#F1C40F' },
  WATER_GUARDIAN: { id: 'water_guardian', title: 'حارس المياه 🛡️', desc: 'أكملت 5 مستويات', color: '#3498DB' },
  ECO_EXPERT: { id: 'eco_expert', title: 'خبير بيئي 🌱', desc: 'تعلمت الكثير عن البيئة', color: '#27AE60' },
};

type Card = {
  id: number;
  symbol: string;
  isFlipped: boolean;
  isMatched: boolean;
};

const shuffleArray = <T,>(arr: T[]): T[] => {
  const shuffled = [...arr];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

const createGameCards = (level: number): Card[] => {
  const theme = WATER_THEMES[level];
  if (!theme || !theme.icons || theme.icons.length === 0) {
    // Fallback to level 1 if theme doesn't exist or has no icons
    const fallbackTheme = WATER_THEMES[1];
    const shuffledIcons = shuffleArray([...fallbackTheme.icons]);
    return shuffledIcons.map((icon, index) => ({ 
      id: index, 
      symbol: icon, 
      isFlipped: false, 
      isMatched: false 
    }));
  }
  
  // Create a copy of the icons array to avoid mutations
  const iconsCopy = [...theme.icons];
  const shuffledIcons = shuffleArray(iconsCopy);
  
  return shuffledIcons.map((icon, index) => ({ 
    id: index, 
    symbol: icon, 
    isFlipped: false, 
    isMatched: false 
  }));
};


const getCardSize = (cardsCount: number) => {
  if (cardsCount <= 0) cardsCount = 4; // Fallback for invalid count
  
  // Calculate grid dimensions more intelligently
  let columns = 4;
  if (cardsCount <= 4) columns = 2;
  else if (cardsCount <= 6) columns = 3;
  else if (cardsCount <= 8) columns = 4;
  else if (cardsCount <= 12) columns = 4;
  else if (cardsCount <= 16) columns = 4;
  else columns = Math.ceil(Math.sqrt(cardsCount));
  
  const horizontalPadding = width * 0.1;
  const gap = width * 0.02;
  const usable = width - horizontalPadding;
  const maxSize = 90;
  const minSize = 48;
  
  let size = (usable - gap * (columns + 1)) / columns;
  size = Math.min(maxSize, Math.max(minSize, size));
  
  return { size, gap, columns };
};

const STORAGE_KEY = 'water_memory_progress_v2'; // Changed version to reset corrupted data

type Props = {
  navigation?: any;
};

const WaterMemoryGame: React.FC<Props> = ({ navigation }) => {
  const [currentLevel, setCurrentLevel] = useState<number>(1);
  const [cards, setCards] = useState<Card[]>([]);
  const [selectedCards, setSelectedCards] = useState<Card[]>([]);
  const [matches, setMatches] = useState<number>(0);
  const [mistakes, setMistakes] = useState<number>(0);
  const [gameWon, setGameWon] = useState<boolean>(false);
  const [timeStarted, setTimeStarted] = useState<number | null>(null);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [showLevelSelect, setShowLevelSelect] = useState<boolean>(false);
  const [showTips, setShowTips] = useState<boolean>(false);
  const [showFact, setShowFact] = useState<boolean>(false);
  const [showAchievements, setShowAchievements] = useState<boolean>(false);
  const [showPreview, setShowPreview] = useState<boolean>(true);
  const [totalScore, setTotalScore] = useState<number>(0);
  const [completedLevels, setCompletedLevels] = useState<Set<number>>(new Set());
  const [achievements, setAchievements] = useState<Set<string>>(new Set());
  const [quickInfo, setQuickInfo] = useState<{ icon: string; text: string } | null>(null);
  const [isDataLoaded, setIsDataLoaded] = useState<boolean>(false);
  const [alertVisible, setAlertVisible] = useState<boolean>(false);


  // Use useRef for animated values
  const cardAnimation = useRef(new Animated.Value(0)).current;
  const previewAnimation = useRef(new Animated.Value(1)).current;
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
useEffect(() => {
  if (alertVisible) {
    playSound(require("../../assets/sounds/677855__el_boss__game-fail-fanfare.wav")); // Remplace par ton fichier
  }
}, [alertVisible]);

  // Load saved data on component mount
  useEffect(() => {
    const loadSavedData = async () => {
      try {
        const raw = await AsyncStorage.getItem(STORAGE_KEY);
        if (raw) {
          const data = JSON.parse(raw);
          
          // Validate and set current level
          if (data?.currentLevel && typeof data.currentLevel === 'number' && data.currentLevel >= 1 && data.currentLevel <= MAX_LEVEL) {
            setCurrentLevel(data.currentLevel);
          }
          
          // Validate and set total score
          if (typeof data?.totalScore === 'number' && data.totalScore >= 0) {
            setTotalScore(data.totalScore);
          }
          
          // Validate and set completed levels
          if (Array.isArray(data?.completedLevels)) {
            const validLevels = data.completedLevels
              .map(Number)
              .filter((level: number) => level >= 1 && level <= MAX_LEVEL && Number.isInteger(level));
            setCompletedLevels(new Set(validLevels));
          }
          
          // Validate and set achievements
          if (Array.isArray(data?.achievements)) {
            const validAchievements = data.achievements.filter((id: string) => 
              typeof id === 'string' && Object.values(ACHIEVEMENTS).some(achievement => achievement.id === id)
            );
            setAchievements(new Set(validAchievements));
          }
        }
      } catch (e) {
        console.warn('Failed to load storage:', e);
        // Reset to default values if data is corrupted
        setCurrentLevel(1);
        setTotalScore(0);
        setCompletedLevels(new Set());
        setAchievements(new Set());
      } finally {
        setIsDataLoaded(true);
      }
    };
    loadSavedData();
  }, []);

  // Initialize game only after data is loaded
  useEffect(() => {
    if (isDataLoaded) {
      resetGame();
    }
  }, [currentLevel, isDataLoaded]);

  // Timer effect
  useEffect(() => {
    if (timeStarted && !gameWon && !showPreview) {
      intervalRef.current = setInterval(() => {
        setCurrentTime(Math.floor((Date.now() - timeStarted) / 1000));
      }, 1000);
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [timeStarted, gameWon, showPreview]);

  // Save data when state changes (but only after initial load)
  useEffect(() => {
    if (!isDataLoaded) return;
    
    const saveData = async () => {
      try {
        const payload = {
          currentLevel,
          totalScore,
          completedLevels: Array.from(completedLevels),
          achievements: Array.from(achievements),
        };
        await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
      } catch (e) {
        console.warn('Failed to save storage:', e);
      }
    };
    
    // Debounce save operation
    const timeoutId = setTimeout(saveData, 500);
    return () => clearTimeout(timeoutId);
  }, [currentLevel, totalScore, completedLevels, achievements, isDataLoaded]);

  const resetGame = () => {
    if (!isDataLoaded) return;
    
    try {
      const newCards = createGameCards(currentLevel);
      setCards(newCards);
      setSelectedCards([]);
      setMatches(0);
      setMistakes(0);
      setGameWon(false);
      setTimeStarted(null);
      setCurrentTime(0);
      setShowPreview(true);
      setShowFact(false);
      
      // Start preview after a short delay to ensure state is set
      setTimeout(() => {
        startPreviewSequence(newCards);
      }, 100);
    } catch (error) {
      console.error('Error resetting game:', error);
      // Fallback to level 1 if there's an error
      if (currentLevel !== 1) {
        setCurrentLevel(1);
      }
    }
  };

  const startPreviewSequence = (gameCards: Card[]) => {
    if (!gameCards || gameCards.length === 0) {
      console.warn('No game cards provided for preview');
      return;
    }
    
    try {
      const flippedCards = gameCards.map((card) => ({ ...card, isFlipped: true }));
      setCards(flippedCards);
      
      // Calculate preview time based on level difficulty
      const baseTime = 3000;
      const levelReduction = Math.min(currentLevel * 200, 1500);
      const previewTime = Math.max(1500, baseTime - levelReduction);
      
      setTimeout(() => {
        Animated.timing(previewAnimation, { 
          toValue: 0, 
          duration: 500, 
          useNativeDriver: true 
        }).start(() => {
          const hiddenCards = gameCards.map((card) => ({ ...card, isFlipped: false }));
          setCards(hiddenCards);
          setShowPreview(false);
          setTimeStarted(Date.now());
          animateCards();
          
          // Reset preview animation value for next time
          previewAnimation.setValue(1);
        });
      }, previewTime);
    } catch (error) {
      console.error('Error in preview sequence:', error);
      // Fallback: skip preview and start game
      const hiddenCards = gameCards.map((card) => ({ ...card, isFlipped: false }));
      setCards(hiddenCards);
      setShowPreview(false);
      setTimeStarted(Date.now());
      animateCards();
    }
  };

  const animateCards = () => {
    cardAnimation.setValue(0);
    Animated.timing(cardAnimation, { 
      toValue: 1, 
      duration: 350, 
      easing: Easing.out(Easing.back(1.2)), 
      useNativeDriver: true 
    }).start();
  };

  const checkAchievements = (gameData: { time: number; mistakes: number }) => {
    const newAchievements = new Set(Array.from(achievements));
    
    if (!achievements.has('first_win') && completedLevels.size === 0) {
      newAchievements.add('first_win');
    }
    if (!achievements.has('fast_learner') && gameData.time <= (WATER_THEMES[currentLevel]?.targetTime ?? Infinity)) {
      newAchievements.add('fast_learner');
    }
    if (!achievements.has('perfect_memory') && gameData.mistakes <= 2) {
      newAchievements.add('perfect_memory');
    }
    if (!achievements.has('water_guardian') && completedLevels.size + 1 >= 5) {
      newAchievements.add('water_guardian');
    }
    if (!achievements.has('eco_expert') && completedLevels.size + 1 >= 3) {
      newAchievements.add('eco_expert');
    }
    
    setAchievements(newAchievements);
  };

  const showQuickInfoToast = (icon: string) => {
  const text = ICON_INFO[icon] ?? 'معلومة مفيدة عن ترشيد المياه.';
  setQuickInfo({ icon, text });
  // Removed auto-hide timeout
  setTimeout(() => setQuickInfo(null), 5000);
};

  const handleCardPress = (pressedCard: Card) => {
  if (gameWon || showPreview || selectedCards.length === 2 || pressedCard.isFlipped || pressedCard.isMatched) return;

  const newSelectedCards = [...selectedCards, pressedCard];
  const newCards = cards.map(card =>
    card.id === pressedCard.id ? { ...card, isFlipped: true } : card
  );
  setCards(newCards);
  setSelectedCards(newSelectedCards);

  if (newSelectedCards.length === 2) {
    const [firstCard, secondCard] = newSelectedCards;

    setTimeout(() => {
      if (firstCard.symbol === secondCard.symbol) {
        playSound(require("../../assets/sounds/correct.mp3"));
          
        const matchedCards = newCards.map(card =>
          card.id === firstCard.id || card.id === secondCard.id
            ? { ...card, isMatched: true }
            : card
        );
        setCards(matchedCards);
        setMatches(matches + 1);
        showQuickInfoToast(firstCard.symbol);

        if (matches + 1 === matchedCards.length / 2) {
          handleWin();
        }
      } else {
        playSound(require("../../assets/sounds/wrong.wav"));
        const resetCards = newCards.map(card =>
          card.id === firstCard.id || card.id === secondCard.id
            ? { ...card, isFlipped: false }
            : card
        );
        setCards(resetCards);

        const newMistakes = mistakes + 1;
        setMistakes(prev => {
  const updated = prev + 1;
  const maxMistakes = MISTAKE_ALERTS[currentLevel] || 3;

  if (updated >= maxMistakes) {
    setAlertVisible(true); // show custom alert
  }

  return updated;
});




        
      }
      setSelectedCards([]);
    }, 700);
  }
};


  const handleWin = () => {
    try {
      const finalTime = Math.floor((Date.now() - (timeStarted || Date.now())) / 1000);
      const theme = WATER_THEMES[currentLevel];
      const baseScore = 100;
      const timeBonus = Math.max(0, (theme?.targetTime ?? 0) - finalTime) * 3;
      const mistakesPenalty = mistakes * 15;
      const levelMultiplier = currentLevel;
      const finalScore = Math.max(50, (baseScore + timeBonus - mistakesPenalty) * levelMultiplier);
      
      setGameWon(true);
      setTotalScore((s) => s + finalScore);
      setCompletedLevels((prev) => new Set([...Array.from(prev), currentLevel]));
      checkAchievements({ time: finalTime, mistakes });
      
      setTimeout(() => setShowFact(true), 900);
      playSound(require("../../assets/sounds/122255__jivatma07__level_complete.wav"));
    } catch (error) {
      console.error('Error handling win:', error);
      setGameWon(true);
      setTimeout(() => setShowFact(true), 900);
    }
  };

  const startLevel = (level: number) => {
    if (level < 1 || level > MAX_LEVEL) {
      console.warn('Invalid level:', level);
      return;
    }
    
    setCurrentLevel(level);
    setShowLevelSelect(false);
    setShowFact(false);
    setShowPreview(true);
  };

  const nextLevel = () => {
    if (currentLevel < MAX_LEVEL) {
      startLevel(currentLevel + 1);
    } else {
      Alert.alert(
        'مبروك! 🎉', 
        'أكملت جميع المستويات! أنت الآن خبير في المحافظة على المياه!',
        [
          { text: 'العب مرة أخرى', onPress: () => startLevel(1) },
          { text: 'الإنجازات', onPress: () => setShowAchievements(true) },
        ]
      );
    }
  };

  // Don't render anything until data is loaded
  if (!isDataLoaded) {
    return (
      <View style={[styles.container, styles.loadingContainer]}>
        <Text style={styles.loadingText}>جاري التحميل...</Text>
      </View>
    );
  }

  const currentTheme = WATER_THEMES[currentLevel] ?? WATER_THEMES[1];
  const progress = cards.length > 0 ? (matches / (cards.length / 2)) * 100 : 0;
  const { size: CARD_SIZE, gap: CARD_GAP, columns } = getCardSize(cards.length);

  return (
    <View style={[styles.container, { backgroundColor: (currentTheme?.color ?? '#ffffff') + '15' }]}>
      <StatusBar backgroundColor={currentTheme.color} barStyle="light-content" />
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.header}>
          <TouchableOpacity 
            style={styles.backButton} 
            onPress={() => navigation && navigation.goBack && navigation.goBack()}
          >
            <Icon name="home" size={20} color="#666" />
          </TouchableOpacity>
          <View style={styles.headerContent}>
            <Text style={styles.headerTitle}>لعبة ذاكرة المياه 💧</Text>
            <Text style={styles.headerSubtitle}>تعلم واحفظ المياه</Text>
          </View>
          <TouchableOpacity style={styles.achievementButton} onPress={() => setShowAchievements(true)}>
            <Icon name="emoji-events" size={16} color="#F39C12" />
            <Text style={styles.achievementCount}>{achievements.size}</Text>
          </TouchableOpacity>
        </View>

        <View style={[styles.gameInfo, { borderColor: currentTheme.color }]}>
          <Text style={[styles.levelTitle, { color: currentTheme.color }]}>المستوى {currentLevel}: {currentTheme.title}</Text>
          <Text style={styles.difficulty}>{currentTheme.difficulty}</Text>
          <Text style={styles.cardsCount}>البطاقات: {cards.length}</Text>

          {showPreview && (
            <View style={styles.previewContainer}>
              <Icon name="visibility" size={24} color={currentTheme.color} />
              <Text style={styles.previewText}>احفظ البطاقات!</Text>
            </View>
          )}

          <View style={styles.statsRow}>
            <View style={styles.statItem}>
              <Icon name="track-changes" size={16} color={currentTheme.color} />
              <Text style={styles.statValue}>{matches}/{Math.floor(cards.length / 2)}</Text>
            </View>
            <View style={styles.statItem}>
              <Icon name="schedule" size={16} color="#E67E22" />
              <Text style={[styles.statValue, { color: '#E67E22' }]}>{currentTime}ث</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.mistakeLabel}>أخطاء:</Text>
              <Text style={[styles.statValue, { color: '#E74C3C' }]}>{mistakes}</Text>
            </View>
            <View style={styles.statItem}>
              <Icon name="star" size={16} color="#F39C12" />
              <Text style={[styles.statValue, { color: '#F39C12' }]}>{totalScore}</Text>
            </View>
          </View>

          <View style={styles.progressContainer}>
            <View style={styles.progressBar}>
              <View style={[styles.progressFill, { width: `${progress}%`, backgroundColor: currentTheme.color }]} />
            </View>
            <Text style={styles.progressText}>{Math.round(progress)}%</Text>
          </View>

          {gameWon && (
            <View style={styles.winContentInline}>
              <Text style={styles.winTitle}>أحسنت! 🎉</Text>
              <Text style={styles.winDetails}>المستوى {currentLevel} في {currentTime} ثانية</Text>
            </View>
          )}
        </View>

        <View style={styles.actionButtons}>
          <TouchableOpacity style={[styles.actionButton, { backgroundColor: '#2ECC71' }]} onPress={() => setShowTips(true)}>
            <Icon name="lightbulb-outline" size={16} color="white" />
            <Text style={styles.actionButtonText}>نصائح</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.actionButton, { backgroundColor: '#9B59B6' }]} onPress={() => setShowLevelSelect(true)}>
            <Icon name="view-list" size={16} color="white" />
            <Text style={styles.actionButtonText}>المستويات</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.actionButton, { backgroundColor: '#95A5A6' }]} onPress={resetGame}>
            <Icon name="refresh" size={16} color="white" />
            <Text style={styles.actionButtonText}>إعادة</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.gameBoard}>
          <View style={[styles.cardsGrid, { gap: CARD_GAP }]}>
            {cards.map((card) => (
              <Animated.View
                key={card.id}
                style={[
                  styles.cardContainer,
                  {
                    transform: [
                      {
                        scale: cardAnimation.interpolate({ inputRange: [0, 1], outputRange: [0.85, 1] }),
                      },
                    ],
                  },
                ]}
              >
                <TouchableOpacity
                  style={[
                    styles.card,
                    { width: CARD_SIZE, height: CARD_SIZE, borderColor: currentTheme.color },
                    card.isFlipped && styles.cardFlipped,
                    card.isMatched && [styles.cardMatched, { borderColor: '#2ECC71' }],
                  ]}
                  onPress={() => handleCardPress(card)}
                  activeOpacity={0.85}
                >
                  {card.isFlipped || card.isMatched ? (
                    <Text
                      style={[
                        styles.cardIcon,
                        {
                          fontSize: Math.min(width * 0.06, CARD_SIZE * 0.6),
                          color: card.isMatched ? '#2ECC71' : currentTheme.color,
                        },
                      ]}
                    >
                      {card.symbol}
                    </Text>
                  ) : (
                    <Icon name="opacity" size={Math.min(width * 0.05, CARD_SIZE * 0.45)} color={currentTheme.color + '60'} />
                  )}
                </TouchableOpacity>
              </Animated.View>
            ))}
          </View>
        </View>
      </ScrollView>

      {/* Level selector */}
      <Modal visible={showLevelSelect} animationType="slide" transparent onRequestClose={() => setShowLevelSelect(false)}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>اختر المستوى</Text>
              <TouchableOpacity onPress={() => setShowLevelSelect(false)}>
                <Icon name="close" size={24} color="#666" />
              </TouchableOpacity>
            </View>
            <ScrollView style={styles.levelsList}>
              {Object.keys(WATER_THEMES).map((levelKey) => {
                const levelNum = parseInt(levelKey, 10);
                const theme = WATER_THEMES[levelNum];
                const isCompleted = completedLevels.has(levelNum);
                const isLocked = levelNum > 1 && !completedLevels.has(levelNum - 1);
                return (
                  <TouchableOpacity
                    key={levelKey}
                    style={[
                      styles.levelItem, 
                      { borderColor: theme.color }, 
                      isLocked && styles.levelLocked, 
                      currentLevel === levelNum && styles.levelCurrent
                    ]}
                    onPress={() => !isLocked && startLevel(levelNum)}
                    disabled={isLocked}
                  >
                    <View style={styles.levelInfo}>
                      <Text style={[styles.levelNumber, { color: theme.color }]}>{levelNum}</Text>
                      <View style={styles.levelDetails}>
                        <Text style={styles.levelName}>{theme.title}</Text>
                        <Text style={styles.levelDifficulty}>{theme.difficulty}</Text>
                        <Text style={styles.levelCards}>بطاقات: {theme.icons.length}</Text>
                      </View>
                    </View>
                    <View style={styles.levelStatus}>
                      {isCompleted && <Icon name="check-circle" size={20} color="#2ECC71" />}
                      {isLocked && <Icon name="lock" size={20} color="#95A5A6" />}
                      {currentLevel === levelNum && <Icon name="play-arrow" size={20} color={theme.color} />}
                    </View>
                  </TouchableOpacity>
                );
              })}
            </ScrollView>
          </View>
        </View>
      </Modal>

      {/* Tips modal */}
      <Modal visible={showTips} animationType="fade" transparent onRequestClose={() => setShowTips(false)}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>نصائح توفير المياه</Text>
              <TouchableOpacity onPress={() => setShowTips(false)}>
                <Icon name="close" size={24} color="#666" />
              </TouchableOpacity>
            </View>
            <ScrollView style={styles.tipsList}>
              {currentTheme.tips.map((tip, index) => (
                <View key={index} style={[styles.tipItem, { borderLeftColor: currentTheme.color }]}>
                  <View style={[styles.tipNumber, { backgroundColor: currentTheme.color }]}>
                    <Text style={styles.tipNumberText}>{index + 1}</Text>
                  </View>
                  <Text style={styles.tipText}>{tip}</Text>
                </View>
              ))}
            </ScrollView>
          </View>
        </View>
      </Modal>

      {/* Fact / win modal */}
      <Modal visible={showFact} animationType="slide" transparent onRequestClose={() => setShowFact(false)}>
        <View style={styles.modalOverlay}>
          <View style={[styles.factModal, { borderColor: currentTheme.color }]}>
            <Text style={styles.factTitle}>هل تعلم؟ 💡</Text>
            <Text style={styles.factText}>{currentTheme.fact}</Text>
            <View style={styles.winButtons}>
              <TouchableOpacity style={[styles.winButton, { backgroundColor: currentTheme.color }]} onPress={resetGame}>
                <Text style={styles.winButtonText}>إعادة</Text>
              </TouchableOpacity>
              {currentLevel < MAX_LEVEL && (
                <TouchableOpacity style={[styles.winButton, { backgroundColor: '#2ECC71' }]} onPress={nextLevel}>
                  <Text style={styles.winButtonText}>التالي</Text>
                </TouchableOpacity>
              )}
            </View>
          </View>
        </View>
      </Modal>

      {/* Achievements */}
      <Modal visible={showAchievements} animationType="slide" transparent onRequestClose={() => setShowAchievements(false)}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>الإنجازات 🏆</Text>
              <TouchableOpacity onPress={() => setShowAchievements(false)}>
                <Icon name="close" size={24} color="#666" />
              </TouchableOpacity>
            </View>
            <ScrollView style={styles.achievementsList}>
              {Object.values(ACHIEVEMENTS).map((achievement) => {
                const isUnlocked = achievements.has(achievement.id);
                const emojiMatch = achievement.title.match(/([\u{1F300}-\u{1FAFF}\u{2600}-\u{26FF}])/u);
                const emoji = emojiMatch ? emojiMatch[0] : '🏅';
                return (
                  <View 
                    key={achievement.id} 
                    style={[
                      styles.achievementItem, 
                      isUnlocked ? styles.achievementUnlocked : styles.achievementLocked
                    ]}
                  >
                    <View style={[styles.achievementIcon, { backgroundColor: isUnlocked ? achievement.color : '#BDC3C7' }]}>
                      <Text style={styles.achievementEmoji}>{emoji}</Text>
                    </View>
                    <View style={styles.achievementInfo}>
                      <Text style={[styles.achievementTitle, { color: isUnlocked ? '#2C3E50' : '#95A5A6' }]}>
                        {achievement.title}
                      </Text>
                      <Text style={[styles.achievementDesc, { color: isUnlocked ? '#34495E' : '#BDC3C7' }]}>
                        {achievement.desc}
                      </Text>
                    </View>
                    {isUnlocked && <Icon name="check-circle" size={20} color="#2ECC71" />}
                  </View>
                );
              })}
            </ScrollView>
          </View>
        </View>
      </Modal>

      {/* Quick info toast */}
      {quickInfo && (
  <View style={{
  flexDirection: 'row', padding: 10, backgroundColor: '#FFF8DC',
  borderRadius: 12, alignItems: 'center', shadowColor: '#000', shadowOpacity: 0.2
}}>
  <Text style={{ fontSize: 24 }}>{quickInfo.icon}</Text>
  <Text style={{ flex: 1, marginLeft: 10, fontFamily: 'Tajawal-Medium' }}>{quickInfo.text}</Text>

</View>


)}
{alertVisible && (
  <CustomAlert
    visible={alertVisible}
    onRetry={() => {
      resetGame();
      setAlertVisible(false);
    }}
    onCancel={() => setAlertVisible(false)}
  />
)}
    </View>
  );
};

const styles = StyleSheet.create({
  // BASIC LAYOUT
  container: { 
    flex: 1 
  },
  loadingContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F8F9FA'
  },
  loadingText: {
    fontSize: 18,
    color: '#2C3E50',
    fontFamily: 'Tajawal-Medium'
  },
  scrollContainer: { 
    flexGrow: 1, 
    padding: 15 
  },
  header: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    marginBottom: 20, 
    marginTop: 10 
  },
  backButton: { 
    padding: 12, 
    borderRadius: 25, 
    backgroundColor: 'white', 
    shadowColor: '#000', 
    shadowOffset: { width: 0, height: 2 }, 
    shadowOpacity: 0.1, 
    shadowRadius: 4, 
    elevation: 3 
  },
  headerContent: { 
    flex: 1, 
    alignItems: 'center' 
  },
  headerTitle: { 
    fontSize: 22, 
    color: '#2C3E50', 
    textAlign: 'center', 
    fontFamily: 'Tajawal-Medium' 
  },
  headerSubtitle: { 
    fontSize: 14, 
    color: '#7F8C8D', 
    textAlign: 'center', 
    marginTop: 2, 
    fontFamily: 'Tajawal-Regular' 
  },
  achievementButton: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    padding: 8, 
    borderRadius: 20, 
    backgroundColor: 'white', 
    shadowColor: '#000', 
    shadowOffset: { width: 0, height: 2 }, 
    shadowOpacity: 0.1, 
    shadowRadius: 4, 
    elevation: 3 
  },
  achievementCount: { 
    marginLeft: 5, 
    fontSize: 12, 
    color: '#F39C12', 
    fontFamily: 'Tajawal-Regular' 
  },
  gameInfo: { 
    backgroundColor: 'white', 
    padding: 20, 
    borderRadius: 15, 
    borderWidth: 2, 
    marginBottom: 15, 
    shadowColor: '#000', 
    shadowOffset: { width: 0, height: 3 }, 
    shadowOpacity: 0.1, 
    shadowRadius: 6, 
    elevation: 4 
  },
  levelTitle: { 
    fontSize: 18, 
    textAlign: 'center', 
    marginBottom: 5, 
    fontFamily: 'Tajawal-Bold' 
  },
  difficulty: { 
    fontSize: 14, 
    color: '#7F8C8D', 
    textAlign: 'center', 
    marginBottom: 5, 
    fontFamily: 'Tajawal-Regular' 
  },
  cardsCount: {
    fontSize: 12,
    color: '#95A5A6',
    textAlign: 'center',
    marginBottom: 15,
    fontFamily: 'Tajawal-Regular'
  },
  previewContainer: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    justifyContent: 'center', 
    marginBottom: 15, 
    padding: 12, 
    backgroundColor: '#F8F9FA', 
    borderRadius: 10 
  },
  previewText: { 
    fontSize: 16, 
    color: '#2C3E50', 
    marginLeft: 8, 
    fontFamily: 'Tajawal-Medium' 
  },
  statsRow: { 
    flexDirection: 'row', 
    justifyContent: 'space-around', 
    marginBottom: 15 
  },
  statItem: { 
    alignItems: 'center', 
    flex: 1 
  },
  statValue: { 
    fontSize: 16, 
    marginTop: 4, 
    fontFamily: 'Tajawal-Medium' 
  },
  mistakeLabel: { 
    fontSize: 12, 
    color: '#95A5A6', 
    marginBottom: 2, 
    fontFamily: 'Tajawal-Regular' 
  },
  progressContainer: { 
    flexDirection: 'row', 
    alignItems: 'center' 
  },
  progressBar: { 
    flex: 1, 
    height: 8, 
    backgroundColor: '#E0E0E0', 
    borderRadius: 4, 
    overflow: 'hidden' 
  },
  progressFill: { 
    height: '100%', 
    borderRadius: 4 
  },
  progressText: { 
    marginLeft: 10, 
    fontSize: 12, 
    color: '#7F8C8D', 
    fontFamily: 'Tajawal-Regular' 
  },
  actionButtons: { 
    flexDirection: 'row', 
    justifyContent: 'space-around', 
    marginBottom: 20 
  },
  actionButton: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    paddingHorizontal: 16, 
    paddingVertical: 10, 
    borderRadius: 20, 
    shadowColor: '#000', 
    shadowOffset: { width: 0, height: 2 }, 
    shadowOpacity: 0.2, 
    shadowRadius: 4, 
    elevation: 4 
  },
  actionButtonText: { 
    color: 'white', 
    marginLeft: 6, 
    fontSize: 12, 
    fontFamily: 'Tajawal-Medium' 
  },
  gameBoard: { 
    alignItems: 'center', 
    marginBottom: 20 
  },
  cardsGrid: { 
    flexDirection: 'row', 
    flexWrap: 'wrap', 
    justifyContent: 'center', 
    maxWidth: width * 0.92 
  },
  cardContainer: { 
    margin: 4 
  },
  card: { 
    justifyContent: 'center', 
    alignItems: 'center', 
    backgroundColor: 'white', 
    borderRadius: 12, 
    borderWidth: 2, 
    shadowColor: '#000', 
    shadowOffset: { width: 0, height: 3 }, 
    shadowOpacity: 0.15, 
    shadowRadius: 6, 
    elevation: 5 
  },
  cardFlipped: { 
    backgroundColor: '#F8F9FA' 
  },
  cardMatched: { 
    backgroundColor: '#D5EDDA', 
    borderWidth: 3 
  },
  cardIcon: { 
    fontFamily: 'Tajawal-Medium' 
  },
  winContentInline: { 
    backgroundColor: '#FFFFFF', 
    padding: 16, 
    borderRadius: 14, 
    marginTop: 14, 
    alignItems: 'center', 
    borderWidth: 1, 
    borderColor: '#E5E7EB' 
  },
  winTitle: { 
    fontSize: 20, 
    color: '#2ECC71', 
    marginBottom: 6, 
    fontFamily: 'Tajawal-Bold' 
  },
  winDetails: { 
    fontSize: 14, 
    color: '#7F8C8D', 
    textAlign: 'center', 
    marginBottom: 10, 
    fontFamily: 'Tajawal-Regular' 
  },
  winButtons: { 
    flexDirection: 'row', 
    gap: 15 
  },
  winButton: { 
    paddingHorizontal: 20, 
    paddingVertical: 10, 
    borderRadius: 20, 
    minWidth: 90 
  },
  winButtonText: { 
    color: 'white', 
    textAlign: 'center', 
    fontFamily: 'Tajawal-Medium' 
  },
  modalOverlay: { 
    flex: 1, 
    backgroundColor: 'rgba(0, 0, 0, 0.5)', 
    justifyContent: 'center', 
    alignItems: 'center' 
  },
  modalContent: { 
    backgroundColor: 'white', 
    margin: 20, 
    padding: 20, 
    borderRadius: 15, 
    maxHeight: '80%', 
    width: '90%', 
    shadowColor: '#000', 
    shadowOffset: { width: 0, height: 4 }, 
    shadowOpacity: 0.3, 
    shadowRadius: 8, 
    elevation: 8 
  },
  modalHeader: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'center', 
    marginBottom: 15 
  },
  modalTitle: { 
    fontSize: 18, 
    color: '#2C3E50', 
    fontFamily: 'Tajawal-Medium' 
  },
  levelsList: { 
    maxHeight: 400 
  },
  levelItem: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    padding: 15, 
    borderRadius: 10, 
    borderWidth: 1, 
    marginBottom: 10, 
    backgroundColor: '#F8F9FA' 
  },
  levelLocked: { 
    opacity: 0.5 
  },
  levelCurrent: { 
    backgroundColor: '#E8F5E8' 
  },
  levelInfo: { 
    flex: 1, 
    flexDirection: 'row', 
    alignItems: 'center' 
  },
  levelNumber: { 
    fontSize: 24, 
    marginRight: 15, 
    width: 30, 
    textAlign: 'center', 
    fontFamily: 'Tajawal-Bold' 
  },
  levelDetails: { 
    flex: 1 
  },
  levelName: { 
    fontSize: 14, 
    color: '#2C3E50', 
    fontFamily: 'Tajawal-Medium' 
  },
  levelDifficulty: { 
    fontSize: 12, 
    color: '#7F8C8D', 
    marginTop: 2, 
    fontFamily: 'Tajawal-Regular' 
  },
  levelCards: {
    fontSize: 10,
    color: '#95A5A6',
    marginTop: 2,
    fontFamily: 'Tajawal-Regular'
  },
  levelStatus: { 
    width: 30, 
    alignItems: 'center' 
  },
  tipsList: { 
    maxHeight: 350 
  },
  tipItem: { 
    flexDirection: 'row', 
    alignItems: 'flex-start', 
    padding: 15, 
    marginBottom: 10, 
    backgroundColor: '#F8F9FA', 
    borderRadius: 10, 
    borderLeftWidth: 4 
  },
  tipNumber: { 
    width: 24, 
    height: 24, 
    borderRadius: 12, 
    justifyContent: 'center', 
    alignItems: 'center', 
    marginRight: 12 
  },
  tipNumberText: { 
    color: 'white', 
    fontSize: 12, 
    fontFamily: 'Tajawal-Medium' 
  },
 
  factModal: { 
    backgroundColor: 'white', 
    margin: 30, 
    padding: 25, 
    borderRadius: 20, 
    borderWidth: 3, 
    alignItems: 'center', 
    shadowColor: '#000', 
    shadowOffset: { width: 0, height: 6 }, 
    shadowOpacity: 0.3, 
    shadowRadius: 12, 
    elevation: 10 
  },
  factTitle: { 
    fontSize: 20, 
    color: '#2C3E50', 
    marginBottom: 15, 
    fontFamily: 'Tajawal-Bold' 
  },
  factText: { 
    fontSize: 16, 
    color: '#34495E', 
    textAlign: 'center', 
    lineHeight: 24, 
    marginBottom: 20, 
    fontFamily: 'Tajawal-Regular' 
  },
  achievementsList: { 
    maxHeight: 350 
  },
  achievementItem: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    padding: 15, 
    borderRadius: 10, 
    marginBottom: 10 
  },
  achievementUnlocked: { 
    backgroundColor: '#FFF3CD', 
    borderColor: '#F39C12', 
    borderWidth: 1 
  },
  achievementLocked: { 
    backgroundColor: '#F8F9FA', 
    borderColor: '#E0E0E0', 
    borderWidth: 1 
  },
  achievementIcon: { 
    width: 40, 
    height: 40, 
    borderRadius: 20, 
    justifyContent: 'center', 
    alignItems: 'center', 
    marginRight: 15 
  },
  achievementEmoji: { 
    fontSize: 20, 
    fontFamily: 'Tajawal-Regular' 
  },
  achievementInfo: { 
    flex: 1 
  },
  achievementTitle: { 
    fontSize: 14, 
    fontFamily: 'Tajawal-Medium' 
  },
  achievementDesc: { 
    fontSize: 12, 
    marginTop: 2, 
    fontFamily: 'Tajawal-Regular' 
  },
  toastContainer: { 
    position: 'absolute', 
    bottom: 20, 
    left: 16, 
    right: 16, 
    alignItems: 'center' 
  },
  toastCard: { 
    backgroundColor: 'white', 
    borderRadius: 16, 
    paddingHorizontal: 14, 
    paddingVertical: 12, 
    borderWidth: 1, 
    borderColor: '#E5E7EB', 
    shadowColor: '#000', 
    shadowOffset: { width: 0, height: 6 }, 
    shadowOpacity: 0.2, 
    shadowRadius: 12, 
    elevation: 10, 
    flexDirection: 'row', 
    alignItems: 'center', 
    maxWidth: width * 0.92 
  },
  toastIcon: { 
    fontSize: 20, 
    marginRight: 8, 
    fontFamily: 'Tajawal-Regular' 
  },
  toastText: { 
    flex: 1, 
    fontSize: 13, 
    color: '#111827', 
    fontFamily: 'Tajawal-Regular' 
  },
  tipPanel: {
  position: 'absolute',
  bottom: 10,
  left: 10,
  right: 10,
  backgroundColor: '#ffffffee',
  borderRadius: 12,
  padding: 12,
  flexDirection: 'row',
  alignItems: 'flex-start',
  shadowColor: '#000',
  shadowOpacity: 0.2,
  shadowOffset: { width: 0, height: 2 },
  shadowRadius: 4,
  maxHeight: 120, // allows scrolling if text is long
},
tipIcon: {
  fontSize: 24,
  marginRight: 8,
},
tipTextContainer: {
  flex: 1,
},
tipText: {
  fontSize: 16,
  color: '#333',
  
    
    lineHeight: 20, 
    fontFamily: 'Tajawal-Regular',
    alignContent: 'center',
},

});

export default WaterMemoryGame;