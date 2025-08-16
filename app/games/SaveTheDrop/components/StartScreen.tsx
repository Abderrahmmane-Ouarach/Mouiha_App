// components/StartScreen.tsx
import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from 'react-native';
import { StartScreenProps } from '../types/GameTypes';
import { gameConfig } from '../config/GameConfig';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

export const StartScreen: React.FC<StartScreenProps> = ({ onStartGame }) => {
  return (
    <View style={styles.container}>
      {/* Decorative clouds */}
      <View style={styles.cloudsContainer}>
        <View style={[styles.cloud, styles.cloud1]} />
        <View style={[styles.cloud, styles.cloud2]} />
        <View style={[styles.cloud, styles.cloud3]} />
      </View>

      {/* Game Title */}
      <View style={styles.titleContainer}>
        <View style={styles.titleBubble}>
          <Text style={styles.titleArabic}>احفظ القطرة</Text>
          <Text style={styles.titleSubtext}>لعبة المياه المرحة</Text>
        </View>
      </View>

      {/* Game Icon/Illustration */}
      <View style={styles.iconContainer}>
        <View style={styles.mainDropContainer}>
          <View style={styles.dropIconBig}>
            <View style={styles.waterDropShape} />
          </View>
          <View style={styles.sparkles}>
            <View style={[styles.sparkle, styles.sparkle1]} />
            <View style={[styles.sparkle, styles.sparkle2]} />
            <View style={[styles.sparkle, styles.sparkle3]} />
          </View>
        </View>
        <View style={styles.tapIcon}>
          <View style={styles.faucetShape} />
        </View>
      </View>

      {/* Instructions */}
      <View style={styles.instructionsContainer}>
        <View style={styles.instructionBubble}>
          <Text style={styles.instructionText}>
            اضغط على قطرات الماء{'\n'}
            قبل أن تصل للمصرف!
          </Text>
        </View>
      </View>

      {/* Play Button */}
      <TouchableOpacity style={styles.playButton} onPress={onStartGame} activeOpacity={0.8}>
        <Text style={styles.playButtonText}>ابدأ اللعب</Text>
      </TouchableOpacity>

      {/* Game Info */}
      <View style={styles.gameInfoContainer}>
        <View style={styles.infoCard}>
          <View style={styles.infoIcon} />
          <Text style={styles.infoText}>احفظ القطرات</Text>
        </View>
        <View style={styles.infoCard}>
          <View style={styles.infoIcon2} />
          <Text style={styles.infoText}>احم البيئة</Text>
        </View>
      </View>

      {/* Fun waves at bottom */}
      <View style={styles.wavesContainer}>
        <View style={styles.wave} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    backgroundColor: gameConfig.colors.background,
  },
  cloudsContainer: {
    position: 'absolute',
    top: 40,
    left: 0,
    right: 0,
    height: 100,
  },
  cloud: {
    position: 'absolute',
    width: 60,
    height: 30,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    borderRadius: 20,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  cloud1: {
    top: 20,
    left: 30,
  },
  cloud2: {
    top: 10,
    right: 50,
  },
  cloud3: {
    top: 35,
    left: screenWidth / 2 - 30,
  },
  titleContainer: {
    alignItems: 'center',
    marginBottom: 30,
  },
  titleBubble: {
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    paddingHorizontal: 30,
    paddingVertical: 20,
    borderRadius: 25,
    alignItems: 'center',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    borderWidth: 3,
    borderColor: gameConfig.colors.primary,
  },
  titleArabic: {
    fontSize: 32,
    fontWeight: 'bold',
    color: gameConfig.colors.primary,
    textAlign: 'center',
  },
  titleSubtext: {
    fontSize: 16,
    color: gameConfig.colors.secondary,
    fontWeight: '600',
    marginTop: 5,
  },
  iconContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 30,
    position: 'relative',
  },
  mainDropContainer: {
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
  },
  dropIconBig: {
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    borderRadius: 50,
    padding: 20,
    elevation: 8,
    shadowColor: gameConfig.colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
  waterDropShape: {
    width: 50,
    height: 60,
    backgroundColor: gameConfig.colors.cleanWater,
    borderRadius: 25,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    borderBottomLeftRadius: 5,
    borderBottomRightRadius: 5,
    transform: [{ rotate: '45deg' }],
  },
  sparkles: {
    position: 'absolute',
    width: 120,
    height: 120,
  },
  sparkle: {
    position: 'absolute',
    width: 8,
    height: 8,
    backgroundColor: gameConfig.colors.secondary,
    borderRadius: 4,
  },
  sparkle1: {
    top: 10,
    right: 15,
  },
  sparkle2: {
    bottom: 20,
    left: 10,
    backgroundColor: gameConfig.colors.primary,
  },
  sparkle3: {
    top: 15,
    left: 15,
  },
  tapIcon: {
    position: 'absolute',
    top: -20,
    right: -10,
  },
  faucetShape: {
    width: 30,
    height: 20,
    backgroundColor: '#C8C8C8',
    borderRadius: 5,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  instructionsContainer: {
    alignItems: 'center',
    marginBottom: 30,
    paddingHorizontal: 20,
  },
  instructionBubble: {
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    paddingHorizontal: 25,
    paddingVertical: 18,
    borderRadius: 20,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    borderWidth: 2,
    borderColor: gameConfig.colors.secondary,
  },
  instructionText: {
    fontSize: 18,
    color: gameConfig.colors.text,
    textAlign: 'center',
    fontWeight: '600',
    lineHeight: 24,
  },
  playButton: {
    backgroundColor: gameConfig.colors.secondary,
    paddingVertical: 18,
    paddingHorizontal: 45,
    borderRadius: 35,
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    marginBottom: 30,
    borderWidth: 3,
    borderColor: 'rgba(255, 255, 255, 0.3)',
  },
  playButtonText: {
    fontSize: 22,
    fontWeight: 'bold',
    color: gameConfig.colors.white,
    textAlign: 'center',
  },
  gameInfoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    maxWidth: 280,
    marginBottom: 20,
  },
  infoCard: {
    alignItems: 'center',
    flex: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    marginHorizontal: 8,
    paddingVertical: 15,
    paddingHorizontal: 12,
    borderRadius: 15,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    borderWidth: 2,
    borderColor: 'rgba(74, 144, 226, 0.3)',
  },
  infoIcon: {
    width: 24,
    height: 24,
    backgroundColor: gameConfig.colors.secondary,
    borderRadius: 12,
    marginBottom: 8,
  },
  infoIcon2: {
    width: 24,
    height: 24,
    backgroundColor: gameConfig.colors.primary,
    borderRadius: 12,
    marginBottom: 8,
  },
  infoText: {
    fontSize: 13,
    color: gameConfig.colors.text,
    textAlign: 'center',
    fontWeight: '600',
  },
  wavesContainer: {
    position: 'absolute',
    bottom: 20,
    alignItems: 'center',
  },
  wave: {
    width: 200,
    height: 15,
    backgroundColor: 'rgba(30, 144, 255, 0.3)',
    borderRadius: 10,
    marginBottom: 5,
  },
});