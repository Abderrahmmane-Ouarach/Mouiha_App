// config/GameConfig.ts
import { Dimensions } from 'react-native';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

/**
 * Game configuration constants
 * Easily adjustable for difficulty and UI changes
 */
export const gameConfig = {
  // Game mechanics
  initialDropSpeed: 3, // pixels per frame
  initialSpawnRate: 1200, // milliseconds between drop spawns
  minSpawnRate: 600, // minimum time between spawns
  gameLoopSpeed: 16, // ~60 FPS (1000ms/60fps ≈ 16ms)
  baseWaterTarget: 20, // Base amount of water needed to complete level
  
  // Drop settings
  dropSize: 45,
  dropTapRadius: 30,
  
  // UI positions
  faucetY: 80, // Y position of the faucet
  drainY: screenHeight - 120, // Y position of the drain
  waterContainerX: screenWidth - 100, // X position of water container
  
  // Colors
  colors: {
    primary: '#4A90E2',
    secondary: '#7ED321',
    danger: '#D0021B',
    background: '#87CEEB',
    white: '#FFFFFF',
    text: '#333333',
    cleanWater: '#1E90FF',
    pollutedWater: '#8B4513',
    container: '#E8E8E8',
    containerBorder: '#CCCCCC',
    faucet: '#C0C0C0',
    drain: '#696969',
  },
  
  // Screen dimensions
  screenWidth,
  screenHeight,
  
  // Animation durations
  animationDuration: 300,
};