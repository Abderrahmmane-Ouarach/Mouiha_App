// components/StartScreen.tsx
import { useNavigation } from '@react-navigation/native';
import React from 'react';
import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { gameConfig } from '../config/GameConfig';
import { StartScreenProps } from '../types/GameTypes';

const { width: screenWidth } = Dimensions.get('window');

export const StartScreen: React.FC<StartScreenProps> = ({ onStartGame }) => {
  const navigation = useNavigation();
  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
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
              <View style={styles.cuteDrop}>
                <View style={styles.dropBody} />
                <View style={styles.dropTip} />
                <View style={styles.highlight} />
                <View style={styles.eyeLeft} />
                <View style={styles.eyeRight} />
                <View style={styles.smile} />
                <View style={styles.cheekLeft} />
                <View style={styles.cheekRight} />
              </View>
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

        {/* Games List Button */}
        <TouchableOpacity
          style={styles.menuButton}
          onPress={() => navigation.navigate('GameHome' as never)}
          activeOpacity={0.8}
        >
          <Text style={styles.menuButtonText}>قائمة الألعاب</Text>
        </TouchableOpacity>
      </SafeAreaView>
    </SafeAreaProvider>
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
    fontFamily: 'Tajawal-Bold',
    color: gameConfig.colors.primary,
    textAlign: 'center',
  },
  titleSubtext: {
    fontSize: 16,
    color: gameConfig.colors.secondary,
    fontFamily: 'Tajawal-Medium',
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
  cuteDrop: {
    width: 90,
    height: 110,
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  dropBody: {
    position: 'absolute',
    bottom: 0,
    width: 90,
    height: 90,
    backgroundColor: gameConfig.colors.cleanWater,
    borderRadius: 45,
    borderWidth: 3,
    borderColor: 'rgba(74, 144, 226, 0.5)',
  },
  dropTip: {
    position: 'absolute',
    top: 4,
    left: 32,
    width: 26,
    height: 26,
    backgroundColor: gameConfig.colors.cleanWater,
    borderRadius: 13,
    transform: [{ rotate: '45deg' }],
    borderWidth: 3,
    borderColor: 'rgba(74, 144, 226, 0.5)',
  },
  highlight: {
    position: 'absolute',
    top: 34,
    left: 20,
    width: 16,
    height: 8,
    backgroundColor: 'rgba(255,255,255,0.7)',
    borderRadius: 6,
  },
  eyeLeft: {
    position: 'absolute',
    top: 54,
    left: 26,
    width: 10,
    height: 10,
    backgroundColor: '#1b4f9c',
    borderRadius: 5,
  },
  eyeRight: {
    position: 'absolute',
    top: 54,
    right: 26,
    width: 10,
    height: 10,
    backgroundColor: '#1b4f9c',
    borderRadius: 5,
  },
  smile: {
    position: 'absolute',
    top: 70,
    left: 31,
    width: 28,
    height: 14,
    borderBottomWidth: 3,
    borderColor: '#1b4f9c',
    borderRadius: 14,
  },
  cheekLeft: {
    position: 'absolute',
    top: 66,
    left: 18,
    width: 8,
    height: 8,
    backgroundColor: '#ffd1d9',
    borderRadius: 4,
  },
  cheekRight: {
    position: 'absolute',
    top: 66,
    right: 18,
    width: 8,
    height: 8,
    backgroundColor: '#ffd1d9',
    borderRadius: 4,
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
    fontFamily: 'Tajawal-Medium',
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
    marginBottom: 20,
    borderWidth: 3,
    borderColor: 'rgba(255, 255, 255, 0.3)',
  },
  playButtonText: {
    fontSize: 22,
    fontFamily: 'Tajawal-Bold',
    color: gameConfig.colors.white,
    textAlign: 'center',
  },
  menuButton: {
    backgroundColor: '#8B9DC3',
    paddingVertical: 18,
    paddingHorizontal: 25,
    borderRadius: 35,
    borderWidth: 3,
    borderColor: 'rgba(255, 255, 255, 0.3)',
    marginTop: -10,
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
  },
  menuButtonText: {
    fontSize: 22,
    fontFamily: 'Tajawal-Bold',
    color: gameConfig.colors.white,
    textAlign: 'center',
  },
});