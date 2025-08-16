// components/LevelCompleteModal.tsx
import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  StyleSheet,
  Dimensions,
  ScrollView,
} from 'react-native';
import { LevelCompleteModalProps } from '../types/GameTypes';
import { gameConfig } from '../config/GameConfig';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

export const LevelCompleteModal: React.FC<LevelCompleteModalProps> = ({
  visible,
  data,
  onNextLevel,
  onBackToMenu,
}) => {
  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="fade"
      statusBarTranslucent={true}
    >
      <View style={styles.overlay}>
        <View style={styles.modalContainer}>
          <ScrollView showsVerticalScrollIndicator={false}>
            {/* Success Header */}
            <View style={styles.headerContainer}>
              <Text style={styles.celebrationEmoji}>🎉</Text>
              <Text style={styles.successTitle}>مبروك!</Text>
              <Text style={styles.successSubtitle}>Level {data.level} Complete!</Text>
            </View>

            {/* Performance Stats */}
            <View style={styles.statsContainer}>
              <View style={styles.statRow}>
                <View style={styles.statItem}>
                  <Text style={styles.statLabel}>النقاط</Text>
                  <Text style={styles.statValue}>{data.score}</Text>
                </View>
                <View style={styles.statItem}>
                  <Text style={styles.statLabel}>المياه المجمعة</Text>
                  <Text style={styles.statValue}>{data.waterCollected}/{data.waterTarget}</Text>
                </View>
              </View>
              
              <View style={styles.percentageContainer}>
                <Text style={styles.percentageLabel}>نظافة المياه</Text>
                <Text style={styles.percentageValue}>{data.waterPercentage}%</Text>
                <View style={styles.progressBar}>
                  <View 
                    style={[
                      styles.progressFill, 
                      { width: `${data.waterPercentage}%` }
                    ]} 
                  />
                </View>
              </View>
            </View>

            {/* Educational Content */}
            <View style={styles.educationalContainer}>
              <View style={styles.educationalHeader}>
                <Text style={styles.educationalIcon}>📚</Text>
                <Text style={styles.educationalTitle}>{data.content.title}</Text>
              </View>
              
              <Text style={styles.educationalDescription}>
                {data.content.description}
              </Text>
              
              <View style={styles.tipContainer}>
                <Text style={styles.tipIcon}>💡</Text>
                <Text style={styles.tipTitle}>نصيحة:</Text>
                <Text style={styles.tipText}>{data.content.tip}</Text>
              </View>
              
              <View style={styles.factContainer}>
                <Text style={styles.factIcon}>🔍</Text>
                <Text style={styles.factTitle}>هل تعلم؟</Text>
                <Text style={styles.factText}>{data.content.fact}</Text>
              </View>
            </View>

            {/* Action Buttons */}
            <View style={styles.buttonsContainer}>
              <TouchableOpacity
                style={[styles.button, styles.nextLevelButton]}
                onPress={onNextLevel}
                activeOpacity={0.8}
              >
                <Text style={styles.nextLevelButtonText}>المستوى التالي</Text>
                <Text style={styles.nextLevelButtonSubtext}>NEXT LEVEL</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.button, styles.menuButton]}
                onPress={onBackToMenu}
                activeOpacity={0.8}
              >
                <Text style={styles.menuButtonText}>القائمة الرئيسية</Text>
                <Text style={styles.menuButtonSubtext}>MAIN MENU</Text>
              </TouchableOpacity>
            </View>

            {/* Decorative water drops */}
            <View style={styles.decorationContainer}>
              <Text style={styles.decorationEmoji}>💧</Text>
              <Text style={styles.decorationEmoji}>🌊</Text>
              <Text style={styles.decorationEmoji}>💧</Text>
              <Text style={styles.decorationEmoji}>🌍</Text>
              <Text style={styles.decorationEmoji}>💧</Text>
            </View>
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.85)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    width: screenWidth * 0.92,
    maxWidth: 420,
    maxHeight: screenHeight * 0.9,
    backgroundColor: gameConfig.colors.white,
    borderRadius: 20,
    padding: 24,
    elevation: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
  },
  headerContainer: {
    alignItems: 'center',
    marginBottom: 24,
  },
  celebrationEmoji: {
    fontSize: 40,
    marginBottom: 8,
  },
  successTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: gameConfig.colors.secondary,
    textAlign: 'center',
  },
  successSubtitle: {
    fontSize: 18,
    color: gameConfig.colors.primary,
    textAlign: 'center',
    marginTop: 4,
    opacity: 0.8,
  },
  statsContainer: {
    backgroundColor: '#F8F9FF',
    padding: 20,
    borderRadius: 15,
    marginBottom: 20,
  },
  statRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
  },
  statItem: {
    alignItems: 'center',
  },
  statLabel: {
    fontSize: 14,
    color: gameConfig.colors.text,
    fontWeight: '500',
    marginBottom: 5,
  },
  statValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: gameConfig.colors.primary,
  },
  percentageContainer: {
    alignItems: 'center',
  },
  percentageLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: gameConfig.colors.text,
    marginBottom: 8,
  },
  percentageValue: {
    fontSize: 32,
    fontWeight: 'bold',
    color: gameConfig.colors.secondary,
    marginBottom: 10,
  },
  progressBar: {
    width: '100%',
    height: 8,
    backgroundColor: '#E0E0E0',
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: gameConfig.colors.secondary,
    borderRadius: 4,
  },
  educationalContainer: {
    backgroundColor: '#F0F8FF',
    padding: 20,
    borderRadius: 15,
    marginBottom: 24,
    borderLeftWidth: 4,
    borderLeftColor: gameConfig.colors.primary,
  },
  educationalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  educationalIcon: {
    fontSize: 24,
    marginRight: 8,
  },
  educationalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: gameConfig.colors.primary,
    flex: 1,
  },
  educationalDescription: {
    fontSize: 16,
    lineHeight: 24,
    color: gameConfig.colors.text,
    marginBottom: 16,
    textAlign: 'right',
  },
  tipContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: gameConfig.colors.white,
    padding: 12,
    borderRadius: 10,
    marginBottom: 12,
  },
  tipIcon: {
    fontSize: 16,
    marginRight: 8,
    marginTop: 2,
  },
  tipTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: gameConfig.colors.secondary,
    marginRight: 8,
  },
  tipText: {
    fontSize: 14,
    color: gameConfig.colors.text,
    flex: 1,
    textAlign: 'right',
  },
  factContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: gameConfig.colors.white,
    padding: 12,
    borderRadius: 10,
  },
  factIcon: {
    fontSize: 16,
    marginRight: 8,
    marginTop: 2,
  },
  factTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: gameConfig.colors.primary,
    marginRight: 8,
  },
  factText: {
    fontSize: 14,
    color: gameConfig.colors.text,
    flex: 1,
    textAlign: 'right',
  },
  buttonsContainer: {
    gap: 12,
    marginBottom: 20,
  },
  button: {
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 12,
    alignItems: 'center',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  nextLevelButton: {
    backgroundColor: gameConfig.colors.secondary,
  },
  nextLevelButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: gameConfig.colors.white,
  },
  nextLevelButtonSubtext: {
    fontSize: 12,
    color: gameConfig.colors.white,
    marginTop: 2,
    opacity: 0.9,
  },
  menuButton: {
    backgroundColor: gameConfig.colors.primary,
  },
  menuButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: gameConfig.colors.white,
  },
  menuButtonSubtext: {
    fontSize: 11,
    color: gameConfig.colors.white,
    marginTop: 2,
    opacity: 0.9,
  },
  decorationContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    opacity: 0.6,
  },
  decorationEmoji: {
    fontSize: 18,
  },
});