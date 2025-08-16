// components/Faucet.tsx
import React, { useEffect, useRef } from 'react';
import {
  View,
  StyleSheet,
  Dimensions,
  Animated,
} from 'react-native';
import { gameConfig } from '../config/GameConfig';

const { width: screenWidth } = Dimensions.get('window');

export const Faucet: React.FC = () => {
  // Animation for the dripping water
  const dripAnim = useRef(new Animated.Value(0)).current;
  
  useEffect(() => {
    const dripAnimation = Animated.loop(
      Animated.sequence([
        Animated.timing(dripAnim, {
          toValue: 1,
          duration: 1500,
          useNativeDriver: true,
        }),
        Animated.timing(dripAnim, {
          toValue: 0,
          duration: 100,
          useNativeDriver: true,
        }),
      ])
    );
    
    dripAnimation.start();
    
    return () => dripAnimation.stop();
  }, [dripAnim]);

  const dripOpacity = dripAnim.interpolate({
    inputRange: [0, 0.8, 1],
    outputRange: [0, 0.8, 0],
  });

  const dripScale = dripAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0.5, 1.2],
  });

  return (
    <View style={styles.faucetContainer}>
      {/* Wall mounting background */}
      <View style={styles.wallBackground} />
      
      {/* Wall mounting plate */}
      <View style={styles.wallPlate}>
        {/* Mounting screws */}
        <View style={[styles.screw, { top: 2, left: 8 }]} />
        <View style={[styles.screw, { top: 2, right: 8 }]} />
        <View style={[styles.screw, { bottom: 2, left: 8 }]} />
        <View style={[styles.screw, { bottom: 2, right: 8 }]} />
      </View>
      
      {/* Main faucet assembly */}
      <View style={styles.faucetAssembly}>
        {/* Water inlet pipe */}
        <View style={styles.inletPipe}>
          <View style={styles.pipeJoint} />
          <View style={styles.pipeHighlight} />
        </View>
        
        {/* Main body */}
        <View style={styles.mainBody}>
          {/* Body highlight */}
          <View style={styles.bodyHighlight} />
          
          {/* Control handle */}
          <View style={styles.controlHandle}>
            <View style={styles.handleGrip} />
            <View style={styles.handleHighlight} />
          </View>
          
          {/* Spout assembly */}
          <View style={styles.spoutAssembly}>
            <View style={styles.spout}>
              <View style={styles.spoutHighlight} />
              
              {/* Spout tip with aerator */}
              <View style={styles.spoutTip}>
                <View style={styles.aerator}>
                  {/* Aerator holes */}
                  <View style={[styles.aeratorHole, { top: 2, left: 2 }]} />
                  <View style={[styles.aeratorHole, { top: 2, right: 2 }]} />
                  <View style={[styles.aeratorHole, { bottom: 2, left: 2 }]} />
                  <View style={[styles.aeratorHole, { bottom: 2, right: 2 }]} />
                  <View style={[styles.aeratorHole, { top: 2, left: '50%', marginLeft: -1 }]} />
                  <View style={[styles.aeratorHole, { bottom: 2, left: '50%', marginLeft: -1 }]} />
                </View>
                
                {/* Water outlet opening */}
                <View style={styles.waterOutlet} />
              </View>
            </View>
          </View>
        </View>
        
        {/* Decorative brand ring */}
        <View style={styles.decorativeRing}>
          <View style={styles.brandMark} />
        </View>
      </View>
      
      {/* Animated water dripping */}
      <Animated.View 
        style={[
          styles.dripIndicator,
          {
            opacity: dripOpacity,
            transform: [{ scale: dripScale }],
          }
        ]}
      >
        <View style={styles.waterDrop} />
      </Animated.View>
      
      {/* Small puddle effect */}
      <View style={styles.puddleContainer}>
        <View style={styles.puddle} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  faucetContainer: {
    position: 'absolute',
    top: 15,
    left: screenWidth / 2 - 60,
    alignItems: 'center',
    zIndex: 15,
  },
  wallBackground: {
    position: 'absolute',
    top: -5,
    width: 100,
    height: 25,
    backgroundColor: '#F5F5F5',
    borderRadius: 12,
    elevation: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  wallPlate: {
    width: 90,
    height: 15,
    backgroundColor: '#E8E8E8',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#D0D0D0',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    position: 'relative',
  },
  screw: {
    position: 'absolute',
    width: 4,
    height: 4,
    backgroundColor: '#A0A0A0',
    borderRadius: 2,
    borderWidth: 0.5,
    borderColor: '#808080',
  },
  faucetAssembly: {
    marginTop: -8,
    alignItems: 'center',
  },
  inletPipe: {
    width: 22,
    height: 30,
    backgroundColor: '#C8C8C8',
    borderRadius: 11,
    borderWidth: 1,
    borderColor: '#A8A8A8',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    position: 'relative',
  },
  pipeJoint: {
    position: 'absolute',
    bottom: -2,
    left: 2,
    right: 2,
    height: 4,
    backgroundColor: '#B0B0B0',
    borderRadius: 2,
  },
  pipeHighlight: {
    position: 'absolute',
    top: 3,
    left: 3,
    width: 4,
    height: 20,
    backgroundColor: '#E0E0E0',
    borderRadius: 2,
    opacity: 0.7,
  },
  mainBody: {
    width: 40,
    height: 35,
    backgroundColor: '#D8D8D8',
    borderRadius: 10,
    marginTop: -8,
    borderWidth: 1,
    borderColor: '#B8B8B8',
    elevation: 5,
    position: 'relative',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },
  bodyHighlight: {
    position: 'absolute',
    top: 2,
    left: 2,
    width: 8,
    height: 25,
    backgroundColor: '#F0F0F0',
    borderRadius: 4,
    opacity: 0.6,
  },
  controlHandle: {
    position: 'absolute',
    top: 10,
    right: -18,
    width: 28,
    height: 15,
    backgroundColor: '#D0D0D0',
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#B0B0B0',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  handleGrip: {
    position: 'absolute',
    top: 2,
    left: 2,
    right: 2,
    bottom: 2,
    backgroundColor: '#C0C0C0',
    borderRadius: 12,
  },
  handleHighlight: {
    position: 'absolute',
    top: 3,
    left: 3,
    width: 4,
    height: 8,
    backgroundColor: '#E8E8E8',
    borderRadius: 2,
    opacity: 0.8,
  },
  spoutAssembly: {
    position: 'absolute',
    bottom: -20,
    left: 2,
    alignItems: 'center',
  },
  spout: {
    width: 30,
    height: 22,
    backgroundColor: '#D8D8D8',
    borderRadius: 15,
    borderWidth: 1,
    borderColor: '#B8B8B8',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    position: 'relative',
  },
  spoutHighlight: {
    position: 'absolute',
    top: 2,
    left: 2,
    width: 6,
    height: 15,
    backgroundColor: '#F0F0F0',
    borderRadius: 3,
    opacity: 0.6,
  },
  spoutTip: {
    position: 'absolute',
    bottom: -8,
    left: 8,
    width: 14,
    height: 12,
    backgroundColor: '#C8C8C8',
    borderRadius: 7,
    borderWidth: 1,
    borderColor: '#A8A8A8',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  aerator: {
    width: 10,
    height: 8,
    backgroundColor: '#B0B0B0',
    borderRadius: 5,
    position: 'relative',
  },
  aeratorHole: {
    position: 'absolute',
    width: 1,
    height: 1,
    backgroundColor: '#333',
    borderRadius: 0.5,
  },
  waterOutlet: {
    position: 'absolute',
    bottom: -2,
    left: 6,
    width: 2,
    height: 2,
    backgroundColor: '#333',
    borderRadius: 1,
  },
  decorativeRing: {
    position: 'absolute',
    top: 20,
    width: 45,
    height: 4,
    backgroundColor: '#E8E8E8',
    borderRadius: 2,
    borderWidth: 0.5,
    borderColor: '#D0D0D0',
    elevation: 1,
  },
  brandMark: {
    position: 'absolute',
    top: 0.5,
    left: 20,
    width: 5,
    height: 2,
    backgroundColor: '#A0A0A0',
    borderRadius: 1,
  },
  dripIndicator: {
    marginTop: 12,
    alignItems: 'center',
  },
  waterDrop: {
    width: 6,
    height: 8,
    backgroundColor: gameConfig.colors.cleanWater,
    borderRadius: 3,
    borderTopLeftRadius: 6,
    borderTopRightRadius: 6,
    borderBottomLeftRadius: 3,
    borderBottomRightRadius: 3,
    elevation: 2,
    shadowColor: gameConfig.colors.cleanWater,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.5,
    shadowRadius: 2,
  },
  puddleContainer: {
    marginTop: 8,
    alignItems: 'center',
  },
  puddle: {
    width: 20,
    height: 4,
    backgroundColor: gameConfig.colors.cleanWater,
    borderRadius: 10,
    opacity: 0.3,
    elevation: 1,
  },
});