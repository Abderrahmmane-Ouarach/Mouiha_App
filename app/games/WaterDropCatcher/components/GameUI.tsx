// GameUI.tsx - Game user interface component

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { GameStats } from '../types';
import { formatTime } from '../utils';

interface GameUIProps {
  stats: GameStats;
  timeRemaining: number;
}

const GameUI: React.FC<GameUIProps> = ({ stats, timeRemaining }) => {
  return (
    <View style={styles.container}>
      {/* Top Stats */}
      <View style={styles.topRow}>
        <View style={styles.statContainer}>
          <Text style={styles.statLabel}>المستوى</Text>
          <Text style={styles.statValue}>{stats.level}</Text>
        </View>
        
        <View style={styles.statContainer}>
          <Text style={styles.statLabel}>الوقت</Text>
          <Text style={styles.statValue}>{formatTime(timeRemaining)}</Text>
        </View>
        
        <View style={styles.statContainer}>
          <Text style={styles.statLabel}>النقاط</Text>
          <Text style={styles.statValue}>{stats.score}</Text>
        </View>
      </View>
      
      {/* Water Quality Bar */}
      <View style={styles.qualityContainer}>
        <Text style={styles.qualityLabel}>نقاء الماء: {stats.waterQualityPercentage}%</Text>
        <View style={styles.qualityBarBackground}>
          <View 
            style={[
              styles.qualityBarFill,
              { 
                width: `${stats.waterQualityPercentage}%`,
                backgroundColor: getQualityColor(stats.waterQualityPercentage)
              }
            ]} 
          />
        </View>
      </View>
      
      {/* Drop Stats */}
      <View style={styles.dropStats}>
        <View style={styles.dropStat}>
          <View style={[styles.dropIndicator, { backgroundColor: '#4FC3F7' }]} />
          <Text style={styles.dropStatText}>{stats.cleanDropsCaught}</Text>
        </View>
        <View style={styles.dropStat}>
          <View style={[styles.dropIndicator, { backgroundColor: '#5D4037' }]} />
          <Text style={styles.dropStatText}>{stats.pollutedDropsCaught}</Text>
        </View>
      </View>
    </View>
  );
};

const getQualityColor = (percentage: number): string => {
  if (percentage >= 80) return '#4CAF50'; // Green
  if (percentage >= 60) return '#FF9800'; // Orange
  if (percentage >= 40) return '#FF5722'; // Deep Orange
  return '#F44336'; // Red
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingTop: 50,
    paddingBottom: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
  },
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  statContainer: {
    alignItems: 'center',
    flex: 1,
  },
  statLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: '#666',
    marginBottom: 2,
  },
  statValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1976D2',
  },
  qualityContainer: {
    marginBottom: 10,
  },
  qualityLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    marginBottom: 5,
    textAlign: 'center',
  },
  qualityBarBackground: {
    height: 8,
    backgroundColor: '#E0E0E0',
    borderRadius: 4,
    overflow: 'hidden',
  },
  qualityBarFill: {
    height: '100%',
    borderRadius: 4,
    transform: 'width 0.3s ease',
  },
  dropStats: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 20,
  },
  dropStat: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  dropIndicator: {
    width: 12,
    height: 12,
    borderRadius: 6,
  },
  dropStatText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
  },
});

export default GameUI;