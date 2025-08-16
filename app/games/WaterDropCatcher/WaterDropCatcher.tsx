import React, { useState, useEffect, useRef, useCallback } from 'react';
import {
  View,
  StyleSheet,
} from 'react-native';
import {
  Gesture,
  GestureDetector,
  GestureHandlerRootView,
} from 'react-native-gesture-handler';
import { Drop, GameStats, Position, GameState, WaterFact } from './types';
import { GAME_CONFIG, LEVELS, getRandomWaterFact } from './data';
import {
  generateId,
  checkCollision,
  calculateWaterQuality,
  calculateScore,
  getRandomSpawnX,
  isDropOutOfBounds,
} from './utils';
import WaterDrop from './components/WaterDrop';
import Bucket from './components/Bucket';
import GameUI from './components/GameUI';
import LevelCompleteModal from './components/LevelCompleteModal';
import GameOverModal from './components/GameOverModal';

const WaterDropCatcher: React.FC = () => {
  // Game state
  const [gameState, setGameState] = useState<GameState>({
    isPlaying: false,
    isPaused: false,
    timeRemaining: GAME_CONFIG.GAME_DURATION,
    currentLevel: LEVELS[0],
    showLevelComplete: false,
    showGameOver: false,
  });

  // Game stats
  const [stats, setStats] = useState<GameStats>({
    score: 0,
    cleanDropsCaught: 0,
    pollutedDropsCaught: 0,
    totalDrops: 0,
    level: 1,
    waterQualityPercentage: 100,
  });

  // Game objects
  const [drops, setDrops] = useState<Drop[]>([]);
  const [bucketPosition, setBucketPosition] = useState<Position>({
    x: GAME_CONFIG.GAME_WIDTH / 2 - GAME_CONFIG.BUCKET_WIDTH / 2,
    y: GAME_CONFIG.GAME_HEIGHT - GAME_CONFIG.GROUND_OFFSET - GAME_CONFIG.BUCKET_HEIGHT - 10,
  });

  // Water fact for modals
  const [currentWaterFact, setCurrentWaterFact] = useState<WaterFact>(getRandomWaterFact());

  // Refs for intervals
  const gameLoopRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const dropSpawnRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Start game
  const startGame = useCallback(() => {
    setGameState(prev => ({
      ...prev,
      isPlaying: true,
      isPaused: false,
      timeRemaining: GAME_CONFIG.GAME_DURATION,
      showLevelComplete: false,
      showGameOver: false,
    }));
    
    setDrops([]);
    setCurrentWaterFact(getRandomWaterFact());
  }, []);

  // End game
  const endGame = useCallback(() => {
    if (gameLoopRef.current) clearInterval(gameLoopRef.current);
    if (dropSpawnRef.current) clearInterval(dropSpawnRef.current);
    if (timerRef.current) clearInterval(timerRef.current);

    setGameState(prev => ({
      ...prev,
      isPlaying: false,
      showGameOver: true,
    }));
  }, []);

  // Complete level
  const completeLevel = useCallback(() => {
    if (gameLoopRef.current) clearInterval(gameLoopRef.current);
    if (dropSpawnRef.current) clearInterval(dropSpawnRef.current);
    if (timerRef.current) clearInterval(timerRef.current);

    setGameState(prev => ({
      ...prev,
      isPlaying: false,
      showLevelComplete: true,
    }));
    
    setCurrentWaterFact(getRandomWaterFact());
  }, []);

  // Go to next level
  const nextLevel = useCallback(() => {
    const currentLevelIndex = LEVELS.findIndex(l => l.level === stats.level);
    const isLastLevel = currentLevelIndex >= LEVELS.length - 1;
    
    if (isLastLevel) {
      // Restart from level 1
      setStats(prev => ({ ...prev, level: 1 }));
      setGameState(prev => ({
        ...prev,
        currentLevel: LEVELS[0],
        showLevelComplete: false,
      }));
    } else {
      // Go to next level
      const nextLevelData = LEVELS[currentLevelIndex + 1];
      setStats(prev => ({ ...prev, level: nextLevelData.level }));
      setGameState(prev => ({
        ...prev,
        currentLevel: nextLevelData,
        showLevelComplete: false,
      }));
    }
    
    startGame();
  }, [stats.level, startGame]);

  // Restart game
  const restartGame = useCallback(() => {
    setStats({
      score: 0,
      cleanDropsCaught: 0,
      pollutedDropsCaught: 0,
      totalDrops: 0,
      level: 1,
      waterQualityPercentage: 100,
    });
    
    setGameState(prev => ({
      ...prev,
      currentLevel: LEVELS[0],
      showGameOver: false,
    }));
    
    setBucketPosition({
      x: GAME_CONFIG.GAME_WIDTH / 2 - GAME_CONFIG.BUCKET_WIDTH / 2,
      y: GAME_CONFIG.GAME_HEIGHT - GAME_CONFIG.GROUND_OFFSET - GAME_CONFIG.BUCKET_HEIGHT - 10,
    });
    
    startGame();
  }, [startGame]);

  // Exit game (you can implement navigation back to menu)
  const exitGame = useCallback(() => {
    setGameState(prev => ({ ...prev, showGameOver: false }));
    // Add navigation logic here if needed
  }, []);

  // Handle bucket pan gesture
  const panGesture = Gesture.Pan()
    .onUpdate((event) => {
      const { translationX } = event;
      
      setBucketPosition(prev => {
        const newX = Math.max(
          0,
          Math.min(
            GAME_CONFIG.GAME_WIDTH - GAME_CONFIG.BUCKET_WIDTH,
            prev.x + translationX * 0.02 // Reduced sensitivity for smoother control
          )
        );
        
        return { ...prev, x: newX };
      });
    });

  // Spawn new drop
  const spawnDrop = useCallback(() => {
    if (!gameState.isPlaying) return;

    const isPolluted = Math.random() * 100 < gameState.currentLevel.pollutedDropRate;
    
    const newDrop: Drop = {
      id: generateId(),
      x: getRandomSpawnX(),
      y: -GAME_CONFIG.DROP_SIZE,
      isClean: !isPolluted,
      speed: gameState.currentLevel.dropSpeed,
    };

    setDrops(prev => [...prev, newDrop]);
  }, [gameState.isPlaying, gameState.currentLevel]);

  // Game loop
  const gameLoop = useCallback(() => {
    if (!gameState.isPlaying) return;

    setDrops(prev => {
      const newDrops = prev
        .map(drop => ({
          ...drop,
          y: drop.y + drop.speed,
        }))
        .filter(drop => {
          // Check collision with bucket
          if (checkCollision(bucketPosition, drop)) {
            // Update stats based on drop type
            setStats(currentStats => {
              const newStats = {
                ...currentStats,
                cleanDropsCaught: drop.isClean 
                  ? currentStats.cleanDropsCaught + 1 
                  : currentStats.cleanDropsCaught,
                pollutedDropsCaught: !drop.isClean 
                  ? currentStats.pollutedDropsCaught + 1 
                  : currentStats.pollutedDropsCaught,
                totalDrops: currentStats.totalDrops + 1,
              };
              
              // Calculate water quality percentage
              newStats.waterQualityPercentage = calculateWaterQuality(newStats);
              
              // Calculate score
              newStats.score = calculateScore(
                newStats.cleanDropsCaught,
                newStats.pollutedDropsCaught,
                gameState.currentLevel.level,
                gameState.currentLevel.scoreMultiplier
              );
              
              return newStats;
            });
            
            return false; // Remove caught drop
          }
          
          // Remove drops that fell off screen
          if (isDropOutOfBounds(drop)) {
            setStats(currentStats => ({
              ...currentStats,
              totalDrops: currentStats.totalDrops + 1,
            }));
            return false;
          }
          
          return true; // Keep drop
        });

      return newDrops;
    });
  }, [gameState.isPlaying, gameState.currentLevel, bucketPosition]);

  // Timer countdown
  const updateTimer = useCallback(() => {
    setGameState(prev => {
      if (prev.timeRemaining <= 1) {
        completeLevel();
        return { ...prev, timeRemaining: 0 };
      }
      
      return { ...prev, timeRemaining: prev.timeRemaining - 1 };
    });
  }, [completeLevel]);

  // Setup game intervals
  useEffect(() => {
    if (gameState.isPlaying && !gameState.isPaused) {
      // Game loop (60 FPS)
      gameLoopRef.current = setInterval(gameLoop, 1000 / 60);
      
      // Drop spawning
      dropSpawnRef.current = setInterval(spawnDrop, gameState.currentLevel.spawnRate);
      
      // Timer
      timerRef.current = setInterval(updateTimer, 1000);
    }

    return () => {
      if (gameLoopRef.current) clearInterval(gameLoopRef.current);
      if (dropSpawnRef.current) clearInterval(dropSpawnRef.current);
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [gameState.isPlaying, gameState.isPaused, gameState.currentLevel.spawnRate, gameLoop, spawnDrop, updateTimer]);

  // Auto-start game on component mount
  useEffect(() => {
    startGame();
    
    return () => {
      if (gameLoopRef.current) clearInterval(gameLoopRef.current);
      if (dropSpawnRef.current) clearInterval(dropSpawnRef.current);
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [startGame]);

  return (
    <GestureHandlerRootView style={styles.container}>
      <View style={styles.gameContainer}>
        {/* Game UI */}
        <GameUI stats={stats} timeRemaining={gameState.timeRemaining} />
        
        {/* Game Area */}
        <View style={styles.gameArea}>
          {/* Falling Drops */}
          {drops.map(drop => (
            <WaterDrop key={drop.id} drop={drop} />
          ))}
          
          {/* Player Bucket */}
          <GestureDetector gesture={panGesture}>
            <View style={styles.bucketContainer}>
              <Bucket position={bucketPosition} />
            </View>
          </GestureDetector>
        </View>
        
        {/* Ground */}
        <View style={styles.ground} />
      </View>

      {/* Level Complete Modal */}
      <LevelCompleteModal
        visible={gameState.showLevelComplete}
        stats={stats}
        waterFact={currentWaterFact}
        onNextLevel={nextLevel}
        isLastLevel={stats.level >= LEVELS.length}
      />

      {/* Game Over Modal */}
      <GameOverModal
        visible={gameState.showGameOver}
        stats={stats}
        waterFact={currentWaterFact}
        onRestart={restartGame}
        onExit={exitGame}
      />
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#87CEEB', // Sky blue background
  },
  gameContainer: {
    flex: 1,
    width: GAME_CONFIG.GAME_WIDTH,
    height: GAME_CONFIG.GAME_HEIGHT,
    alignSelf: 'center',
    backgroundColor: '#87CEEB',
    position: 'relative',
  },
  gameArea: {
    flex: 1,
    position: 'relative',
    overflow: 'hidden',
    backgroundColor: 'transparent',
  },
  bucketContainer: {
    position: 'absolute',
    width: GAME_CONFIG.BUCKET_WIDTH,
    height: GAME_CONFIG.BUCKET_HEIGHT,
    zIndex: 10, // Ensure bucket is above other elements
  },
  ground: {
    height: GAME_CONFIG.GROUND_OFFSET,
    backgroundColor: '#8BC34A', // Green ground
    borderTopWidth: 3,
    borderTopColor: '#4CAF50',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: 5,
  },
});

export default WaterDropCatcher;