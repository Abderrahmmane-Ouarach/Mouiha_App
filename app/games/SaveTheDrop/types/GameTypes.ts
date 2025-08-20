// types/GameTypes.ts

/**
 * Represents a water drop in the game
 */
export interface Drop {
    id: number;
    x: number;
    y: number;
    size: number;
    isPolluted: boolean;
  }
  
  /**
   * Game state types
   */
  export type GameState = 'start' | 'playing' | 'gameOver';
  
  /**
   * Props for game components
   */
  export interface GameScreenProps {
    currentLevel: number;
    score: number;
    waterCollected: number;
    pollutedWaterCollected: number;
    waterTarget: number;
    drops: Drop[];
    onDropTap: (dropId: number) => void;
    onLeaveGame: () => void;
  }
  
  export interface StartScreenProps {
    onStartGame: () => void;
  }
  
  export interface LevelCompleteModalProps {
    visible: boolean;
    data: {
      level: number;
      score: number;
      waterCollected: number;
      pollutedWaterCollected: number;
      totalWater: number;
      waterTarget: number;
      cleanWaterPercentage: number;
      canAdvance: boolean;
      content: {
        title: string;
        description: string;
        tip: string;
        fact: string;
      };
    };
    onNextLevel: () => void;
    onRetryLevel: () => void;
    onBackToMenu: () => void;
  }
  
  export interface DropComponentProps {
    drop: Drop;
    onTap: () => void;
  }