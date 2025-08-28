// SaveTheDropGame.tsx
import React, { useState, useEffect, useCallback, useRef } from 'react';
import {
  Dimensions,
  StyleSheet,
} from 'react-native';
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';
import { StartScreen } from './components/StartScreen';
import { GameScreen } from './components/GameScreen';
import { LevelCompleteModal } from './components/LevelCompleteModal';
import { Drop } from './types/GameTypes';
import { educationalContent } from './data/WaterFacts';
import { gameConfig } from './config/GameConfig';

const { width: screenWidth } = Dimensions.get('window');

export const SaveTheDropGame: React.FC = () => {
  // Game state
  const [gameState, setGameState] = useState<'start' | 'playing' | 'levelComplete' | 'gameOver'>('start');
  const [currentLevel, setCurrentLevel] = useState<number>(1);
  const [score, setScore] = useState<number>(0);
  const [waterCollected, setWaterCollected] = useState<number>(0);
  const [pollutedWaterCollected, setPollutedWaterCollected] = useState<number>(0);
  const [droppedCleanWater, setDroppedCleanWater] = useState<number>(0); // New counter for missed clean drops
  const [drops, setDrops] = useState<Drop[]>([]);
  const [dropIdCounter, setDropIdCounter] = useState<number>(0);
  const [levelCompleteData, setLevelCompleteData] = useState<any>(null);

  // Game intervals
  const dropSpawnInterval = useRef<NodeJS.Timeout | null>(null);
  const dropMoveInterval = useRef<NodeJS.Timeout | null>(null);
  const lastSpawnPositions = useRef<{x: number, time: number}[]>([]);

  // Calculate current game settings based on level
  const getCurrentSettings = useCallback(() => {
    const levelMultiplier = currentLevel - 1;
    return {
      dropSpeed: gameConfig.initialDropSpeed + (levelMultiplier * 1.2),
      spawnRate: Math.max(
        gameConfig.initialSpawnRate - (levelMultiplier * 500), // Reduced from 300 to 200 for more gradual difficulty
        gameConfig.minSpawnRate
      ),
      pollutedDropChance: Math.min(0.15 + (levelMultiplier * 0.08), 0.45), // Slightly reduced pollution increase
      waterTarget: gameConfig.baseWaterTarget + (levelMultiplier * 8),
      maxDroppedCleanWater: 3 + Math.floor(levelMultiplier / 2), // Allow more missed drops in higher levels
    };
  }, [currentLevel]);

  // Start the game
  const startGame = useCallback(() => {
    setGameState('playing');
    setScore(0);
    setWaterCollected(0);
    setPollutedWaterCollected(0);
    setDroppedCleanWater(0); // Reset dropped counter
    setDrops([]);
    setDropIdCounter(0);
    lastSpawnPositions.current = [];
  }, []);

  // Game over
  const gameOver = useCallback(() => {
    // Clear intervals
    if (dropSpawnInterval.current) clearInterval(dropSpawnInterval.current);
    if (dropMoveInterval.current) clearInterval(dropMoveInterval.current);
    
    // Set game over data
    const settings = getCurrentSettings();
    const totalWater = waterCollected + pollutedWaterCollected;
    const cleanWaterPercentage = totalWater > 0 ? Math.round((waterCollected / totalWater) * 100) : 100;
    const randomContent = educationalContent[Math.floor(Math.random() * educationalContent.length)];
    
    setLevelCompleteData({
      level: currentLevel,
      score,
      waterCollected,
      pollutedWaterCollected,
      totalWater,
      waterTarget: settings.waterTarget,
      cleanWaterPercentage,
      canAdvance: false, // Game over means can't advance
      droppedCleanWater,
      isGameOver: true,
      content: randomContent,
    });
    
    setGameState('levelComplete');
  }, [currentLevel, score, waterCollected, pollutedWaterCollected, droppedCleanWater, getCurrentSettings]);

  // Complete current level
  const completeLevel = useCallback(() => {
    // Clear intervals
    if (dropSpawnInterval.current) clearInterval(dropSpawnInterval.current);
    if (dropMoveInterval.current) clearInterval(dropMoveInterval.current);
    
    // Calculate level completion data
    const settings = getCurrentSettings();
    const totalWater = waterCollected + pollutedWaterCollected;
    const cleanWaterPercentage = totalWater > 0 ? Math.round((waterCollected / totalWater) * 100) : 100;
    const canAdvance = cleanWaterPercentage >= 85; // 70% clean water required to advance
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
      droppedCleanWater,
      isGameOver: false,
      content: randomContent,
    });
    
    setGameState('levelComplete');
  }, [currentLevel, score, waterCollected, pollutedWaterCollected, droppedCleanWater, getCurrentSettings]);

  // Go to next level
  const nextLevel = useCallback(() => {
    setCurrentLevel(prev => prev + 1);
    startGame();
  }, [startGame]);

  // Retry current level
  const retryLevel = useCallback(() => {
    startGame(); // Restart the same level
  }, [startGame]);

  // Generate a safe spawn position that avoids overlapping with recent drops
  const generateSafeSpawnPosition = useCallback(() => {
    const currentTime = Date.now();
    const minDistance = 80; // Minimum distance between drops
    const maxAttempts = 10;
    
    // Clean up old positions (older than 2 seconds)
    lastSpawnPositions.current = lastSpawnPositions.current.filter(
      pos => currentTime - pos.time < 2000
    );
    
    for (let attempt = 0; attempt < maxAttempts; attempt++) {
      const x = Math.random() * (screenWidth - gameConfig.dropSize - 140); // Leave space for water container
      
      // Check if this position is too close to recent spawn positions
      const tooClose = lastSpawnPositions.current.some(pos => 
        Math.abs(pos.x - x) < minDistance
      );
      
      if (!tooClose) {
        // Add this position to recent positions
        lastSpawnPositions.current.push({ x, time: currentTime });
        return x;
      }
    }
    
    // If we can't find a safe position after max attempts, use a random one
    // but still record it
    const fallbackX = Math.random() * (screenWidth - gameConfig.dropSize - 140);
    lastSpawnPositions.current.push({ x: fallbackX, time: currentTime });
    return fallbackX;
  }, []);

  // Spawn a single drop (changed from multiple drops)
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

  // Move all drops down
  const moveDrops = useCallback(() => {
    const settings = getCurrentSettings();
    
    setDrops(prevDrops => {
      const updatedDrops: Drop[] = [];
      const totalWater = waterCollected + pollutedWaterCollected;
      const shouldStopCounting = totalWater >= settings.waterTarget || droppedCleanWater >= settings.maxDroppedCleanWater;

      prevDrops.forEach(drop => {
        const newY = drop.y + settings.dropSpeed;
        
        if (newY >= gameConfig.drainY - gameConfig.dropSize) {
          // Drop reached the drain
          if (!drop.isPolluted && !shouldStopCounting) {
            // Only count clean water drops that were missed, and only if we haven't reached limits
            setDroppedCleanWater(prev => prev + 1);
          }
          // Remove the drop (both clean and polluted)
        } else {
          // Drop is still falling
          updatedDrops.push({ ...drop, y: newY });
        }
      });

      return updatedDrops;
    });
  }, [getCurrentSettings, waterCollected, pollutedWaterCollected, droppedCleanWater]);

  // Handle drop tap
  const onDropTap = useCallback((dropId: number) => {
    const settings = getCurrentSettings();
    const tappedDrop = drops.find(drop => drop.id === dropId);
    if (!tappedDrop) return;

    // Check if we should stop collecting (level complete or game over conditions)
    const totalWater = waterCollected + pollutedWaterCollected;
    const shouldStopCollecting = totalWater >= settings.waterTarget || droppedCleanWater >= settings.maxDroppedCleanWater;
    
    if (shouldStopCollecting) return; // Don't process taps if level is complete or game over

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
  }, [drops, waterCollected, pollutedWaterCollected, droppedCleanWater, getCurrentSettings]);

  // Check if level is complete or game over
  useEffect(() => {
    const settings = getCurrentSettings();
    const totalWater = waterCollected + pollutedWaterCollected;
    
    if (gameState === 'playing') {
      // Check for game over condition first
      if (droppedCleanWater >= settings.maxDroppedCleanWater) {
        setTimeout(gameOver, 500);
        return;
      }
      
      // Check for level completion
      if (totalWater >= settings.waterTarget) {
        setTimeout(completeLevel, 500);
      }
    }
  }, [waterCollected, pollutedWaterCollected, droppedCleanWater, gameState, getCurrentSettings, completeLevel, gameOver]);

  // Game loop effect
  useEffect(() => {
    if (gameState !== 'playing') return;

    const settings = getCurrentSettings();

    // Spawn drops interval - now spawns one drop at a time
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
            droppedCleanWater={droppedCleanWater}
            maxDroppedCleanWater={getCurrentSettings().maxDroppedCleanWater}
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