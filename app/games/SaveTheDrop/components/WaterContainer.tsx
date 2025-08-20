// components/WaterContainer.tsx
import React, { useEffect, useRef } from 'react';
import {
  Animated,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { gameConfig } from '../config/GameConfig';

interface WaterContainerProps {
  waterCollected: number;
  pollutedWaterCollected: number;
  waterTarget: number;
}

export const WaterContainer: React.FC<WaterContainerProps> = ({
  waterCollected,
  pollutedWaterCollected,
  waterTarget,
}) => {
  const cleanWaterLevelAnim = useRef(new Animated.Value(0)).current;
  const pollutedWaterLevelAnim = useRef(new Animated.Value(0)).current;
  
  // Calculate fill percentages
  const totalWater = waterCollected + pollutedWaterCollected;
  const fillPercentage = Math.min((totalWater / waterTarget) * 100, 100);
  const cleanWaterPercentage = totalWater > 0 ? (waterCollected / totalWater) * 100 : 100;
  
  const totalWaterLevel = (fillPercentage / 100) * 180; // 180 is the container height
  const cleanWaterLevel = (cleanWaterPercentage / 100) * totalWaterLevel;
  const pollutedWaterLevel = totalWaterLevel - cleanWaterLevel;

  // Animate water levels
  useEffect(() => {
    Animated.parallel([
      Animated.timing(cleanWaterLevelAnim, {
        toValue: cleanWaterLevel,
        duration: 500,
        useNativeDriver: false,
      }),
      Animated.timing(pollutedWaterLevelAnim, {
        toValue: pollutedWaterLevel,
        duration: 500,
        useNativeDriver: false,
      })
    ]).start();
  }, [cleanWaterLevel, pollutedWaterLevel, cleanWaterLevelAnim, pollutedWaterLevelAnim]);

  return (
    <View style={styles.containerWrapper}>
      {/* Container */}
      <View style={styles.container}>
        {/* Polluted water (bottom layer) */}
        <Animated.View
          style={[
            styles.pollutedWater,
            {
              height: pollutedWaterLevelAnim,
            },
          ]}
        />
        
        {/* Clean water (top layer) */}
        <Animated.View
          style={[
            styles.cleanWater,
            {
              height: cleanWaterLevelAnim,
              bottom: pollutedWaterLevel,
            },
          ]}
        />
        
        {/* Container rim */}
        <View style={styles.containerRim} />
        
        {/* Measurement lines */}
        {[25, 50, 75].map((percentage) => (
          <View
            key={percentage}
            style={[
              styles.measurementLine,
              { bottom: (percentage / 100) * 180 }
            ]}
          />
        ))}
      </View>
      
      {/* Labels */}
      <View style={styles.labelContainer}>
        <Text style={styles.waterLabel}>خزان المياه</Text>
        <Text style={styles.progressText}>
          {totalWater}/{waterTarget}
        </Text>
        <Text style={styles.percentageText}>
          نظافة: {Math.round(cleanWaterPercentage)}%
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  containerWrapper: {
    position: 'absolute',
    right: 5,
    top: 100,
    alignItems: 'center',
    zIndex: 20,
  },
  container: {
    width: 65, // Reduced from 80 to 65
    height: 200,
    backgroundColor: gameConfig.colors.container,
    borderWidth: 3,
    borderColor: gameConfig.colors.containerBorder,
    borderRadius: 8,
    position: 'relative',
    justifyContent: 'flex-end',
    overflow: 'hidden',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },
  cleanWater: {
    width: '100%',
    backgroundColor: gameConfig.colors.cleanWater,
    borderRadius: 4,
    opacity: 0.8,
    position: 'absolute',
    left: 0,
    right: 0,
  },
  pollutedWater: {
    width: '100%',
    backgroundColor: gameConfig.colors.pollutedWater,
    borderRadius: 4,
    opacity: 0.7,
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
  containerRim: {
    position: 'absolute',
    top: -5,
    left: -8,
    right: -8,
    height: 10,
    backgroundColor: gameConfig.colors.containerBorder,
    borderRadius: 10,
    elevation: 2,
  },
  measurementLine: {
    position: 'absolute',
    right: -15,
    width: 10,
    height: 1,
    backgroundColor: gameConfig.colors.text,
    opacity: 0.5,
  },
  labelContainer: {
    marginTop: 10,
    alignItems: 'center',
  },
  waterLabel: {
    fontSize: 12,
    fontFamily: 'Tajawal-Bold',
    color: gameConfig.colors.primary,
    marginBottom: 5,
  },
  progressText: {
    fontSize: 14,
    fontFamily: 'Tajawal-Medium',
    color: gameConfig.colors.text,
    marginBottom: 2,
  },
  percentageText: {
    fontSize: 18,
    fontFamily: 'Tajawal-Bold',
    color: gameConfig.colors.secondary,
  },
});