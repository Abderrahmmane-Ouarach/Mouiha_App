import React from 'react';
import {
  Dimensions,
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { gameConfig } from '../config/GameConfig';
import { LevelCompleteModalProps } from '../types/GameTypes';

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
          <ScrollView 
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.scrollContent}
          >
            {/* Header with custom icon */}
            <View style={styles.headerContainer}>
              <View style={styles.resultIcon}>
                <View style={[styles.iconShape, canAdvance ? styles.successIcon : styles.retryIcon]} />
              </View>
              <Text style={styles.title}>
                {canAdvance ? 'أحسنت!' : 'حاول مرة أخرى'}
              </Text>
            </View>

            {/* Compact Stats with Water Data */}
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
                
                <View style={styles.statBubble}>
                  <View style={styles.statIconClean} />
                  <Text style={styles.statValue}>{data.waterCollected}</Text>
                  <Text style={styles.statLabel}>نظيفة</Text>
                </View>
                
                <View style={styles.statBubble}>
                  <View style={styles.statIconPolluted} />
                  <Text style={styles.statValue}>{data.pollutedWaterCollected}</Text>
                  <Text style={styles.statLabel}>ملوثة</Text>
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

            {/* Water Conservation Tips Section */}
            <View style={styles.tipsContainer}>
              <View style={styles.tipsHeader}>
                <View style={styles.tipIcon} />
                <Text style={styles.tipsTitle}>نصائح توفير المياه</Text>
              </View>
              
              <View style={styles.tipsList}>
                <View style={styles.tipItem}>
                  <Text style={styles.tipText}>{data.content.tip}</Text>
                </View>
              </View>
              
              <View style={styles.factContainer}>
                <View style={styles.factIcon} />
                <Text style={styles.factTitle}>هل تعلم؟</Text>
                <Text style={styles.factText}>{data.content.fact}</Text>
              </View>
            </View>

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
          </ScrollView>
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
    width: screenWidth * 0.88,
    maxWidth: 360,
    maxHeight: '85%',
    backgroundColor: gameConfig.colors.white,
    borderRadius: 20,
    elevation: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 15,
    borderWidth: 3,
    borderColor: gameConfig.colors.primary,
  },
  scrollContent: {
    padding: 18,
  },
  headerContainer: {
    alignItems: 'center',
    marginBottom: 16,
  },
  resultIcon: {
    marginBottom: 8,
  },
  iconShape: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  successIcon: {
    backgroundColor: gameConfig.colors.secondary,
  },
  retryIcon: {
    backgroundColor: gameConfig.colors.primary,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: gameConfig.colors.primary,
    textAlign: 'right',
    writingDirection: 'rtl',
  },
  statsContainer: {
    marginBottom: 12,
  },
  statRow: {
    flexDirection: 'row-reverse',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  statBubble: {
    alignItems: 'center',
    backgroundColor: '#F0F8FF',
    paddingVertical: 8,
    paddingHorizontal: 4,
    borderRadius: 10,
    minWidth: 55,
    borderWidth: 1,
    borderColor: 'rgba(74, 144, 226, 0.3)',
    elevation: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 1,
  },
  statIconScore: {
    width: 12,
    height: 12,
    backgroundColor: gameConfig.colors.secondary,
    borderRadius: 6,
    marginBottom: 3,
  },
  statIconWater: {
    width: 12,
    height: 12,
    backgroundColor: gameConfig.colors.cleanWater,
    borderRadius: 6,
    marginBottom: 3,
  },
  statIconClean: {
    width: 12,
    height: 12,
    backgroundColor: gameConfig.colors.cleanWater,
    borderRadius: 6,
    marginBottom: 3,
  },
  statIconPolluted: {
    width: 12,
    height: 12,
    backgroundColor: gameConfig.colors.pollutedWater,
    borderRadius: 6,
    marginBottom: 3,
  },
  statValue: {
    fontSize: 12,
    fontWeight: 'bold',
    color: gameConfig.colors.primary,
    marginBottom: 1,
    writingDirection: 'rtl',
    textAlign: 'right',
  },
  statLabel: {
    fontSize: 9,
    color: gameConfig.colors.text,
    fontWeight: '600',
    writingDirection: 'rtl',
    textAlign: 'right',
  },
  percentageContainer: {
    alignItems: 'center',
    backgroundColor: '#F8F9FF',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 12,
  },
  percentageLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: gameConfig.colors.text,
    marginBottom: 2,
    textAlign: 'right',
    writingDirection: 'rtl',
  },
  percentageValue: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'right',
    writingDirection: 'rtl',
  },
  requirementText: {
    fontSize: 12,
    color: gameConfig.colors.danger,
    textAlign: 'right',
    marginBottom: 12,
    fontWeight: '600',
    backgroundColor: '#FFE6E6',
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: gameConfig.colors.danger,
  },
  tipsContainer: {
    backgroundColor: '#F0F8FF',
    padding: 14,
    borderRadius: 12,
    marginBottom: 16,
    borderRightWidth: 3,
    borderRightColor: gameConfig.colors.primary,
  },
  tipsHeader: {
    flexDirection: 'row-reverse',
    alignItems: 'center',
    marginBottom: 10,
  },
  tipIcon: {
    width: 16,
    height: 20,
    backgroundColor: gameConfig.colors.cleanWater,
    borderRadius: 8,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    borderBottomLeftRadius: 3,
    borderBottomRightRadius: 3,
    marginLeft: 8,
  },
  tipsTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: gameConfig.colors.primary,
    textAlign: 'right',
    writingDirection: 'rtl',
  },
  tipsList: {
    marginBottom: 10,
  },
  tipItem: {
    flexDirection: 'row-reverse',
    alignItems: 'flex-start',
    marginBottom: 6,
  },
  tipBullet: {
    width: 6,
    height: 6,
    backgroundColor: gameConfig.colors.secondary,
    borderRadius: 3,
    marginTop: 6,
    marginRight: 8,
  },
  tipText: {
    fontSize: 12,
    color: gameConfig.colors.text,
    flex: 1,
    lineHeight: 18,
    textAlign: 'right',
    writingDirection: 'rtl',
  },
  factContainer: {
    flexDirection: 'row-reverse',
    alignItems: 'flex-start',
    padding: 8,
    borderRadius: 8,
  },
  factIcon: {
    width: 14,
    height: 14,
    backgroundColor: gameConfig.colors.primary,
    borderRadius: 7,
    marginTop: 2,
    marginLeft: 6,
  },
  factTitle: {
    fontSize: 12,
    fontWeight: 'bold',
    color: gameConfig.colors.primary,
    marginLeft: 6,
    textAlign: 'right',
    writingDirection: 'rtl',
  },
  factText: {
    fontSize: 12,
    color: gameConfig.colors.text,
    flex: 1,
    textAlign: 'right',
    lineHeight: 16,
    writingDirection: 'rtl',
  },
  buttonsContainer: {
    gap: 8,
    alignItems: 'stretch',
  },
  button: {
    paddingVertical: 12,
    paddingHorizontal: 18,
    borderRadius: 15,
    alignItems: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    borderWidth: 2,
    borderColor: 'rgba(255, 255, 255, 0.3)',
  },
  nextLevelButton: {
    backgroundColor: gameConfig.colors.secondary,
  },
  nextLevelButtonText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: gameConfig.colors.white,
  },
  retryButton: {
    backgroundColor: gameConfig.colors.primary,
  },
  retryButtonText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: gameConfig.colors.white,
  },
  menuButton: {
    backgroundColor: '#8B9DC3',
  },
  menuButtonText: {
    fontSize: 13,
    fontWeight: '600',
    color: gameConfig.colors.white,
  },
});