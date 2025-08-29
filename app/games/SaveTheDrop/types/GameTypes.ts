// types/GameTypes.ts
export interface Drop {
  id: number;
  x: number;
  y: number;
  size: number;
  isPolluted: boolean;
}

interface GameScreenProps {
  currentLevel: number;
  score: number;
  waterCollected: number;
  pollutedWaterCollected: number;
  waterTarget: number;
  droppedCleanWater: number;
  maxDroppedCleanWater: number;
  drops: Drop[];
  onDropTap: (dropId: number) => void;
  onLeaveGame: () => void;
  combo: number;
  isPaused: boolean;
  educationalMessage?: string; // ✅ جديد
}


export interface LevelCompleteData {
  level: number;
  score: number;
  waterCollected: number;
  pollutedWaterCollected: number;
  totalWater: number;
  waterTarget: number;
  cleanWaterPercentage: number;
  canAdvance: boolean;
  droppedCleanWater: number;
  isGameOver: boolean;
  content: EducationalContent;
  // Enhanced statistics
  maxCombo?: number;
  perfectStreak?: number;
  playTime?: number;
  accuracy?: number;
  totalDropsTapped?: number;
  levelBonus?: number;
}

export interface EducationalContent {
  id: number;
  title: string;
  description: string;
  tip: string;
  icon?: string;
}

export interface GameConfig {
  initialDropSpeed: number;
  initialSpawnRate: number;
  minSpawnRate: number;
  baseWaterTarget: number;
  dropSize: number;
  faucetY: number;
  drainY: number;
  gameLoopSpeed: number;
  colors: {
    primary: string;
    secondary: string;
    background: string;
    cleanWater: string;
    pollutedWater: string;
    danger: string;
    success: string;
    warning: string;
    white: string;
    text: string;
  };
}

export interface StartScreenProps {
  onStartGame: () => void;
}

export interface LevelCompleteModalProps {
  visible: boolean;
  data: LevelCompleteData;
  onNextLevel: () => void;
  onRetryLevel: () => void;
  onBackToMenu: () => void;
}