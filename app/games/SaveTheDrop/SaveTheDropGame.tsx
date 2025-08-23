import React, { useState, useEffect, useCallback, useRef } from 'react';
import {
  Dimensions,
  StyleSheet,
} from 'react-native';
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { StartScreen } from './components/StartScreen';
import { GameScreen } from './components/GameScreen';
import { LevelCompleteModal } from './components/LevelCompleteModal';
import { Drop } from './types/GameTypes';
import { educationalContent } from './data/WaterFacts';
import { gameConfig } from './config/GameConfig';

const { width: screenWidth } = Dimensions.get('window');

export const SaveTheDropGame: React.FC = () => {
  const [gameState, setGameState] = useState<'start' | 'playing' | 'levelComplete'>('start');
  const [currentLevel, setCurrentLevel] = useState<number>(1);
  const [score, setScore] = useState<number>(0);
  const [waterCollected, setWaterCollected] = useState<number>(0);
  const [pollutedWaterCollected, setPollutedWaterCollected] = useState<number>(0);
  const [drops, setDrops] = useState<Drop[]>([]);
  const [dropIdCounter, setDropIdCounter] = useState<number>(0);
  const [levelCompleteData, setLevelCompleteData] = useState<any>(null);

  const dropSpawnInterval = useRef<ReturnType<typeof setInterval> | null>(null);
  const dropMoveInterval = useRef<ReturnType<typeof setInterval> | null>(null);
  const lastSpawnPositions = useRef<{x: number, time: number}[]>([]);

  useEffect(() => {
    const loadProgress = async () => {
      const savedLevel = await AsyncStorage.getItem('currentLevel');
      if (savedLevel) setCurrentLevel(parseInt(savedLevel, 10));
    };
    loadProgress();
  }, []);

  const getCurrentSettings = useCallback(() => {
    const levelMultiplier = currentLevel - 1;
    return {
      dropSpeed: gameConfig.initialDropSpeed + (levelMultiplier * 1.2),
      spawnRate: Math.max(
        gameConfig.initialSpawnRate - (levelMultiplier * 500),
        gameConfig.minSpawnRate
      ),
      pollutedDropChance: Math.min(0.15 + (levelMultiplier * 0.08), 0.45),
      waterTarget: gameConfig.baseWaterTarget + (levelMultiplier * 8),
    };
  }, [currentLevel]);

  const startGame = useCallback(() => {
    setGameState('playing');
    setScore(0);
    setWaterCollected(0);
    setPollutedWaterCollected(0);
    setDrops([]);
    setDropIdCounter(0);
    lastSpawnPositions.current = [];
  }, []);

  const completeLevel = useCallback(async () => {
    if (dropSpawnInterval.current) clearInterval(dropSpawnInterval.current);
    if (dropMoveInterval.current) clearInterval(dropMoveInterval.current);

    const settings = getCurrentSettings();
    const totalWater = waterCollected + pollutedWaterCollected;
    const cleanWaterPercentage = totalWater > 0 ? Math.round((waterCollected / totalWater) * 100) : 100;
    const canAdvance = cleanWaterPercentage >= 70;
    const randomContent = educationalContent[Math.floor(Math.random() * educationalContent.length)];

    if (canAdvance) {
      await AsyncStorage.setItem('currentLevel', (currentLevel + 1).toString());
    }

    setLevelCompleteData({
      level: currentLevel,
      score,
      waterCollected,
      pollutedWaterCollected,
      totalWater,
      waterTarget: settings.waterTarget,
      cleanWaterPercentage,
      canAdvance,
      content: randomContent,
    });
    setGameState('levelComplete');
  }, [currentLevel, score, waterCollected, pollutedWaterCollected, getCurrentSettings]);

  const nextLevel = useCallback(() => {
    setCurrentLevel(prev => prev + 1);
    startGame();
  }, [startGame]);

  const retryLevel = useCallback(() => {
    startGame();
  }, [startGame]);

  const generateSafeSpawnPosition = useCallback(() => {
    const currentTime = Date.now();
    const minDistance = 80;
    const maxAttempts = 10;
    lastSpawnPositions.current = lastSpawnPositions.current.filter(
      pos => currentTime - pos.time < 2000
    );
    for (let attempt = 0; attempt < maxAttempts; attempt++) {
      const x = Math.random() * (screenWidth - gameConfig.dropSize - 140);
      const tooClose = lastSpawnPositions.current.some(pos =>
        Math.abs(pos.x - x) < minDistance
      );
      if (!tooClose) {
        lastSpawnPositions.current.push({ x, time: currentTime });
        return x;
      }
    }
    const fallbackX = Math.random() * (screenWidth - gameConfig.dropSize - 140);
    lastSpawnPositions.current.push({ x: fallbackX, time: currentTime });
    return fallbackX;
  }, []);

  const spawnDrop = useCallback(() => {
    const settings = getCurrentSettings();
    const isPolluted = Math.random() < settings.pollutedDropChance;
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
  }, [dropIdCounter, getCurrentSettings, generateSafeSpawnPosition]);

  const moveDrops = useCallback(() => {
    const settings = getCurrentSettings();
    setDrops(prevDrops => {
      const updatedDrops: Drop[] = [];
      prevDrops.forEach(drop => {
        const newY = drop.y + settings.dropSpeed;
        if (newY < gameConfig.drainY - gameConfig.dropSize) {
          updatedDrops.push({ ...drop, y: newY });
        }
      });
      return updatedDrops;
    });
  }, [getCurrentSettings]);

  const onDropTap = useCallback((dropId: number) => {
    const tappedDrop = drops.find(drop => drop.id === dropId);
    if (!tappedDrop) return;
    setDrops(prevDrops => prevDrops.filter(drop => drop.id !== dropId));
    if (tappedDrop.isPolluted) {
      setPollutedWaterCollected(prev => prev + 1);
      setScore(prev => Math.max(0, prev - 5));
    } else {
      setWaterCollected(prev => prev + 1);
      setScore(prev => prev + 10);
    }
  }, [drops]);

  useEffect(() => {
    const settings = getCurrentSettings();
    const totalWater = waterCollected + pollutedWaterCollected;
    if (totalWater >= settings.waterTarget && gameState === 'playing') {
      setTimeout(completeLevel, 500);
    }
  }, [waterCollected, pollutedWaterCollected, gameState, getCurrentSettings, completeLevel]);

  useEffect(() => {
    if (gameState !== 'playing') return;
    const settings = getCurrentSettings();
    const spawnInterval = setInterval(spawnDrop, settings.spawnRate) as unknown as ReturnType<typeof setInterval>;
    dropSpawnInterval.current = spawnInterval;
    const moveInterval = setInterval(moveDrops, gameConfig.gameLoopSpeed) as unknown as ReturnType<typeof setInterval>;
    dropMoveInterval.current = moveInterval;
    return () => {
      if (spawnInterval) clearInterval(spawnInterval);
      if (moveInterval) clearInterval(moveInterval);
    };
  }, [gameState, spawnDrop, moveDrops, getCurrentSettings]);

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        {gameState === 'start' && (
          <StartScreen onStartGame={startGame} />
        )}
        {gameState === 'playing' && (
          <GameScreen
            currentLevel={currentLevel}
            score={score}
            waterCollected={waterCollected}
            pollutedWaterCollected={pollutedWaterCollected}
            waterTarget={getCurrentSettings().waterTarget}
            drops={drops}
            onDropTap={onDropTap}
            onLeaveGame={() => setGameState('start')}
          />
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
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#87CEEB',
  },
});

export default SaveTheDropGame;
