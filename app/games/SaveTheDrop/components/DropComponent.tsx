// components/DropComponent.tsx
import React, { useEffect, useRef } from 'react';
import {
  View,
  TouchableOpacity,
  Animated,
  StyleSheet,
} from 'react-native';
import { DropComponentProps } from '../types/GameTypes';
import { gameConfig } from '../config/GameConfig';

export const DropComponent: React.FC<DropComponentProps> = ({ drop, onTap }) => {
  // Animation values
  const scaleAnim = useRef(new Animated.Value(1)).current;
  const opacityAnim = useRef(new Animated.Value(1)).current;

  // Subtle animation for drops
  useEffect(() => {
    const pulseAnimation = Animated.loop(
      Animated.sequence([
        Animated.timing(scaleAnim, {
          toValue: 1.05,
          duration: 800,
          useNativeDriver: true,
        }),
        Animated.timing(scaleAnim, {
          toValue: 1,
          duration: 800,
          useNativeDriver: true,
        }),
      ])
    );

    pulseAnimation.start();

    return () => pulseAnimation.stop();
  }, [scaleAnim]);

  // Tap animation
  const handleTap = () => {
    // Quick scale and fade animation on tap
    Animated.parallel([
      Animated.timing(scaleAnim, {
        toValue: 1.3,
        duration: 150,
        useNativeDriver: true,
      }),
      Animated.timing(opacityAnim, {
        toValue: 0,
        duration: 150,
        useNativeDriver: true,
      }),
    ]).start();

    // Call the parent's onTap function
    setTimeout(onTap, 50);
  };

  return (
    <TouchableOpacity
      style={[
        styles.dropContainer,
        {
          left: drop.x,
          top: drop.y,
          width: drop.size + gameConfig.dropTapRadius * 2,
          height: drop.size + gameConfig.dropTapRadius * 2,
        },
      ]}
      onPress={handleTap}
      activeOpacity={0.7}
    >
      <Animated.View
        style={[
          styles.drop,
          {
            width: drop.size,
            height: drop.size,
            backgroundColor: drop.isPolluted 
              ? gameConfig.colors.pollutedWater 
              : gameConfig.colors.cleanWater,
            transform: [{ scale: scaleAnim }],
            opacity: opacityAnim,
          },
        ]}
      >
        {/* Pollution indicator for polluted drops */}
        {drop.isPolluted && (
          <View style={styles.pollutionIndicator}>
            <View style={styles.pollutionDot} />
            <View style={[styles.pollutionDot, { marginLeft: 2 }]} />
          </View>
        )}
        
        {/* Clean water shine effect */}
        {!drop.isPolluted && <View style={styles.shineEffect} />}
      </Animated.View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  dropContainer: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 5,
  },
  drop: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 25,
    borderWidth: 2,
    borderColor: gameConfig.colors.white,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    position: 'relative',
  },
  pollutionIndicator: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  pollutionDot: {
    width: 6,
    height: 6,
    backgroundColor: '#654321',
    borderRadius: 3,
  },
  shineEffect: {
    position: 'absolute',
    top: 8,
    left: 12,
    width: 12,
    height: 8,
    backgroundColor: gameConfig.colors.white,
    borderRadius: 6,
    opacity: 0.7,
  },
});