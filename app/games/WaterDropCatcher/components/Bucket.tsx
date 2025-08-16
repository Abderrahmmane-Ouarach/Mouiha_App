// Bucket.tsx - Player bucket component

import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Position } from '../types';
import { GAME_CONFIG } from '../data';

interface BucketProps {
  position: Position;
}

const Bucket: React.FC<BucketProps> = ({ position }) => {
  return (
    <View
      style={[
        styles.bucket,
        {
          left: position.x,
          top: position.y,
        },
      ]}
    >
      <View style={styles.bucketInside} />
      <View style={styles.bucketHandle} />
    </View>
  );
};

const styles = StyleSheet.create({
  bucket: {
    position: 'absolute',
    width: GAME_CONFIG.BUCKET_WIDTH,
    height: GAME_CONFIG.BUCKET_HEIGHT,
    zIndex: 10,
  },
  bucketInside: {
    width: '100%',
    height: '80%',
    backgroundColor: '#E3F2FD',
    borderWidth: 4,
    borderColor: '#1976D2',
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 6,
  },
  bucketHandle: {
    position: 'absolute',
    right: -10,
    top: 8,
    width: 20,
    height: 35,
    borderWidth: 4,
    borderColor: '#1976D2',
    borderRadius: 12,
    backgroundColor: 'transparent',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3,
    elevation: 4,
  },
});

export default Bucket;