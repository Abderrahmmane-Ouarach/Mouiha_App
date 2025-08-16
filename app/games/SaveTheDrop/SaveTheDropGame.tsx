// SaveTheDropGame.tsx
import React, { useState, useEffect, useCallback, useRef } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Dimensions,
  StatusBar,
  StyleSheet,
} from 'react-native';
import { StartScreen } from './components/StartScreen';
import { GameScreen } from './components/GameScreen';
import { LevelCompleteModal } from './components/LevelCompleteModal';
import { Drop } from './types/GameTypes';
import { educationalContent } from './data/WaterFacts';
import { gameConfig } from './config/GameConfig';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

export const SaveTheDropGame: React.FC = () => {
  // Game state
  const [gameState, setGameState] = useState<'start' | 'playing' | 'levelComplete'>('start');
  const [currentLevel, setCurrentLevel] = useState<number>(1);
  const [score, setScore] = useState<number>(0);
  const [waterCollected, setWaterCollected] = useState<number>(0);
  const [pollutedWaterCollected, setPollutedWaterCollected] = useState<number>(0);
  const [drops, setDrops] = useState<Drop[]>([]);
  const [dropIdCounter, setDropIdCounter] = useState<number>(0);
  const [levelCompleteData, setLevelCompleteData] = useState<any>(null);

  // Game intervals
  const dropSpawnInterval = useRef<NodeJS.Timeout | null>(null);
  const dropMoveInterval = useRef<NodeJS.Timeout | null>(null);

  // Calculate current game settings based on level
  const getCurrentSettings = useCallback(() => {
    const levelMultiplier = currentLevel - 1;
    return {
      dropSpeed: gameConfig.initialDropSpeed + (levelMultiplier * 1.2),
      spawnRate: Math.max(
        gameConfig.initialSpawnRate - (levelMultiplier * 300),
        gameConfig.minSpawnRate
      ),
      pollutedDropChance: Math.min(0.15 + (levelMultiplier * 0.1), 0.5),
      waterTarget: gameConfig.baseWaterTarget + (levelMultiplier * 8),
      dropsPerSpawn: Math.min(1 + Math.floor(levelMultiplier / 2), 4), // More drops per spawn as level increases
    };
  }, [currentLevel]);

  // Start the game
  const startGame = useCallback(() => {
    setGameState('playing');
    setScore(0);
    setWaterCollected(0);
    setPollutedWaterCollected(0);
    setDrops([]);
    setDropIdCounter(0);
  }, []);

  // Complete current level
  const completeLevel = useCallback(() => {
    // Clear intervals
    if (dropSpawnInterval.current) clearInterval(dropSpawnInterval.current);
    if (dropMoveInterval.current) clearInterval(dropMoveInterval.current);
    
    // Calculate level completion data
    const settings = getCurrentSettings();
    const totalWater = waterCollected + pollutedWaterCollected;
    const cleanWaterPercentage = totalWater > 0 ? Math.round((waterCollected / totalWater) * 100) : 100;
    const canAdvance = cleanWaterPercentage >= 70; // 70% clean water required to advance
    const randomContent = educationalContent[Math.floor(Math.random() * educationalContent.length)];
    
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

  // Go to next level
  const nextLevel = useCallback(() => {
    setCurrentLevel(prev => prev + 1);
    startGame();
  }, [startGame]);

  // Retry current level
  const retryLevel = useCallback(() => {
    startGame(); // Restart the same level
  }, [startGame]);

  // Spawn multiple drops
  const spawnDrop = useCallback(() => {
    const settings = getCurrentSettings();
    const newDrops: Drop[] = [];
    
    // Spawn multiple drops based on level
    for (let i = 0; i < settings.dropsPerSpawn; i++) {
      const isPolluted = Math.random() < settings.pollutedDropChance;
      
      const newDrop: Drop = {
        id: dropIdCounter + i,
        x: Math.random() * (screenWidth - gameConfig.dropSize - 120), // Leave space for water container
        y: gameConfig.faucetY + 60 + (i * 10), // Slight vertical offset for multiple drops
        size: gameConfig.dropSize,
        isPolluted,
      };
      
      newDrops.push(newDrop);
    }
    
    setDrops(prevDrops => [...prevDrops, ...newDrops]);
    setDropIdCounter(prev => prev + settings.dropsPerSpawn);
  }, [dropIdCounter, getCurrentSettings]);

  // Move all drops down
  const moveDrops = useCallback(() => {
    const settings = getCurrentSettings();
    
    setDrops(prevDrops => {
      const updatedDrops: Drop[] = [];

      prevDrops.forEach(drop => {
        const newY = drop.y + settings.dropSpeed;
        
        if (newY >= gameConfig.drainY - gameConfig.dropSize) {
          // Drop reached the drain - no penalty, just remove it
        } else {
          // Drop is still falling
          updatedDrops.push({ ...drop, y: newY });
        }
      });

      return updatedDrops;
    });
  }, [getCurrentSettings]);

  // Handle drop tap
  const onDropTap = useCallback((dropId: number) => {
    const tappedDrop = drops.find(drop => drop.id === dropId);
    if (!tappedDrop) return;

    // Remove only the tapped drop
    setDrops(prevDrops => prevDrops.filter(drop => drop.id !== dropId));
    
    if (tappedDrop.isPolluted) {
      // Tapped polluted drop - still counts as collected water but affects cleanliness
      setPollutedWaterCollected(prev => prev + 1);
      setScore(prev => Math.max(0, prev - 5));
    } else {
      // Tapped clean drop - increases clean water and score
      setWaterCollected(prev => prev + 1);
      setScore(prev => prev + 10);
    }
  }, [drops]);

  // Check if level is complete
  useEffect(() => {
    const settings = getCurrentSettings();
    const totalWater = waterCollected + pollutedWaterCollected;
    if (totalWater >= settings.waterTarget && gameState === 'playing') {
      setTimeout(completeLevel, 500);
    }
  }, [waterCollected, pollutedWaterCollected, gameState, getCurrentSettings, completeLevel]);

  // Game loop effect
  useEffect(() => {
    if (gameState !== 'playing') return;

    const settings = getCurrentSettings();

    // Spawn drops interval
    const spawnInterval = setInterval(spawnDrop, settings.spawnRate) as unknown as NodeJS.Timeout;
    dropSpawnInterval.current = spawnInterval;

    // Move drops interval
    const moveInterval = setInterval(moveDrops, gameConfig.gameLoopSpeed) as unknown as NodeJS.Timeout;
    dropMoveInterval.current = moveInterval;

    return () => {
      if (spawnInterval) clearInterval(spawnInterval);
      if (moveInterval) clearInterval(moveInterval);
    };
  }, [gameState, spawnDrop, moveDrops, getCurrentSettings]);

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#87CEEB" barStyle="dark-content" />
      
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
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#87CEEB',
  },
});

export default SaveTheDropGame;