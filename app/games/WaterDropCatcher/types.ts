// types.ts - Game type definitions

export interface Drop {
    id: string;
    x: number;
    y: number;
    isClean: boolean;
    speed: number;
  }
  
  export interface GameStats {
    score: number;
    cleanDropsCaught: number;
    pollutedDropsCaught: number;
    totalDrops: number;
    level: number;
    waterQualityPercentage: number;
  }
  
  export interface Level {
    level: number;
    dropSpeed: number;
    spawnRate: number;
    pollutedDropRate: number; // percentage of polluted drops
    scoreMultiplier: number;
  }
  
  export interface WaterFact {
    id: number;
    fact: string;
    tip: string;
  }
  
  export interface Position {
    x: number;
    y: number;
  }
  
  export interface GameState {
    isPlaying: boolean;
    isPaused: boolean;
    timeRemaining: number;
    currentLevel: Level;
    showLevelComplete: boolean;
    showGameOver: boolean;
  }