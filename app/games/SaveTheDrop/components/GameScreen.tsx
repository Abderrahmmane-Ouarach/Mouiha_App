// components/GameScreen.tsx
import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from 'react-native';
import { GameScreenProps } from '../types/GameTypes';
import { gameConfig } from '../config/GameConfig';
import { DropComponent } from './DropComponent';
import { WaterContainer } from './WaterContainer';
import { Faucet } from './Faucet';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

export const GameScreen: React.FC<GameScreenProps> = ({
  currentLevel,
  score,
  waterCollected,
  pollutedWaterCollected,
  waterTarget,
  drops,
  onDropTap,
  onLeaveGame,
}) => {
  return (
    <View style={styles.container}>
      {/* Kid-friendly Header */}
      <View style={styles.header}>
        {/* Left side - Level with cute decoration */}
        <View style={styles.levelContainer}>
          <View style={styles.levelBubble}>
            <Text style={styles.levelLabel}>المستوى</Text>
            <Text style={styles.levelValue}>{currentLevel}</Text>
          </View>
        </View>
        
        {/* Center - Fun cancel button */}
        <TouchableOpacity
          style={styles.cancelButton}
          onPress={onLeaveGame}
          activeOpacity={0.7}
        >
          <Text style={styles.cancelButtonText}>رجوع</Text>
        </TouchableOpacity>
        
        {/* Right side - Score with stars */}
        <View style={styles.scoreContainer}>
          <View style={styles.scoreBubble}>
            <Text style={styles.scoreLabel}>النقاط</Text>
            <Text style={styles.scoreValue}>{score}</Text>
          </View>
        </View>
      </View>

      {/* Game Area */}
      <View style={styles.gameArea}>
        {/* Faucet */}
        <Faucet />

        {/* Water Container */}
        <WaterContainer 
          waterCollected={waterCollected}
          pollutedWaterCollected={pollutedWaterCollected}
          waterTarget={waterTarget}
        />

        {/* Falling Drops */}
        <View style={styles.dropsContainer}>
          {drops.map((drop) => (
            <DropComponent
              key={drop.id}
              drop={drop}
              onTap={() => onDropTap(drop.id)}
            />
          ))}
        </View>

        {/* Enhanced Realistic Drain - Full Width */}
        <View style={styles.drainContainer}>
          <View style={styles.drainSurrounding}>
            {/* Drain base - wider to cover all drop areas */}
            <View style={styles.drain}>
              {/* Main drain opening */}
              <View style={styles.drainHole}>
                {/* Inner shadow for depth */}
                <View style={styles.drainShadow} />
                
                {/* Drain grate with realistic bars */}
                <View style={styles.drainGrate}>
                  <View style={[styles.grateBar, { top: 10 }]} />
                  <View style={[styles.grateBar, { top: 18 }]} />
                  <View style={[styles.grateBar, { top: 26 }]} />
                  <View style={[styles.grateBar, { top: 34 }]} />
                  <View style={[styles.grateBar, { top: 42 }]} />
                  <View style={[styles.grateBar, { top: 50 }]} />
                </View>
                
                {/* Vertical grate bars - more bars for wider drain */}
                <View style={styles.verticalGrate}>
                  {Array.from({ length: 24 }, (_, i) => (
                    <View
                      key={i}
                      style={[styles.verticalGrateBar, { left: 10 + (i * 10) }]}
                    />
                  ))}
                </View>
              </View>
              
            </View>
          </View>
        </View>
      </View>

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: gameConfig.colors.background,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 15,
    paddingBottom: 15,
    backgroundColor: gameConfig.colors.white,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 6,
  },
  levelContainer: {
    alignItems: 'center',
  },
  levelBubble: {
    alignItems: 'center',
    backgroundColor: '#E6F3FF',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 15,
    borderWidth: 2,
    borderColor: gameConfig.colors.primary,
    minWidth: 80,
  },
  levelLabel: {
    fontSize: 12,
    color: gameConfig.colors.text,
    fontWeight: '600',
  },
  levelValue: {
    fontSize: 20,
    color: gameConfig.colors.primary,
    fontWeight: 'bold',
    marginTop: 2,
  },
  scoreContainer: {
    alignItems: 'center',
    flex: 1,
  },
  scoreBubble: {
    alignItems: 'center',
    backgroundColor: '#FFF8E6',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 15,
    borderWidth: 2,
    borderColor: gameConfig.colors.secondary,
    minWidth: 100,
  },
  scoreLabel: {
    fontSize: 12,
    color: gameConfig.colors.text,
    fontWeight: '600',
  },
  scoreValue: {
    fontSize: 20,
    color: gameConfig.colors.secondary,
    fontWeight: 'bold',
    marginTop: 2,
  },
  cancelButton: {
    width: 40,
    height: 40,
    backgroundColor: gameConfig.colors.danger,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  cancelButtonText: {
    fontSize: 18,
    color: gameConfig.colors.white,
    fontWeight: 'bold',
  },
  gameArea: {
    flex: 1,
    position: 'relative',
  },
  dropsContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  drainContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 120, // Leave space for water container
    alignItems: 'center',
    zIndex: 10,
  },
  drainSurrounding: {
    alignItems: 'center',
    width: '100%',
  },
  drain: {
    width: '90%', // Take up most of the available width
    minWidth: 280, // Ensure minimum width
    height: 70,
    backgroundColor: '#4A4A4A',
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    borderWidth: 3,
    borderColor: '#2A2A2A',
    position: 'relative',
    left: 25,
    bottom: 0,
  },
  drainHole: {
    width: '90%',
    height: 50,
    backgroundColor: '#1A1A1A',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    overflow: 'hidden',
  },
  drainShadow: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: '#000',
    borderRadius: 20,
    opacity: 0.8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.5,
    shadowRadius: 4,
  },
  drainGrate: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 2,
  },
  grateBar: {
    position: 'absolute',
    left: 2,
    right: 2,
    height: 2,
    backgroundColor: '#666',
    borderRadius: 1,
    elevation: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.3,
    shadowRadius: 1,
  },
  verticalGrate: {
    position: 'absolute',
    top: 0,
    left: -3,
    right: 0,
    bottom: 0,
    zIndex: 2,
  },
  verticalGrateBar: {
    position: 'absolute',
    top: 5,
    bottom: 0,
    width: 2,
    backgroundColor: '#666',
    borderRadius: 1,
    elevation: 1,
    shadowColor: '#000',
    shadowOffset: { width: 1, height: 0 },
    shadowOpacity: 0.3,
    shadowRadius: 1,
  },
});