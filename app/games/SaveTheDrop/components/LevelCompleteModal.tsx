import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  StyleSheet,
  Dimensions,
} from 'react-native';
import { LevelCompleteModalProps } from '../types/GameTypes';
import { gameConfig } from '../config/GameConfig';

const { width: screenWidth } = Dimensions.get('window');

export const LevelCompleteModal: React.FC<LevelCompleteModalProps> = ({
  visible,
  data,
  onNextLevel,
  onRetryLevel,
  onBackToMenu,
}) => {
  const canAdvance = data.canAdvance;
  
  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="fade"
      statusBarTranslucent={true}
    >
      <View style={styles.overlay}>
        <View style={styles.modalContainer}>
          {/* Header with custom icon */}
          <View style={styles.headerContainer}>
            <View style={styles.resultIcon}>
              <View style={[styles.iconShape, canAdvance ? styles.successIcon : styles.retryIcon]} />
            </View>
            <Text style={styles.title}>
              {canAdvance ? 'أحسنت!' : 'حاول مرة أخرى'}
            </Text>
          </View>

          {/* Expanded Stats with Water Data */}
          <View style={styles.statsContainer}>
            <View style={styles.statRow}>
              <View style={styles.statBubble}>
                <View style={styles.statIconScore} />
                <Text style={styles.statValue}>{data.score}</Text>
                <Text style={styles.statLabel}>نقاط</Text>
              </View>
              
              <View style={styles.statBubble}>
                <View style={styles.statIconWater} />
                <Text style={styles.statValue}>{data.totalWater}/{data.waterTarget}</Text>
                <Text style={styles.statLabel}>مياه</Text>
              </View>
            </View>
            
            <View style={styles.statRow}>
              <View style={styles.statBubble}>
                <View style={styles.statIconClean} />
                <Text style={styles.statValue}>{data.waterCollected}</Text>
                <Text style={styles.statLabel}>مياه نظيفة</Text>
              </View>
              
              <View style={styles.statBubble}>
                <View style={styles.statIconPolluted} />
                <Text style={styles.statValue}>{data.pollutedWaterCollected}</Text>
                <Text style={styles.statLabel}>مياه ملوثة</Text>
              </View>
            </View>
            
            <View style={styles.percentageContainer}>
              <Text style={styles.percentageLabel}>نسبة النظافة</Text>
              <Text style={[
                styles.percentageValue,
                { color: canAdvance ? gameConfig.colors.secondary : gameConfig.colors.danger }
              ]}>
                {data.cleanWaterPercentage}%
              </Text>
            </View>
          </View>

          {!canAdvance && (
            <Text style={styles.requirementText}>
              تحتاج 70% نظافة أو أكثر للانتقال!
            </Text>
          )}

          {/* Action Buttons */}
          <View style={styles.buttonsContainer}>
            {canAdvance ? (
              <TouchableOpacity
                style={[styles.button, styles.nextLevelButton]}
                onPress={onNextLevel}
                activeOpacity={0.8}
              >
                <Text style={styles.nextLevelButtonText}>المستوى التالي</Text>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                style={[styles.button, styles.retryButton]}
                onPress={onRetryLevel}
                activeOpacity={0.8}
              >
                <Text style={styles.retryButtonText}>حاول مرة أخرى</Text>
              </TouchableOpacity>
            )}

            <TouchableOpacity
              style={[styles.button, styles.menuButton]}
              onPress={onBackToMenu}
              activeOpacity={0.8}
            >
              <Text style={styles.menuButtonText}>القائمة الرئيسية</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    width: screenWidth * 0.85,
    maxWidth: 350,
    backgroundColor: gameConfig.colors.white,
    borderRadius: 25,
    padding: 20,
    elevation: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 15,
    borderWidth: 3,
    borderColor: gameConfig.colors.primary,
  },
  headerContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  resultIcon: {
    marginBottom: 10,
  },
  iconShape: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  successIcon: {
    backgroundColor: gameConfig.colors.secondary,
  },
  retryIcon: {
    backgroundColor: gameConfig.colors.primary,
  },
  bigEmoji: {
    fontSize: 50,
    marginBottom: 8,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: gameConfig.colors.primary,
    textAlign: 'center',
  },
  statsContainer: {
    marginBottom: 15,
  },
  statRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 12,
  },
  statBubble: {
    alignItems: 'center',
    backgroundColor: '#F0F8FF',
    paddingVertical: 10,
    paddingHorizontal: 6,
    borderRadius: 12,
    minWidth: 65,
    borderWidth: 2,
    borderColor: 'rgba(74, 144, 226, 0.3)',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  statIconScore: {
    width: 16,
    height: 16,
    backgroundColor: gameConfig.colors.secondary,
    borderRadius: 8,
    marginBottom: 4,
  },
  statIconWater: {
    width: 16,
    height: 16,
    backgroundColor: gameConfig.colors.cleanWater,
    borderRadius: 8,
    marginBottom: 4,
  },
  statIconClean: {
    width: 16,
    height: 16,
    backgroundColor: gameConfig.colors.cleanWater,
    borderRadius: 8,
    marginBottom: 4,
  },
  statIconPolluted: {
    width: 16,
    height: 16,
    backgroundColor: gameConfig.colors.pollutedWater,
    borderRadius: 8,
    marginBottom: 4,
  },
  statEmoji: {
    fontSize: 20,
    marginBottom: 4,
  },
  statValue: {
    fontSize: 14,
    fontWeight: 'bold',
    color: gameConfig.colors.primary,
    marginBottom: 2,
  },
  statLabel: {
    fontSize: 10,
    color: gameConfig.colors.text,
    fontWeight: '600',
  },
  percentageContainer: {
    alignItems: 'center',
    backgroundColor: '#F8F9FF',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 15,
    marginTop: 8,
  },
  percentageLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: gameConfig.colors.text,
    marginBottom: 4,
  },
  percentageValue: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  requirementText: {
    fontSize: 14,
    color: gameConfig.colors.danger,
    textAlign: 'center',
    marginBottom: 15,
    fontWeight: '600',
    backgroundColor: '#FFE6E6',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: gameConfig.colors.danger,
  },
  buttonsContainer: {
    gap: 10,
  },
  button: {
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderRadius: 20,
    alignItems: 'center',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    borderWidth: 2,
    borderColor: 'rgba(255, 255, 255, 0.3)',
  },
  nextLevelButton: {
    backgroundColor: gameConfig.colors.secondary,
  },
  nextLevelButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: gameConfig.colors.white,
  },
  retryButton: {
    backgroundColor: gameConfig.colors.primary,
  },
  retryButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: gameConfig.colors.white,
  },
  menuButton: {
    backgroundColor: '#8B9DC3',
  },
  menuButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: gameConfig.colors.white,
  },
});