import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { useCallback, useEffect, useState } from 'react';
import {
  Alert,
  Animated,
  Easing,
  Modal,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Dimensions
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const { width, height } = Dimensions.get('window');

const WATER_THEMES = {
  1: {
    title: "المستوى الأول",
    icons: ['tint', 'tint', 'shower', 'shower'],
    iconTips: {
      tint: "💧 كل قطرة ماء تحتوي على مليارات الجزيئات وهي أساس الحياة على الأرض",
      shower: "🚿 الاستحمام لمدة 10 دقائق يستهلك 150 لتر من الماء - قلل المدة لتوفر المياه"
    },
    tips: [
      "💧 كل قطرة ماء مهمة - لا تضيعها!",
      "🌧️ مياه الأمطار كنز مجاني - اجمعها!"
    ],
    fact: "قطرة واحدة كل ثانية = 30 لتر مهدور شهرياً! 😱",
    color: '#3498DB',
    difficulty: '⭐ مبتدئ',
    targetTime: 30,
    reward: "🏆 محافظ مبتدئ على المياه",
    xp: 100
  },
  2: {
    title: " المستوى الثاني",
    icons: ['home', 'home', 'wrench', 'wrench', 'faucet', 'faucet'],
    iconTips: {
      home: "🏠 البيت المتوسط يستهلك 300 لتر يومياً - يمكن تقليلها إلى النصف بالوعي",
      wrench: "🔧 إصلاح التسرب الصغير يوفر 15000 لتر سنوياً - فحص دوري ضروري",
      faucet: "🚰 الصنبور المفتوح لدقيقة واحدة يهدر 6 لترات - أغلقه دائماً"
    },
    tips: [
      "🚿 5 دقائق استحمام = توفير 75 لتر يومياً",
      "🔧 إصلاح التسرب = 15,000 لتر سنوياً",
      "💡 الغسالة الممتلئة توفر 50 لتر"
    ],
    fact: "أسرتك تستطيع توفير 150 لتر يومياً بخطوات بسيطة! 🏠",
    color: '#2ECC71',
    difficulty: '⭐⭐ متقدم',
    targetTime: 40,
    reward: "🏆 خبير البيت الذكي",
    xp: 200
  },
  3: {
    title: " المستوى الثالث",
    icons: ['leaf', 'leaf', 'recycle', 'recycle', 'industry', 'industry', 'filter', 'filter'],
    iconTips: {
      leaf: "🌱 النباتات تنقي المياه طبيعياً وتعيد تدوير الأكسجين - ازرع حديقة مائية",
      recycle: "♻️ إعادة تدوير المياه الرمادية يقلل الاستهلاك 40% - استخدم مياه الغسيل للري",
      industry: "🏭 الصناعات تستهلك 22% من المياه العالمية - ادعم المنتجات الصديقة للبيئة",
      filter: "🔬 الفلاتر الحديثة تزيل 99.9% من الملوثات وتجعل المياه صالحة للشرب"
    },
    tips: [
      "🏭 70% من التلوث سببه المصانع",
      "🔬 الفلاتر تزيل 99% من البكتيريا",
      "🌱 النباتات تنقي المياه طبيعياً",
      "♻️ لا تلقي الزيوت في المجاري"
    ],
    fact: "مليار إنسان بلا مياه نظيفة - كن جزء من الحل! 🌍",
    color: '#E74C3C',
    difficulty: '⭐⭐⭐ محترف',
    targetTime: 50,
    reward: "🏆 حارس البيئة المائية",
    xp: 300
  },
  4: {
    title: " المستوى الرابع",
    icons: ['cogs', 'cogs', 'tree', 'tree', 'mobile', 'mobile', 'solar-panel', 'solar-panel', 'database', 'database'],
    iconTips: {
      cogs: "⚙️ التقنيات الذكية تراقب استهلاك المياه وتوفر 30% من الاستهلاك تلقائياً",
      tree: "🌳 الري بالتنقيط يوفر 60% من مياه الزراعة ويزيد إنتاج المحاصيل",
      mobile: "📱 تطبيقات الهاتف تساعد في مراقبة استهلاك المياه وتقديم نصائح ذكية",
      'solar-panel': "☀️ الطاقة الشمسية تشغل محطات تحلية المياه بتكلفة أقل وبيئة أنظف",
      database: "💾 البيانات الضخمة تساعد في توزيع المياه بكفاءة وتوقع مناطق الجفاف"
    },
    tips: [
      "💧 الري بالتنقيط يوفر 60% من المياه",
      "☀️ الطاقة الشمسية لتحلية المياه",
      "♻️ إعادة تدوير المياه الرمادية",
      "📱 التطبيقات الذكية تراقب الاستهلاك",
      "🚀 تقنيات المستقبل في متناولك"
    ],
    fact: "التكنولوجيا الحديثة تستطيع توفير 40% من مياه العالم! 🚀",
    color: '#9B59B6',
    difficulty: '⭐⭐⭐⭐ خبير',
    targetTime: 60,
    reward: "🏆 مهندس المياه المستقبلي",
    xp: 400
  },
  5: {
    title: " المستوى الخامس",
    icons: ['globe', 'globe', 'users', 'users', 'heart', 'heart', 'handshake-o', 'handshake-o', 'star', 'star', 'trophy', 'trophy'],
    iconTips: {
      globe: "🌍 كوكب الأرض 71% مياه لكن 97% منها مالحة - المياه العذبة أثمن من الذهب",
      users: "👥 التعاون بين المجتمعات يحل أزمة المياه - كل فرد يستطيع إحداث فرق",
      heart: "❤️ المياه النظيفة تنقذ 5 ملايين طفل سنوياً من الأمراض المائية",
      'handshake-o': "🤝 الشراكة الدولية ضرورية لحماية الأنهار والبحيرات من التلوث",
      star: "⭐ أنت نجم في حفظ المياه - قدوة للآخرين في المحافظة على الموارد",
      trophy: "🏆 بطل المياه العالمي - تأثيرك الإيجابي يصل لملايين الأشخاص"
    },
    tips: [
      "🌍 5 مليارات شخص سيواجهون نقص المياه 2030",
      "💰 كل دولار استثمار = 7 دولار عائد",
      "🤝 التعاون الدولي ينقذ الأنهار",
      "📢 التوعية تضاعف فعالية التوفير",
      "🏆 أنت بطل المياه الآن!",
      "🌟 تأثيرك يصل للعالم كله"
    ],
    fact: "احتياج المياه سيزيد 55% بحلول 2050 - أنت الحل! 🌟",
    color: '#34495E',
    difficulty: '⭐⭐⭐⭐⭐ أسطورة',
    targetTime: 70,
    reward: "👑 أسطورة حفظ المياه العالمية",
    xp: 500
  }
};

const ACHIEVEMENTS = {
  FIRST_WIN: { id: 'first_win', title: '🏆 أول انتصار', desc: 'بداية رحلتك المائية!', icon: 'trophy', color: '#F39C12', xp: 50 },
  FAST_LEARNER: { id: 'fast_learner', title: '⚡ متعلم سريع', desc: 'أسرع من البرق!', icon: 'bolt', color: '#E74C3C', xp: 75 },
  PERFECT_MEMORY: { id: 'perfect_memory', title: '🧠 ذاكرة مثالية', desc: 'دقة لا تُصدق!', icon: 'star', color: '#F1C40F', xp: 100 },
  WATER_GUARDIAN: { id: 'water_guardian', title: '🛡️ حارس المياه', desc: 'حامي كوكب الأرض!', icon: 'shield', color: '#3498DB', xp: 200 },
  ECO_EXPERT: { id: 'eco_expert', title: '🌱 خبير بيئي', desc: 'عالم البيئة الصغير!', icon: 'leaf', color: '#27AE60', xp: 150 },
  STREAK_MASTER: { id: 'streak_master', title: '🔥 سيد المتتاليات', desc: '5 مستويات متتالية!', icon: 'fire', color: '#E67E22', xp: 125 },
  TIME_CHAMPION: { id: 'time_champion', title: '⏰ بطل الوقت', desc: 'سرعة خارقة!', icon: 'clock-o', color: '#8E44AD', xp: 175 },
  WATER_SAVER: { id: 'water_saver', title: '💧 موفر المياه', desc: 'كل قطرة تهم!', icon: 'tint', color: '#2980B9', xp: 90 }
};

const STORAGE_KEYS = {
  CURRENT_LEVEL: '@water_game_level',
  TOTAL_SCORE: '@water_game_score',
  TOTAL_XP: '@water_game_xp',
  PLAYER_LEVEL: '@water_game_player_level',
  STREAK: '@water_game_streak',
  COMPLETED_LEVELS: '@water_game_completed',
  ACHIEVEMENTS: '@water_game_achievements',
  STATISTICS: '@water_game_stats'
};

const shuffleArray = (arr) => {
  const shuffled = [...arr];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

const createGameCards = (level) => {
  const theme = WATER_THEMES[level];
  const shuffledIcons = shuffleArray(theme.icons);
  return shuffledIcons.map((icon, index) => ({
    id: index,
    symbol: icon,
    isFlipped: false,
    isMatched: false,
  }));
};

const WaterMemoryGame = () => {
  const navigation = useNavigation();
  
  const [currentLevel, setCurrentLevel] = useState(1);
  const [cards, setCards] = useState([]);
  const [selectedCards, setSelectedCards] = useState([]);
  const [matches, setMatches] = useState(0);
  const [attempts, setAttempts] = useState(0);
  const [mistakes, setMistakes] = useState(0);
  const [gameWon, setGameWon] = useState(false);
  const [timeStarted, setTimeStarted] = useState(null);
  const [currentTime, setCurrentTime] = useState(0);
  const [showLevelSelect, setShowLevelSelect] = useState(false);
  const [showTips, setShowTips] = useState(false);
  const [showFact, setShowFact] = useState(false);
  const [showAchievements, setShowAchievements] = useState(false);
  const [showPreview, setShowPreview] = useState(true);
  const [showMatchTip, setShowMatchTip] = useState(false);
  const [currentMatchTip, setCurrentMatchTip] = useState('');
  const [totalScore, setTotalScore] = useState(0);
  const [completedLevels, setCompletedLevels] = useState(new Set());
  const [achievements, setAchievements] = useState(new Set());
  const [statistics, setStatistics] = useState({
    totalGames: 0,
    perfectGames: 0,
    totalTime: 0,
    averageTime: 0
  });
  
  const [cardAnimation] = useState(new Animated.Value(0));
  const [winAnimation] = useState(new Animated.Value(0));
  const [previewAnimation] = useState(new Animated.Value(1));
  const [tipAnimation] = useState(new Animated.Value(0));
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let interval = null;
    if (timeStarted && !gameWon && !showPreview) {
      interval = setInterval(() => {
        setCurrentTime(Math.floor((Date.now() - timeStarted) / 1000));
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [timeStarted, gameWon, showPreview]);

  const loadGameData = useCallback(async () => {
    try {
      const [savedLevel, savedScore, savedLevels, savedAchievements, savedStats] = await Promise.all([
        AsyncStorage.getItem(STORAGE_KEYS.CURRENT_LEVEL),
        AsyncStorage.getItem(STORAGE_KEYS.TOTAL_SCORE),
        AsyncStorage.getItem(STORAGE_KEYS.COMPLETED_LEVELS),
        AsyncStorage.getItem(STORAGE_KEYS.ACHIEVEMENTS),
        AsyncStorage.getItem(STORAGE_KEYS.STATISTICS)
      ]);

      if (savedLevel) setCurrentLevel(Math.max(1, parseInt(savedLevel) || 1));
      if (savedScore) setTotalScore(parseInt(savedScore) || 0);
      if (savedLevels) setCompletedLevels(new Set(JSON.parse(savedLevels) || []));
      if (savedAchievements) setAchievements(new Set(JSON.parse(savedAchievements) || []));
      if (savedStats) setStatistics(JSON.parse(savedStats) || statistics);
    } catch (error) {
      console.error('Error loading game data:', error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const saveGameData = useCallback(async () => {
    try {
      await Promise.all([
        AsyncStorage.setItem(STORAGE_KEYS.CURRENT_LEVEL, currentLevel.toString()),
        AsyncStorage.setItem(STORAGE_KEYS.TOTAL_SCORE, totalScore.toString()),
        AsyncStorage.setItem(STORAGE_KEYS.COMPLETED_LEVELS, JSON.stringify([...completedLevels])),
        AsyncStorage.setItem(STORAGE_KEYS.ACHIEVEMENTS, JSON.stringify([...achievements])),
        AsyncStorage.setItem(STORAGE_KEYS.STATISTICS, JSON.stringify(statistics))
      ]);
    } catch (error) {
      console.error('Error saving game data:', error);
    }
  }, [currentLevel, totalScore, completedLevels, achievements, statistics]);

  useEffect(() => {
    loadGameData();
  }, [loadGameData]);

  useEffect(() => {
    if (!isLoading) {
      resetGame();
    }
  }, [currentLevel, isLoading]);

  useEffect(() => {
    if (!isLoading) {
      saveGameData();
    }
  }, [saveGameData, isLoading]);

  const showEducationalTip = (icon) => {
    const theme = WATER_THEMES[currentLevel];
    const tip = theme.iconTips[icon];
    if (tip) {
      setCurrentMatchTip(tip);
      setShowMatchTip(true);
      
      Animated.spring(tipAnimation, {
        toValue: 1,
        tension: 100,
        friction: 8,
        useNativeDriver: true,
      }).start();

      setTimeout(() => {
        Animated.timing(tipAnimation, {
          toValue: 0,
          duration: 500,
          useNativeDriver: true,
        }).start(() => {
          setShowMatchTip(false);
        });
      }, 3000);
    }
  };

  const resetGame = () => {
    const newCards = createGameCards(currentLevel);
    setCards(newCards);
    setSelectedCards([]);
    setMatches(0);
    setAttempts(0);
    setMistakes(0);
    setGameWon(false);
    setTimeStarted(null);
    setCurrentTime(0);
    setShowPreview(true);
    setShowMatchTip(false);
    tipAnimation.setValue(0);
    startPreviewSequence(newCards);
  };

  const startPreviewSequence = (gameCards) => {
    const flippedCards = gameCards.map(card => ({ ...card, isFlipped: true }));
    setCards(flippedCards);
    
    const previewTime = Math.max(1500, 2500 - (currentLevel * 200));
    
    setTimeout(() => {
      Animated.timing(previewAnimation, {
        toValue: 0,
        duration: 500,
        easing: Easing.inOut(Easing.quad),
        useNativeDriver: true,
      }).start(() => {
        const hiddenCards = gameCards.map(card => ({ ...card, isFlipped: false }));
        setCards(hiddenCards);
        setShowPreview(false);
        setTimeStarted(Date.now());
        animateCards();
      });
    }, previewTime);
  };

  const animateCards = () => {
    cardAnimation.setValue(0);
    Animated.stagger(30,
      cards.map(() =>
        Animated.timing(cardAnimation, {
          toValue: 1,
          duration: 200,
          easing: Easing.out(Easing.back(1.1)),
          useNativeDriver: true,
        })
      )
    ).start();
  };

  const checkAchievements = (gameData) => {
    const newAchievements = new Set([...achievements]);
    let hasNewAchievement = false;

    if (!achievements.has('first_win') && completedLevels.size === 0) {
      newAchievements.add('first_win');
      hasNewAchievement = true;
    }

    if (!achievements.has('fast_learner') && gameData.time <= WATER_THEMES[currentLevel].targetTime) {
      newAchievements.add('fast_learner');
      hasNewAchievement = true;
    }

    if (!achievements.has('perfect_memory') && gameData.mistakes <= 2) {
      newAchievements.add('perfect_memory');
      hasNewAchievement = true;
    }

    if (!achievements.has('water_guardian') && completedLevels.size + 1 === 5) {
      newAchievements.add('water_guardian');
      hasNewAchievement = true;
    }

    if (!achievements.has('eco_expert') && completedLevels.size + 1 >= 3) {
      newAchievements.add('eco_expert');
      hasNewAchievement = true;
    }

    if (hasNewAchievement) {
      setAchievements(newAchievements);
    }
  };

  const handleCardPress = (pressedCard) => {
    if (
      gameWon ||
      showPreview ||
      selectedCards.length === 2 ||
      pressedCard.isFlipped ||
      pressedCard.isMatched
    ) {
      return;
    }

    const newSelectedCards = [...selectedCards, pressedCard];
    const newCards = cards.map(card =>
      card.id === pressedCard.id ? { ...card, isFlipped: true } : card
    );

    setCards(newCards);
    setSelectedCards(newSelectedCards);
    setAttempts(attempts + 1);

    if (newSelectedCards.length === 2) {
      const [firstCard, secondCard] = newSelectedCards;

      setTimeout(() => {
        if (firstCard.symbol === secondCard.symbol) {
          const matchedCards = newCards.map(card =>
            card.id === firstCard.id || card.id === secondCard.id
              ? { ...card, isMatched: true }
              : card
          );

          setCards(matchedCards);
          setMatches(matches + 1);
          
          showEducationalTip(firstCard.symbol);

          if (matches + 1 === cards.length / 2) {
            setTimeout(() => handleWin(), 1000);
          }
        } else {
          const resetCards = newCards.map(card =>
            card.id === firstCard.id || card.id === secondCard.id
              ? { ...card, isFlipped: false }
              : card
          );

          setCards(resetCards);
          setMistakes(mistakes + 1);
        }

        setSelectedCards([]);
      }, 600);
    }
  };

  const handleWin = () => {
    const finalTime = Math.floor((Date.now() - timeStarted) / 1000);
    const theme = WATER_THEMES[currentLevel];

    const baseScore = 100;
    const timeBonus = Math.max(0, theme.targetTime - finalTime) * 2;
    const mistakesPenalty = mistakes * 10;
    const levelMultiplier = currentLevel;
    const finalScore = Math.max(20, (baseScore + timeBonus - mistakesPenalty) * levelMultiplier);

    setGameWon(true);
    setTotalScore(totalScore + finalScore);
    setCompletedLevels(new Set([...completedLevels, currentLevel]));

    const newStats = {
      totalGames: statistics.totalGames + 1,
      perfectGames: statistics.perfectGames + (mistakes <= 2 ? 1 : 0),
      totalTime: statistics.totalTime + finalTime,
      averageTime: Math.round((statistics.totalTime + finalTime) / (statistics.totalGames + 1))
    };

    setStatistics(newStats);
    checkAchievements({ time: finalTime, mistakes });

    Animated.spring(winAnimation, {
      toValue: 1,
      tension: 100,
      friction: 8,
      useNativeDriver: true,
    }).start();

    setTimeout(() => setShowFact(true), 800);
  };

  const startLevel = (level) => {
    setCurrentLevel(level);
    setShowLevelSelect(false);
    winAnimation.setValue(0);
    previewAnimation.setValue(1);
  };

  const nextLevel = () => {
    if (currentLevel < 5) {
      startLevel(currentLevel + 1);
    } else {
      Alert.alert(
        "مبروك! 🎉",
        "لقد أكملت جميع المستويات وأصبحت خبيراً في المحافظة على المياه!",
        [
          { text: "العب مرة أخرى", onPress: () => startLevel(1) },
          { text: "عرض الإنجازات", onPress: () => setShowAchievements(true) }
        ]
      );
    }
  };

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <Icon name="tint" size={50} color="#3498DB" />
        <Text style={styles.loadingText}>جاري التحميل...</Text>
      </View>
    );
  }

  const currentTheme = WATER_THEMES[currentLevel];
  const progress = (matches / (cards.length / 2)) * 100;

  return (
    <View style={[styles.container, { backgroundColor: currentTheme.color + '10' }]}>
      <StatusBar backgroundColor={currentTheme.color} barStyle="light-content" />
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            <Icon name="times" size={20} color="#666" />
          </TouchableOpacity>
          <View style={styles.headerContent}>
            <Text style={styles.headerTitle}>ذاكرة المياه 💧</Text>
            <Text style={styles.headerSubtitle}>تعلم وحافظ على المياه</Text>
          </View>
          <TouchableOpacity
            style={styles.achievementButton}
            onPress={() => setShowAchievements(true)}
          >
            <Icon name="trophy" size={16} color="#F39C12" />
            <Text style={styles.achievementCount}>{achievements.size}</Text>
          </TouchableOpacity>
        </View>

        <View style={[styles.gameInfo, { borderColor: currentTheme.color }]}>
          <Text style={[styles.levelTitle, { color: currentTheme.color }]}>
            المستوى {currentLevel}: {currentTheme.title}
          </Text>
          <Text style={styles.difficulty}>الصعوبة: {currentTheme.difficulty}</Text>
          
          {showPreview && (
            <View style={styles.previewContainer}>
              <Text style={styles.previewText}>احفظ مواقع البطاقات!</Text>
              <Text style={styles.previewCountdown}>
                {Math.max(1, Math.ceil((2500 - currentLevel * 200) / 1000))} ثانية
              </Text>
              <Animated.View style={[
                styles.previewIndicator,
                {
                  opacity: previewAnimation,
                  transform: [{
                    scale: previewAnimation.interpolate({
                      inputRange: [0, 1],
                      outputRange: [0.8, 1.2]
                    })
                  }]
                }
              ]}>
                <Icon name="eye" size={24} color={currentTheme.color} />
              </Animated.View>
            </View>
          )}

          <View style={styles.statsRow}>
            <View style={styles.statItem}>
              <Icon name="puzzle-piece" size={16} color={currentTheme.color} />
              <Text style={styles.statLabel}>المطابقات</Text>
              <Text style={[styles.statValue, { color: currentTheme.color }]}>
                {matches}/{cards.length / 2}
              </Text>
            </View>
            <View style={styles.statItem}>
              <Icon name="clock-o" size={16} color="#E67E22" />
              <Text style={styles.statLabel}>الوقت</Text>
              <Text style={[styles.statValue, { color: '#E67E22' }]}>{currentTime}ث</Text>
            </View>
            <View style={styles.statItem}>
              <Icon name="times-circle" size={16} color="#E74C3C" />
              <Text style={styles.statLabel}>الأخطاء</Text>
              <Text style={[styles.statValue, { color: '#E74C3C' }]}>{mistakes}</Text>
            </View>
            <View style={styles.statItem}>
              <Icon name="star" size={16} color="#F39C12" />
              <Text style={styles.statLabel}>النقاط</Text>
              <Text style={[styles.statValue, { color: '#F39C12' }]}>{totalScore}</Text>
            </View>
          </View>

          <View style={styles.progressContainer}>
            <View style={styles.progressBar}>
              <View
                style={[
                  styles.progressFill,
                  {
                    width: `${progress}%`,
                    backgroundColor: currentTheme.color
                  }
                ]}
              />
            </View>
            <Text style={styles.progressText}>{Math.round(progress)}%</Text>
          </View>
        </View>

        <View style={styles.actionButtons}>
          <TouchableOpacity
            style={[styles.actionButton, { backgroundColor: '#2ECC71' }]}
            onPress={() => setShowTips(true)}
          >
            <Icon name="lightbulb-o" size={16} color="white" />
            <Text style={styles.actionButtonText}>نصائح المياه</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.actionButton, { backgroundColor: '#9B59B6' }]}
            onPress={() => setShowLevelSelect(true)}
          >
            <Icon name="list" size={16} color="white" />
            <Text style={styles.actionButtonText}>المستويات</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.actionButton, { backgroundColor: '#95A5A6' }]}
            onPress={resetGame}
          >
            <Icon name="refresh" size={16} color="white" />
            <Text style={styles.actionButtonText}>إعادة</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.gameBoard}>
          <View style={styles.cardsGrid}>
            {cards.map((card, index) => (
              <Animated.View
                key={card.id}
                style={[
                  styles.cardContainer,
                  {
                    transform: [{
                      scale: cardAnimation.interpolate({
                        inputRange: [0, 1],
                        outputRange: [0.8, 1]
                      })
                    }]
                  }
                ]}
              >
                <TouchableOpacity
                  style={[
                    styles.card,
                    card.isFlipped && styles.cardFlipped,
                    card.isMatched && [styles.cardMatched, { borderColor: '#2ECC71' }],
                    { borderColor: currentTheme.color }
                  ]}
                  onPress={() => handleCardPress(card)}
                  activeOpacity={0.8}
                >
                  {card.isFlipped || card.isMatched ? (
                    <Icon
                      name={card.symbol}
                      size={Math.min(width * 0.06, 28)}
                      color={card.isMatched ? '#2ECC71' : currentTheme.color}
                    />
                  ) : (
                    <Icon
                      name="tint"
                      size={Math.min(width * 0.05, 24)}
                      color={currentTheme.color + '40'}
                    />
                  )}
                </TouchableOpacity>
              </Animated.View>
            ))}
          </View>
        </View>

        {showMatchTip && (
          <Animated.View
            style={[
              styles.matchTipContainer,
              {
                opacity: tipAnimation,
                transform: [{
                  translateY: tipAnimation.interpolate({
                    inputRange: [0, 1],
                    outputRange: [50, 0]
                  })
                }]
              }
            ]}
          >
            <View style={[styles.matchTipContent, { borderColor: currentTheme.color }]}>
              <Icon name="info-circle" size={24} color={currentTheme.color} />
              <Text style={styles.matchTipText}>{currentMatchTip}</Text>
            </View>
          </Animated.View>
        )}

        {gameWon && (
          <Animated.View
            style={[
              styles.winContainer,
              {
                opacity: winAnimation,
                transform: [{
                  scale: winAnimation.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0.5, 1]
                  })
                }]
              }
            ]}
          >
            <View style={styles.winContent}>
              <Icon name="trophy" size={50} color="#F39C12" />
              <Text style={styles.winTitle}>مبروك! 🎉</Text>
              <Text style={styles.winDetails}>
                المستوى {currentLevel} مكتمل في {currentTime} ث
              </Text>
              <Text style={styles.winScore}>
                +{Math.max(20, (100 - mistakes * 10) * currentLevel)} نقطة
              </Text>
              <View style={styles.winButtons}>
                <TouchableOpacity
                  style={[styles.winButton, { backgroundColor: currentTheme.color }]}
                  onPress={resetGame}
                >
                  <Text style={styles.winButtonText}>إعادة</Text>
                </TouchableOpacity>
                {currentLevel < 5 && (
                  <TouchableOpacity
                    style={[styles.winButton, { backgroundColor: '#2ECC71' }]}
                    onPress={nextLevel}
                  >
                    <Text style={styles.winButtonText}>التالي →</Text>
                  </TouchableOpacity>
                )}
              </View>
            </View>
          </Animated.View>
        )}
      </ScrollView>

      <Modal
        visible={showLevelSelect}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setShowLevelSelect(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>اختر المستوى</Text>
              <TouchableOpacity onPress={() => setShowLevelSelect(false)}>
                <Icon name="times" size={24} color="#666" />
              </TouchableOpacity>
            </View>
            <ScrollView style={styles.levelsList}>
              {Object.keys(WATER_THEMES).map((level) => {
                const levelNum = parseInt(level);
                const theme = WATER_THEMES[levelNum];
                const isCompleted = completedLevels.has(levelNum);
                const isLocked = levelNum > 1 && !completedLevels.has(levelNum - 1);

                return (
                  <TouchableOpacity
                    key={level}
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
                      <Text style={[styles.levelNumber, { color: theme.color }]}>
                        {level}
                      </Text>
                      <View style={styles.levelDetails}>
                        <Text style={styles.levelName}>{theme.title}</Text>
                        <Text style={styles.levelDifficulty}>{theme.difficulty}</Text>
                        <Text style={styles.levelTarget}>الهدف: {theme.targetTime}ث</Text>
                      </View>
                    </View>
                    <View style={styles.levelStatus}>
                      {isCompleted && <Icon name="check-circle" size={20} color="#2ECC71" />}
                      {isLocked && <Icon name="lock" size={20} color="#95A5A6" />}
                      {currentLevel === levelNum && <Icon name="play" size={20} color={theme.color} />}
                    </View>
                  </TouchableOpacity>
                );
              })}
            </ScrollView>
          </View>
        </View>
      </Modal>

      <Modal
        visible={showTips}
        animationType="fade"
        transparent={true}
        onRequestClose={() => setShowTips(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>نصائح المحافظة على المياه</Text>
              <TouchableOpacity onPress={() => setShowTips(false)}>
                <Icon name="times" size={24} color="#666" />
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

      <Modal
        visible={showFact}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setShowFact(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={[styles.factModal, { borderColor: currentTheme.color }]}>
            <Icon name="info-circle" size={40} color={currentTheme.color} />
            <Text style={styles.factTitle}>هل تعلم؟</Text>
            <Text style={styles.factText}>{currentTheme.fact}</Text>
            <TouchableOpacity
              style={[styles.factButton, { backgroundColor: currentTheme.color }]}
              onPress={() => setShowFact(false)}
            >
              <Text style={styles.factButtonText}>رائع!</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      <Modal
        visible={showAchievements}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setShowAchievements(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>الإنجازات</Text>
              <TouchableOpacity onPress={() => setShowAchievements(false)}>
                <Icon name="times" size={24} color="#666" />
              </TouchableOpacity>
            </View>
            <ScrollView style={styles.achievementsList}>
              {Object.values(ACHIEVEMENTS).map(achievement => {
                const isUnlocked = achievements.has(achievement.id);
                return (
                  <View
                    key={achievement.id}
                    style={[
                      styles.achievementItem,
                      isUnlocked ? styles.achievementUnlocked : styles.achievementLocked
                    ]}
                  >
                    <View style={[
                      styles.achievementIcon,
                      { backgroundColor: isUnlocked ? achievement.color : '#BDC3C7' }
                    ]}>
                      <Icon
                        name={achievement.icon}
                        size={24}
                        color={isUnlocked ? 'white' : '#7F8C8D'}
                      />
                    </View>
                    <View style={styles.achievementInfo}>
                      <Text style={[
                        styles.achievementTitle,
                        { color: isUnlocked ? '#2C3E50' : '#95A5A6' }
                      ]}>
                        {achievement.title}
                      </Text>
                      <Text style={[
                        styles.achievementDesc,
                        { color: isUnlocked ? '#34495E' : '#BDC3C7' }
                      ]}>
                        {achievement.desc}
                      </Text>
                    </View>
                    {isUnlocked && (
                      <Icon name="check-circle" size={20} color="#2ECC71" />
                    )}
                  </View>
                );
              })}
            </ScrollView>
            <View style={styles.achievementProgress}>
              <Text style={styles.progressLabel}>
                التقدم: {achievements.size}/{Object.keys(ACHIEVEMENTS).length}
              </Text>
              <View style={styles.progressBar}>
                <View
                  style={[
                    styles.progressFill,
                    {
                      width: `${(achievements.size / Object.keys(ACHIEVEMENTS).length) * 100}%`,
                      backgroundColor: '#F39C12'
                    }
                  ]}
                />
              </View>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ECF0F1',
  },
  loadingText: {
    fontSize: 18,
    fontFamily: 'Tajawal-Bold',
    color: '#3498DB',
    marginTop: 15,
  },
  scrollContainer: {
    flexGrow: 1,
    padding: 15,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  backButton: {
    padding: 10,
    borderRadius: 20,
    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  headerContent: {
    flex: 1,
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 24,
    fontFamily: 'Tajawal-Bold',
    color: '#2C3E50',
    textAlign: 'center',
  },
  headerSubtitle: {
    fontSize: 14,
    fontFamily: 'Tajawal-Regular',
    color: '#7F8C8D',
    textAlign: 'center',
    marginTop: 2,
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
    elevation: 3,
  },
  achievementCount: {
    marginLeft: 5,
    fontSize: 12,
    fontFamily: 'Tajawal-Bold',
    color: '#F39C12',
  },
  gameInfo: {
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 15,
    borderWidth: 2,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 4,
  },
  levelTitle: {
    fontSize: 18,
    fontFamily: 'Tajawal-Bold',
    textAlign: 'center',
    marginBottom: 5,
  },
  difficulty: {
    fontSize: 14,
    fontFamily: 'Tajawal-Regular',
    color: '#7F8C8D',
    textAlign: 'center',
    marginBottom: 15,
  },
  previewContainer: {
    alignItems: 'center',
    marginBottom: 15,
    padding: 10,
    backgroundColor: '#F8F9FA',
    borderRadius: 10,
  },
  previewText: {
    fontSize: 16,
    fontFamily: 'Tajawal-Medium',
    color: '#2C3E50',
    marginBottom: 10,
  },
  previewCountdown: {
    fontSize: 20,
    fontFamily: 'Tajawal-Bold',
    color: '#E74C3C',
    marginBottom: 5,
  },
  previewIndicator: {
    padding: 10,
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 15,
  },
  statsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  statItem: {
    alignItems: 'center',
    flex: 1,
  },
  statLabel: {
    fontSize: 11,
    fontFamily: 'Tajawal-Regular',
    color: '#95A5A6',
    marginTop: 3,
    textAlign: 'center',
  },
  statValue: {
    fontSize: 16,
    fontFamily: 'Tajawal-Bold',
    marginTop: 2,
  },
  progressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  progressBar: {
    flex: 1,
    height: 8,
    backgroundColor: '#E0E0E0',
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    borderRadius: 4,
  },
  progressText: {
    marginLeft: 10,
    fontSize: 12,
    fontFamily: 'Tajawal-Bold',
    color: '#7F8C8D',
  },
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
  },
  actionButtonText: {
    color: 'white',
    marginLeft: 6,
    fontSize: 12,
    fontFamily: 'Tajawal-Bold',
  },
  gameBoard: {
    alignItems: 'center',
    marginBottom: 20,
  },
  cardsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    maxWidth: width * 0.9,
  },
  cardContainer: {
    margin: width * 0.015,
  },
  card: {
    width: width * 0.18,
    height: width * 0.18,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 10,
    borderWidth: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.15,
    shadowRadius: 6,
    elevation: 5,
  },
  cardFlipped: {
    backgroundColor: '#F8F9FA',
  },
  cardMatched: {
    backgroundColor: '#D5EDDA',
    borderWidth: 3,
  },
  matchTipContainer: {
    position: 'absolute',
    top: height * 0.4,
    left: 20,
    right: 20,
    alignItems: 'center',
    zIndex: 1000,
  },
  matchTipContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 15,
    borderWidth: 2,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
    maxWidth: '95%',
  },
  matchTipText: {
    fontSize: 14,
    fontFamily: 'Tajawal-Medium',
    color: '#2C3E50',
    marginLeft: 15,
    flex: 1,
    textAlign: 'right',
    lineHeight: 22,
  },
  winContainer: {
    position: 'absolute',
    top: 50,
    left: 20,
    right: 20,
    alignItems: 'center',
  },
  winContent: {
    backgroundColor: 'white',
    padding: 25,
    borderRadius: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 10,
  },
  winTitle: {
    fontSize: 22,
    fontFamily: 'Tajawal-Bold',
    color: '#2ECC71',
    marginTop: 10,
    marginBottom: 5,
  },
  winDetails: {
    fontSize: 14,
    fontFamily: 'Tajawal-Regular',
    color: '#7F8C8D',
    textAlign: 'center',
    marginBottom: 5,
  },
  winScore: {
    fontSize: 18,
    fontFamily: 'Tajawal-Bold',
    color: '#F39C12',
    marginBottom: 15,
  },
  winButtons: {
    flexDirection: 'row',
    gap: 15,
  },
  winButton: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
    minWidth: 80,
  },
  winButtonText: {
    color: 'white',
    fontFamily: 'Tajawal-Bold',
    textAlign: 'center',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
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
    elevation: 8,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  modalTitle: {
    fontSize: 18,
    fontFamily: 'Tajawal-Bold',
    color: '#2C3E50',
  },
  levelsList: {
    maxHeight: 400,
  },
  levelItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    borderRadius: 10,
    borderWidth: 1,
    marginBottom: 10,
    backgroundColor: '#F8F9FA',
  },
  levelLocked: {
    opacity: 0.5,
  },
  levelCurrent: {
    backgroundColor: '#E8F5E8',
  },
  levelInfo: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  levelNumber: {
    fontSize: 24,
    fontFamily: 'Tajawal-Bold',
    marginRight: 15,
    width: 30,
    textAlign: 'center',
  },
  levelDetails: {
    flex: 1,
  },
  levelName: {
    fontSize: 14,
    fontFamily: 'Tajawal-Bold',
    color: '#2C3E50',
  },
  levelDifficulty: {
    fontSize: 12,
    fontFamily: 'Tajawal-Regular',
    color: '#7F8C8D',
    marginTop: 2,
  },
  levelTarget: {
    fontSize: 11,
    fontFamily: 'Tajawal-Regular',
    color: '#95A5A6',
    marginTop: 1,
  },
  levelStatus: {
    width: 30,
    alignItems: 'center',
  },
  tipsList: {
    maxHeight: 350,
  },
  tipItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    padding: 15,
    marginBottom: 10,
    backgroundColor: '#F8F9FA',
    borderRadius: 10,
    borderLeftWidth: 4,
  },
  tipNumber: {
    width: 24,
    height: 24,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  tipNumberText: {
    color: 'white',
    fontSize: 12,
    fontFamily: 'Tajawal-Bold',
  },
  tipText: {
    flex: 1,
    fontSize: 14,
    fontFamily: 'Tajawal-Regular',
    color: '#2C3E50',
    lineHeight: 20,
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
    elevation: 10,
  },
  factTitle: {
    fontSize: 20,
    fontFamily: 'Tajawal-Bold',
    color: '#2C3E50',
    marginTop: 10,
    marginBottom: 15,
  },
  factText: {
    fontSize: 16,
    fontFamily: 'Tajawal-Regular',
    color: '#34495E',
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: 20,
  },
  factButton: {
    paddingHorizontal: 30,
    paddingVertical: 12,
    borderRadius: 25,
  },
  factButtonText: {
    color: 'white',
    fontSize: 16,
    fontFamily: 'Tajawal-Bold',
  },
  achievementsList: {
    maxHeight: 350,
  },
  achievementItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
  },
  achievementUnlocked: {
    backgroundColor: '#FFF3CD',
    borderColor: '#F39C12',
    borderWidth: 1,
  },
  achievementLocked: {
    backgroundColor: '#F8F9FA',
    borderColor: '#E0E0E0',
    borderWidth: 1,
  },
  achievementIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  achievementInfo: {
    flex: 1,
  },
  achievementTitle: {
    fontSize: 14,
    fontFamily: 'Tajawal-Bold',
  },
  achievementDesc: {
    fontSize: 12,
    fontFamily: 'Tajawal-Regular',
    marginTop: 2,
  },
  achievementProgress: {
    marginTop: 15,
    alignItems: 'center',
  },
  progressLabel: {
    fontSize: 14,
    fontFamily: 'Tajawal-Bold',
    color: '#2C3E50',
    marginBottom: 8,
  },
});

export default WaterMemoryGame;