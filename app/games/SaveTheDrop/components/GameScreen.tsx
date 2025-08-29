// components/GameScreen.tsx
import React from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { gameConfig } from '../config/GameConfig';
import { GameScreenProps } from '../types/GameTypes';
import { DropComponent } from './DropComponent';
import { Faucet } from './Faucet';
import { WaterContainer } from './WaterContainer';
export const GameScreen: React.FC<GameScreenProps> = ({
  currentLevel,
  score,
  waterCollected,
  pollutedWaterCollected,
  waterTarget,
  droppedCleanWater,
  maxDroppedCleanWater,
  drops,
  onDropTap,
  onLeaveGame,
}) => {
  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        {/* Reorganized Header */}
        <View style={styles.header}>
          {/* Left side - Back arrow button */}
          <TouchableOpacity
            style={styles.backButton}
            onPress={onLeaveGame}
            activeOpacity={0.7}
          >
            <View style={styles.arrowIcon}>
              <View style={styles.arrowLine} />
              <View style={styles.arrowHead} />
            </View>
          </TouchableOpacity>
          
          {/* Center - Score with stars */}
          <View style={styles.centerContainer}>
            <View style={styles.scoreBubble}>
              <Text style={styles.scoreValue}>{score}</Text>
              <Text style={styles.scoreLabel}>النقاط</Text>
            </View>
          </View>
          
          {/* Right side - Level with decoration */}
          <View style={styles.rightContainer}>
            <View style={styles.levelBubble}>
              <Text style={styles.levelValue}>{currentLevel}</Text>
              <Text style={styles.levelLabel}>المستوى</Text>
            </View>
          </View>
        </View>

        {/* Drop Counter Warning */}
        <View style={styles.warningContainer}>
          <View style={[
            styles.dropCounterBubble,
            droppedCleanWater >= maxDroppedCleanWater - 1 ? styles.dangerBubble : {}
          ]}>
            <View style={styles.dropIcon} />
            <Text style={[
              styles.dropCounterText,
              droppedCleanWater >= maxDroppedCleanWater - 1 ? styles.dangerText : {}
            ]}>
              قطرات مفقودة: {droppedCleanWater}/{maxDroppedCleanWater}
            </Text>
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
                    {Array.from({ length: 8 }, (_, i) => (
                      <View
                        key={i}
                        style={[styles.grateBar, { top: 6 + (i * 5) }]}
                      />
                    ))}
                  </View>
                  
                  {/* Vertical grate bars - more bars for wider drain */}
                  <View style={styles.verticalGrate}>
                    {Array.from({ length: 130 }, (_, i) => (
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

      </SafeAreaView>
    </SafeAreaProvider>
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
    paddingHorizontal: 15,
    paddingTop: 15,
    paddingBottom: 15,
    backgroundColor: gameConfig.colors.white,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 6,
  },
  backButton: {
    width: 44,
    height: 44,
    backgroundColor: gameConfig.colors.danger,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    borderWidth: 2,
    borderColor: 'rgba(255, 255, 255, 0.3)',
  },
  arrowIcon: {
    position: 'relative',
    width: 20,
    height: 14,
  },
  arrowLine: {
    position: 'absolute',
    left: 5,
    top: 6,
    width: 12,
    height: 2,
    backgroundColor: gameConfig.colors.white,
    borderRadius: 1,
  },
  arrowHead: {
    position: 'absolute',
    left: 2,
    top: 3,
    width: 8,
    height: 8,
    backgroundColor: 'transparent',
    borderLeftWidth: 3,
    borderTopWidth: 3,
    borderLeftColor: gameConfig.colors.white,
    borderTopColor: gameConfig.colors.white,
    transform: [{ rotate: '-45deg' }],
  },
  centerContainer: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  scoreBubble: {
    alignItems: 'center',
    backgroundColor: '#FFF8E6',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    left:-50,
    borderWidth: 2,
    borderColor: gameConfig.colors.secondary,
    minWidth: 100,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  scoreIconContainer: {
    position: 'relative',
    marginBottom: 4,
  },
  scoreIcon: {
    width: 16,
    height: 16,
    backgroundColor: gameConfig.colors.secondary,
    borderRadius: 8,
  },
  scoreStar: {
    position: 'absolute',
    top: -2,
    right: -2,
    width: 8,
    height: 8,
    backgroundColor: '#FFD700',
    borderRadius: 4,
    borderWidth: 1,
    borderColor: gameConfig.colors.white,
  },
  scoreValue: {
    fontSize: 20,
    color: gameConfig.colors.secondary,
    fontFamily: 'Tajawal-Bold',
    marginBottom: 2,
  },
  scoreLabel: {
    fontSize: 11,
    color: gameConfig.colors.text,
    fontFamily: 'Tajawal-Medium',
  },
  rightContainer: {
    alignItems: 'center',
  },
  levelBubble: {
    alignItems: 'center',
    backgroundColor: '#E6F3FF',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: gameConfig.colors.primary,
    minWidth: 90,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    right:100,
  },
  levelIconContainer: {
    marginBottom: 4,
  },
  levelIcon: {
    width: 16,
    height: 20,
    backgroundColor: gameConfig.colors.primary,
    borderRadius: 8,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    borderBottomLeftRadius: 3,
    borderBottomRightRadius: 3,
  },
  levelValue: {
    fontSize: 20,
    color: gameConfig.colors.primary,
    fontFamily: 'Tajawal-Bold',
    marginBottom: 2,
  },
  levelLabel: {
    fontSize: 11,
    color: gameConfig.colors.text,
    fontFamily: 'Tajawal-Medium',
  },
  warningContainer: {
    paddingHorizontal: 15,
    paddingVertical: 8,
    backgroundColor: gameConfig.colors.white,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0,0,0,0.1)',
  },
  dropCounterBubble: {
    flexDirection: 'row-reverse',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#E6F3FF',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 15,
    borderWidth: 2,
    borderColor: gameConfig.colors.primary,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  dangerBubble: {
    backgroundColor: '#FFE6E6',
    borderColor: gameConfig.colors.danger,
  },
  dropIcon: {
    width: 12,
    height: 15,
    backgroundColor: gameConfig.colors.cleanWater,
    borderRadius: 6,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    borderBottomLeftRadius: 3,
    borderBottomRightRadius: 3,
    marginLeft: 8,
  },
  dropCounterText: {
    fontSize: 14,
    fontFamily: 'Tajawal-Bold',
    color: gameConfig.colors.primary,
    textAlign: 'right',
    writingDirection: 'rtl',
  },
  dangerText: {
    color: gameConfig.colors.danger,
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