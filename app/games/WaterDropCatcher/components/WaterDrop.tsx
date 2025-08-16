// WaterDrop.tsx - Individual water drop component

import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Drop } from '../types';
import { GAME_CONFIG } from '../data';

interface WaterDropProps {
  drop: Drop;
}

const WaterDrop: React.FC<WaterDropProps> = ({ drop }) => {
  return (
    <View
      style={[
        styles.drop,
        {
          left: drop.x,
          top: drop.y,
          backgroundColor: drop.isClean ? '#4FC3F7' : '#5D4037',
        },
      ]}
    />
  );
};

const styles = StyleSheet.create({
  drop: {
    position: 'absolute',
    width: GAME_CONFIG.DROP_SIZE,
    height: GAME_CONFIG.DROP_SIZE,
    borderRadius: GAME_CONFIG.DROP_SIZE / 2,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
});

export default WaterDrop;