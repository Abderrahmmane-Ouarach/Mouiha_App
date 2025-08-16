// utils.ts - Game utility functions

import { Drop, GameStats, Position } from './types';
import { GAME_CONFIG } from './data';

// Generate unique ID for drops
export const generateId = (): string => {
  return Math.random().toString(36).substr(2, 9);
};

// Check collision between bucket and drop
export const checkCollision = (
  bucketPosition: Position,
  drop: Drop
): boolean => {
  const bucketLeft = bucketPosition.x;
  const bucketRight = bucketPosition.x + GAME_CONFIG.BUCKET_WIDTH;
  const bucketTop = bucketPosition.y;
  
  const dropLeft = drop.x;
  const dropRight = drop.x + GAME_CONFIG.DROP_SIZE;
  const dropBottom = drop.y + GAME_CONFIG.DROP_SIZE;
  
  return (
    dropRight >= bucketLeft &&
    dropLeft <= bucketRight &&
    dropBottom >= bucketTop &&
    drop.y <= bucketTop + GAME_CONFIG.BUCKET_HEIGHT
  );
};

// Calculate water quality percentage based on collected drops
export const calculateWaterQuality = (stats: GameStats): number => {
  const totalCaught = stats.cleanDropsCaught + stats.pollutedDropsCaught;
  if (totalCaught === 0) return 100;
  
  return Math.round((stats.cleanDropsCaught / totalCaught) * 100);
};

// Calculate score based on water quality and level
export const calculateScore = (
  cleanDrops: number,
  pollutedDrops: number,
  level: number,
  multiplier: number
): number => {
  const waterQuality = calculateWaterQuality({
    cleanDropsCaught: cleanDrops,
    pollutedDropsCaught: pollutedDrops,
    score: 0,
    totalDrops: 0,
    level,
    waterQualityPercentage: 0
  });
  
  // Clean drops give positive points, polluted drops reduce points
  const baseScore = (cleanDrops * 10) - (pollutedDrops * 5);
  // Bonus based on water quality percentage
  const qualityBonus = Math.floor(waterQuality / 10) * 5;
  
  return Math.max(0, Math.floor((baseScore + qualityBonus) * multiplier));
};

// Format time display (MM:SS)
export const formatTime = (seconds: number): string => {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
};

// Generate random spawn position for drops
export const getRandomSpawnX = (): number => {
  return Math.random() * (GAME_CONFIG.GAME_WIDTH - GAME_CONFIG.DROP_SIZE);
};

// Check if drop is out of bounds (fell to ground)
export const isDropOutOfBounds = (drop: Drop): boolean => {
  return drop.y > GAME_CONFIG.GAME_HEIGHT - GAME_CONFIG.GROUND_OFFSET;
};