import React, { useState, useEffect, useCallback, useRef} from 'react';
import {
  Dimensions,
  StyleSheet,
  AppState,
  BackHandler,
  TouchableOpacity,
  View,
  Text,
} from 'react-native';
import { Platform, StatusBar } from 'react-native';
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';
import { StartScreen } from './components/StartScreen';
import { GameScreen } from './components/GameScreen';
import { LevelCompleteModal } from './components/LevelCompleteModal';
import { Drop } from './types/GameTypes';
import { educationalContent } from './data/WaterFacts';
import { gameConfig } from './config/GameConfig';
import { Audio } from 'expo-av';
import { Pause, Play, Volume2, VolumeX } from 'lucide-react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';


const { width: screenWidth } = Dimensions.get('window');
const LEVEL_KEY = '@current_level';
const soundFiles = {
  collect: require('../../../assets/sounds/correct.mp3'),
  wrong: require('../../../assets/sounds/wrong.wav'),
  drop: require('../../../assets/sounds/drop.wav'),
  success: require('../../../assets/sounds/122255__jivatma07__level_complete.wav'),
  levelUp: require('../../../assets/sounds/levelup.wav'),
  fail: require('../../../assets/sounds/677855__el_boss__game-fail-fanfare.wav'),
  warning: require('../../../assets/sounds/warning.wav'),
};

const playGameSound = async (type: keyof typeof soundFiles, muted: boolean) => {
  if (muted) return;
  try {
    const { sound } = await Audio.Sound.createAsync(soundFiles[type]);
    await sound.playAsync();
    sound.setOnPlaybackStatusUpdate((status) => {
      if ('didJustFinish' in status && status.didJustFinish) {
        sound.unloadAsync();
      }
    });
  } catch {}
};

export const SaveTheDropGame: React.FC = () => {
  const [gameState, setGameState] = useState<'start' | 'playing' | 'levelComplete' | 'gameOver'>('start');
  const [currentLevel, setCurrentLevel] = useState(1);
  const [score, setScore] = useState(0);
  const [waterCollected, setWaterCollected] = useState(0);
  const [pollutedWaterCollected, setPollutedWaterCollected] = useState(0);
  const [droppedCleanWater, setDroppedCleanWater] = useState(0);
  const [drops, setDrops] = useState<Drop[]>([]);
  const [dropIdCounter, setDropIdCounter] = useState(0);
  const [levelCompleteData, setLevelCompleteData] = useState<any>(null);
  const [combo, setCombo] = useState(0);
  const [maxCombo, setMaxCombo] = useState(0);
  const [perfectStreak, setPerfectStreak] = useState(0);
  const [totalDropsTapped, setTotalDropsTapped] = useState(0);
  const [gameStartTime, setGameStartTime] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [muted, setMuted] = useState(false);

  const dropSpawnInterval = useRef<number | null>(null);
  const dropMoveInterval = useRef<number | null>(null);
  const comboResetTimeout = useRef<number | null>(null);
  const lastSpawnPositions = useRef<{ x: number; time: number }[]>([]);
  const appStateRef = useRef(AppState.currentState);
  

  // 🔄 Pause/Resume toggle
  const togglePause = useCallback((forcePause = false) => {
    if (gameState !== 'playing') return;

    if (!isPaused && !forcePause) {
      // Pause
      setIsPaused(true);
      if (dropSpawnInterval.current) {
        clearInterval(dropSpawnInterval.current);
        dropSpawnInterval.current = null;
      }
      if (dropMoveInterval.current) {
        clearInterval(dropMoveInterval.current);
        dropMoveInterval.current = null;
      }
    } else if (isPaused && !forcePause) {
      // Resume
      setIsPaused(false);
      const settings = getCurrentSettings();
      dropSpawnInterval.current = setInterval(spawnDrop, settings.spawnRate) as unknown as number;
      dropMoveInterval.current = setInterval(moveDrops, gameConfig.gameLoopSpeed) as unknown as number;
    } else if (forcePause) {
      // Force pause
      setIsPaused(true);
      if (dropSpawnInterval.current) {
        clearInterval(dropSpawnInterval.current);
        dropSpawnInterval.current = null;
      }
      if (dropMoveInterval.current) {
        clearInterval(dropMoveInterval.current);
        dropMoveInterval.current = null;
      }
    }
  }, [gameState, isPaused]);

  useEffect(() => {
    const subscription = AppState.addEventListener('change', (nextAppState) => {
      if (appStateRef.current.match(/inactive|background/) && nextAppState === 'active') {
      } else if (nextAppState.match(/inactive|background/)) {
        if (gameState === 'playing' && !isPaused) {
          togglePause(true);
        }
      }
      appStateRef.current = nextAppState;
    });
    return () => subscription?.remove();
  }, [gameState, isPaused, togglePause]);

  useEffect(() => {
    const backAction = () => {
      if (gameState === 'playing') {
        setGameState('start');
        return true;
      }
      return false;
    };
    const backHandler = BackHandler.addEventListener('hardwareBackPress', backAction);
    return () => backHandler.remove();
  }, [gameState]);
  useEffect(() => {
    const loadLevel = async () => {
      try {
        const savedLevel = await AsyncStorage.getItem(LEVEL_KEY);
        if (savedLevel) setCurrentLevel(Number(savedLevel));
      } catch (e) {
        console.log('Erreur chargement niveau', e);
      }
    };
    loadLevel();
  }, []);

  // Sauvegarder le niveau à chaque changement
  useEffect(() => {
    const saveLevel = async () => {
      try {
        await AsyncStorage.setItem(LEVEL_KEY, String(currentLevel));
      } catch (e) {
        console.log('Erreur sauvegarde niveau', e);
      }
    };
    saveLevel();
  }, [currentLevel]);

  const getCurrentSettings = useCallback(() => {
    const levelMultiplier = currentLevel - 1;
    return {
      dropSpeed: gameConfig.initialDropSpeed + levelMultiplier * 0.8,
      spawnRate: Math.max(gameConfig.initialSpawnRate - levelMultiplier * 300, gameConfig.minSpawnRate),
      pollutedDropChance: Math.min(0.1 + levelMultiplier * 0.05, 0.35),
      waterTarget: gameConfig.baseWaterTarget + levelMultiplier * 5,
      maxDroppedCleanWater: Math.max(3 + Math.floor(levelMultiplier / 2), 6),
      comboBonus: Math.floor(levelMultiplier / 2) + 1,
    };
  }, [currentLevel]);

  const updateCombo = useCallback(
    (isCleanTap: boolean) => {
      if (isCleanTap) {
        setCombo((prev) => {
          const newCombo = prev + 1;
          setMaxCombo((current) => Math.max(current, newCombo));
          if (newCombo >= 5) {
            const bonusPoints = newCombo * 2;
            setScore((prevScore) => prevScore + bonusPoints);
            if (newCombo % 10 === 0) playGameSound('success', muted);
          }
          return newCombo;
        });
        if (comboResetTimeout.current) clearTimeout(comboResetTimeout.current);
        comboResetTimeout.current = setTimeout(() => setCombo(0), 3000) as unknown as number;
      } else {
        setCombo(0);
        if (comboResetTimeout.current) {
          clearTimeout(comboResetTimeout.current);
          comboResetTimeout.current = null;
        }
      }
    },
    [muted]
  );

  const startGame = useCallback(() => {
    setGameState('playing');
    setScore(0);
    setWaterCollected(0);
    setPollutedWaterCollected(0);
    setDroppedCleanWater(0);
    setDrops([]);
    setDropIdCounter(0);
    setCombo(0);
    setMaxCombo(0);
    setPerfectStreak(0);
    setTotalDropsTapped(0);
    setGameStartTime(Date.now());
    setIsPaused(false);
    lastSpawnPositions.current = [];
    if (comboResetTimeout.current) {
      clearTimeout(comboResetTimeout.current);
      comboResetTimeout.current = null;
    }
  }, []);

  const gameOver = useCallback(() => {
    if (dropSpawnInterval.current) clearInterval(dropSpawnInterval.current);
    if (dropMoveInterval.current) clearInterval(dropMoveInterval.current);
    if (comboResetTimeout.current) clearTimeout(comboResetTimeout.current);

    playGameSound('fail', muted);
    const settings = getCurrentSettings();
    const totalWater = waterCollected + pollutedWaterCollected;
    const cleanWaterPercentage = totalWater > 0 ? Math.round((waterCollected / totalWater) * 100) : 100;
    const playTime = Math.floor((Date.now() - gameStartTime) / 1000);
    const accuracy = totalDropsTapped > 0 ? Math.round((waterCollected / totalDropsTapped) * 100) : 100;
    const randomContent = educationalContent[Math.floor(Math.random() * educationalContent.length)];

    setLevelCompleteData({
      level: currentLevel,
      score,
      waterCollected,
      pollutedWaterCollected,
      totalWater,
      waterTarget: settings.waterTarget,
      cleanWaterPercentage,
      canAdvance: false,
      droppedCleanWater,
      isGameOver: true,
      content: randomContent,
      maxCombo,
      perfectStreak,
      playTime,
      accuracy,
      totalDropsTapped,
    });

    setGameState('levelComplete');
  }, [currentLevel, score, waterCollected, pollutedWaterCollected, droppedCleanWater, getCurrentSettings, maxCombo, perfectStreak, gameStartTime, totalDropsTapped, muted]);

  const completeLevel = useCallback(() => {
    if (dropSpawnInterval.current) clearInterval(dropSpawnInterval.current);
    if (dropMoveInterval.current) clearInterval(dropMoveInterval.current);
    if (comboResetTimeout.current) clearTimeout(comboResetTimeout.current);

    playGameSound('levelUp', muted);

    const settings = getCurrentSettings();
    const totalWater = waterCollected + pollutedWaterCollected;
    const cleanWaterPercentage = totalWater > 0 ? Math.round((waterCollected / totalWater) * 100) : 100;
    const canAdvance = cleanWaterPercentage >= 75;
    const playTime = Math.floor((Date.now() - gameStartTime) / 1000);
    const accuracy = totalDropsTapped > 0 ? Math.round((waterCollected / totalDropsTapped) * 100) : 100;

    let levelBonus = 0;
    if (cleanWaterPercentage >= 95 && droppedCleanWater === 0) {
      levelBonus = 100 * currentLevel;
      setScore(prev => prev + levelBonus);
      setPerfectStreak(prev => prev + 1);
    } else {
      setPerfectStreak(0);
    }

    const randomContent = educationalContent[Math.floor(Math.random() * educationalContent.length)];
    

    setLevelCompleteData({
      level: currentLevel,
      score: score + levelBonus,
      waterCollected,
      pollutedWaterCollected,
      totalWater,
      waterTarget: settings.waterTarget,
      cleanWaterPercentage,
      canAdvance,
      droppedCleanWater,
      isGameOver: false,
      content: randomContent,
      maxCombo,
      perfectStreak,
      playTime,
      accuracy,
      totalDropsTapped,
      levelBonus,
    });

    setGameState('levelComplete');
  }, [currentLevel, score, waterCollected, pollutedWaterCollected, droppedCleanWater, getCurrentSettings, maxCombo, perfectStreak, gameStartTime, totalDropsTapped, muted]);

  const nextLevel = useCallback(() => {
    setCurrentLevel(prev => prev + 1);
    startGame();
  }, [startGame]);

  const resetProgression = async () => {
    setCurrentLevel(1);
    await AsyncStorage.removeItem(LEVEL_KEY);
  };

  const retryLevel = useCallback(() => {
    startGame();
  }, [startGame]);

  const generateSafeSpawnPosition = useCallback(() => {
    const currentTime = Date.now();
    const minDistance = 70;
    const maxAttempts = 15;
    const containerSpace = 140;
    const availableWidth = screenWidth - gameConfig.dropSize - containerSpace;

    lastSpawnPositions.current = lastSpawnPositions.current.filter(pos => currentTime - pos.time < 1500);

    for (let attempt = 0; attempt < maxAttempts; attempt++) {
      const x = Math.random() * availableWidth;
      const tooClose = lastSpawnPositions.current.some(pos => Math.abs(pos.x - x) < minDistance);
      if (!tooClose) {
        lastSpawnPositions.current.push({ x, time: currentTime });
        return x;
      }
    }

    const fallbackX = Math.random() * availableWidth;
    lastSpawnPositions.current.push({ x: fallbackX, time: currentTime });
    return fallbackX;
  }, []);

  const spawnDrop = useCallback(() => {
    if (isPaused) return;

    const settings = getCurrentSettings();
    const shouldSpawnPolluted = Math.random() < settings.pollutedDropChance;
    const isPolluted = shouldSpawnPolluted && Math.random() > 0.1;
    const x = generateSafeSpawnPosition();

    const newDrop: Drop = {
      id: dropIdCounter,
      x,
      y: gameConfig.faucetY + 60,
      size: gameConfig.dropSize,
      isPolluted,
    };

    setDrops(prevDrops => [...prevDrops, newDrop]);
    setDropIdCounter(prev => prev + 1);
  }, [dropIdCounter, getCurrentSettings, generateSafeSpawnPosition, isPaused]);

  const moveDrops = useCallback(() => {
    if (isPaused) return;

    const settings = getCurrentSettings();

    setDrops(prevDrops => {
      const updatedDrops: Drop[] = [];
      const totalWater = waterCollected + pollutedWaterCollected;
      const shouldStopCounting = totalWater >= settings.waterTarget || droppedCleanWater >= settings.maxDroppedCleanWater;

      prevDrops.forEach(drop => {
        const newY = drop.y + settings.dropSpeed;
        if (newY >= gameConfig.drainY - gameConfig.dropSize) {
          if (!drop.isPolluted && !shouldStopCounting) {
            setDroppedCleanWater(prev => prev + 1);
            playGameSound('drop', muted);

            const newDroppedCount = droppedCleanWater + 1;
            if (newDroppedCount >= settings.maxDroppedCleanWater - 1) {
              playGameSound('warning', muted);
            }
          }
        } else {
          updatedDrops.push({ ...drop, y: newY });
        }
      });

      return updatedDrops;
    });
  }, [getCurrentSettings, waterCollected, pollutedWaterCollected, droppedCleanWater, isPaused, muted]);

  const onDropTap = useCallback((dropId: number) => {
    if (isPaused) return;

    const settings = getCurrentSettings();
    const tappedDrop = drops.find(drop => drop.id === dropId);
    if (!tappedDrop) return;

    const totalWater = waterCollected + pollutedWaterCollected;
    const shouldStopCollecting = totalWater >= settings.waterTarget || droppedCleanWater >= settings.maxDroppedCleanWater;
    if (shouldStopCollecting) return;

    setDrops(prev => prev.filter(d => d.id !== dropId));
    setTotalDropsTapped(prev => prev + 1);

    if (tappedDrop.isPolluted) {
      setPollutedWaterCollected(prev => prev + 1);
      setScore(prev => Math.max(0, prev - 8));
      updateCombo(false);
      playGameSound('wrong', muted);
    } else {
      setWaterCollected(prev => prev + 1);
      const basePoints = 10;
      const comboMultiplier = Math.floor(combo / 5) + 1;
      setScore(prev => prev + basePoints * comboMultiplier);
      updateCombo(true);
      playGameSound('collect', muted);
    }
  }, [drops, waterCollected, pollutedWaterCollected, droppedCleanWater, getCurrentSettings, isPaused, combo, updateCombo, muted]);

  useEffect(() => {
    const settings = getCurrentSettings();
    const totalWater = waterCollected + pollutedWaterCollected;

    if (gameState === 'playing' && !isPaused) {
      if (droppedCleanWater >= settings.maxDroppedCleanWater) setTimeout(gameOver, 300);
      else if (totalWater >= settings.waterTarget) setTimeout(completeLevel, 300);
    }
  }, [waterCollected, pollutedWaterCollected, droppedCleanWater, gameState, getCurrentSettings, completeLevel, gameOver, isPaused]);

  useEffect(() => {
    if (gameState !== 'playing' || isPaused) {
      if (dropSpawnInterval.current) clearInterval(dropSpawnInterval.current);
      if (dropMoveInterval.current) clearInterval(dropMoveInterval.current);
      return;
    }

    const settings = getCurrentSettings();
    dropSpawnInterval.current = setInterval(spawnDrop, settings.spawnRate) as unknown as number;
    dropMoveInterval.current = setInterval(moveDrops, gameConfig.gameLoopSpeed) as unknown as number;

    return () => {
      if (dropSpawnInterval.current) clearInterval(dropSpawnInterval.current);
      if (dropMoveInterval.current) clearInterval(dropMoveInterval.current);
    };
  }, [gameState, isPaused, spawnDrop, moveDrops, getCurrentSettings]);
  const MAX_POLLUTED_BEFORE_RETRY = 3;
  const [showPollutionModal, setShowPollutionModal] = useState(false);
useEffect(() => {
  if (gameState !== 'playing') return;

  if (pollutedWaterCollected >= MAX_POLLUTED_BEFORE_RETRY) {
    // Arrêter le jeu
    if (dropSpawnInterval.current) clearInterval(dropSpawnInterval.current);
    if (dropMoveInterval.current) clearInterval(dropMoveInterval.current);
    if (comboResetTimeout.current) clearTimeout(comboResetTimeout.current);

    // Afficher le modal éducatif
    setShowPollutionModal(true);

    playGameSound('warning', muted); // optionnel : son d’alerte
  }
}, [pollutedWaterCollected, gameState, muted]);



  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        {gameState === 'start' && <StartScreen onStartGame={startGame} />}
        {gameState === 'playing' && (
          <>
            <View style={styles.topBar}>
  <TouchableOpacity onPress={() => togglePause()} style={styles.iconBtn}>
    {isPaused ? <Play size={23} color="#fff" /> : <Pause size={23} color="#fff" />}
  </TouchableOpacity>
  <TouchableOpacity onPress={() => setMuted(m => !m)} style={styles.iconBtn}>
    {muted ? <VolumeX size={23} color="#fff" /> : <Volume2 size={23} color="#fff" />}
  </TouchableOpacity>
</View>

            <GameScreen
              currentLevel={currentLevel}
              score={score}
              waterCollected={waterCollected}
              pollutedWaterCollected={pollutedWaterCollected}
              waterTarget={getCurrentSettings().waterTarget}
              droppedCleanWater={droppedCleanWater}
              maxDroppedCleanWater={getCurrentSettings().maxDroppedCleanWater}
              drops={drops}
              onDropTap={onDropTap}
              onLeaveGame={() => setGameState('start')}
              combo={combo}
              isPaused={isPaused}
            />
          </>
        )}
        {gameState === 'levelComplete' && levelCompleteData && (
          <LevelCompleteModal
            visible={true}
            data={levelCompleteData}
            onNextLevel={nextLevel}
            onRetryLevel={retryLevel}
            onBackToMenu={() => setGameState('start')}
          />
        )}
        {showPollutionModal && (
  <View style={{
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.6)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    zIndex: 999,
  }}>
    <View style={{
      backgroundColor: '#fff',
      borderRadius: 12,
      padding: 20,
      alignItems: 'center',
    }}>
      <Text style={{ fontSize: 18, fontFamily: 'Tajawal-Medium', textAlign: 'center', marginBottom: 20,lineHeight: 26 }}>
       ⚠️ لقد تم جمع عدد كبير من القطرات الملوثة ! احرص على جمع الماء النظيف للحفاظ على صحتك وصحة البيئة.
      </Text>
      <TouchableOpacity
        onPress={() => {
          setShowPollutionModal(false);
          retryLevel(); // relancer le niveau
        }}
        style={{
          backgroundColor: '#3498db',
          paddingVertical: 12,
          paddingHorizontal: 30,
          borderRadius: 8,
        }}
      >
        <Text style={{ color: '#fff', fontFamily: 'Tajawal-Bold', fontSize: 16 }}>إعادة اللعب</Text>
      </TouchableOpacity>
    </View>
  </View>
)}

        
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#87CEEB' },
  topBar: {
    position: 'absolute',
    top: Platform.OS === 'ios' ? 60 : StatusBar.currentHeight! + 22, // prend en compte la barre iOS / Android
    right: 10,
    flexDirection: 'row',
    zIndex: 10,
  },
  iconBtn: {
    marginLeft: 9,
    padding: 10,
    backgroundColor: 'rgba(0,0,0,0.4)', // légèrement plus visible
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default SaveTheDropGame;
