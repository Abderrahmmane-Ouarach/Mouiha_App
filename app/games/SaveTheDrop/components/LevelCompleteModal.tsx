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
  const isGameOver = data.isGameOver || false;
  
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
            {canAdvance && (
            <View style={styles.headerContainer}>
              <Text style={styles.title}>
                أحسنت!
              </Text>
            </View>
            )}

            {/* Game Over Message */}
            {isGameOver && (
              <View style={styles.gameOverMessage}>
                <Text style={styles.gameOverText}>
                  فقدت الكثير من قطرات الماء النظيف!
                </Text>
                <Text style={styles.gameOverSubtext}>
                  تذكر: كل قطرة ماء مهمة للبيئة
                </Text>
              </View>
            )}

            {/* EDUCATIONAL CONTENT - Most Prominent Section */}
            <View style={styles.educationalSection}>
              <View style={styles.educationalHeader}>
                <View style={styles.lightBulbIcon} />
                <Text style={styles.educationalTitle}>معلومة مهمة</Text>
              </View>
              
              {/* Water Conservation Tip - Large and prominent */}
              <View style={styles.tipContainer}>
                <View style={styles.tipHeaderContainer}>
                  <View style={styles.tipIcon} />
                  <Text style={styles.tipHeaderText}>نصيحة للحفاظ على الماء</Text>
                </View>
                <Text style={styles.tipText}>{data.content.tip}</Text>
              </View>
              
              {/* Water Fact - Highlighted */}
              <View style={styles.factContainer}>
                <View style={styles.factHeaderContainer}>
                  <View style={styles.factIcon} />
                  <Text style={styles.factHeaderText}>هل تعلم؟</Text>
                </View>
                <Text style={styles.factText}>{data.content.fact}</Text>
              </View>
            </View>

            {/* Compact Stats */}
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
              
              <View style={styles.bottomStatsRow}>
                {data.droppedCleanWater !== undefined && (
                  <View style={styles.droppedWaterContainer}>
                    <Text style={styles.droppedWaterLabel}>قطرات مفقودة</Text>
                    <Text style={[
                      styles.droppedWaterValue,
                      { color: isGameOver ? gameConfig.colors.danger : gameConfig.colors.primary }
                    ]}>
                      {data.droppedCleanWater}
                    </Text>
                  </View>
                )}
                
                <View style={styles.percentageContainer}>
                  <Text style={styles.percentageLabel}>نسبة النظافة</Text>
                  <Text style={[
                    styles.percentageValue,
                    { color: canAdvance && !isGameOver ? gameConfig.colors.secondary : gameConfig.colors.danger }
                  ]}>
                    {data.cleanWaterPercentage}%
                  </Text>
                </View>
              </View>
            </View>

            {!canAdvance && !isGameOver && (
              <Text style={styles.requirementText}>
                تحتاج 70% نظافة أو أكثر للانتقال!
              </Text>
            )}

            {/* Action Buttons */}
            <View style={styles.buttonsContainer}>
              <View style={styles.buttonRow}>
                {canAdvance && !isGameOver ? (
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
    width: screenWidth * 0.92,
    maxWidth: 380,
    maxHeight: '90%',
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
    padding: 20,
  },
  headerContainer: {
    alignItems: 'center',
    marginBottom: 12,
  },
  title: {
    fontSize: 22,
    fontFamily: 'Tajawal-Bold',
    color: gameConfig.colors.primary,
    textAlign: 'right',
    writingDirection: 'rtl',
  },
  gameOverMessage: {
    backgroundColor: '#FFE6E6',
    padding: 12,
    borderRadius: 12,
    marginBottom: 12,
    borderWidth: 2,
    borderColor: gameConfig.colors.danger,
  },
  gameOverText: {
    fontSize: 16,
    fontFamily: 'Tajawal-Bold',
    color: gameConfig.colors.danger,
    textAlign: 'right',
    writingDirection: 'rtl',
    marginBottom: 4,
  },
  gameOverSubtext: {
    fontSize: 14,
    fontFamily: 'Tajawal-Regular',
    color: gameConfig.colors.text,
    textAlign: 'right',
    writingDirection: 'rtl',
  },
  educationalSection: {
    backgroundColor: '#E6F7FF',
    padding: 18,
    borderRadius: 16,
    marginBottom: 16,
    borderWidth: 3,
    borderColor: '#40A9FF',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  educationalHeader: {
    flexDirection: 'row-reverse',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  lightBulbIcon: {
    width: 24,
    height: 24,
    backgroundColor: '#FFD700',
    borderRadius: 12,
    marginLeft: 8,
    elevation: 2,
  },
  educationalTitle: {
    fontSize: 18,
    fontFamily: 'Tajawal-Bold',
    color: '#1890FF',
    textAlign: 'right',
    writingDirection: 'rtl',
  },
  tipContainer: {
    backgroundColor: '#F0F9FF',
    padding: 12,
    borderRadius: 12,
    marginBottom: 12,
    borderWidth: 2,
    borderColor: gameConfig.colors.cleanWater,
  },
  tipHeaderContainer: {
    flexDirection: 'row-reverse',
    alignItems: 'center',
    marginBottom: 8,
  },
  tipIcon: {
    width: 18,
    height: 22,
    backgroundColor: gameConfig.colors.cleanWater,
    borderRadius: 9,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    borderBottomLeftRadius: 4,
    borderBottomRightRadius: 4,
    marginLeft: 8,
  },
  tipHeaderText: {
    fontSize: 16,
    fontFamily: 'Tajawal-Bold',
    color: gameConfig.colors.primary,
    textAlign: 'right',
    writingDirection: 'rtl',
  },
  tipText: {
    fontSize: 15,
    color: gameConfig.colors.text,
    lineHeight: 22,
    textAlign: 'right',
    writingDirection: 'rtl',
    fontFamily: 'Tajawal-Medium',
  },
  factContainer: {
    backgroundColor: '#FFF7E6',
    padding: 16,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#FFD666',
  },
  factHeaderContainer: {
    flexDirection: 'row-reverse',
    alignItems: 'center',
    marginBottom: 8,
  },
  factIcon: {
    width: 18,
    height: 18,
    backgroundColor: '#FFD700',
    borderRadius: 9,
    marginLeft: 8,
  },
  factHeaderText: {
    fontSize: 16,
    fontFamily: 'Tajawal-Bold',
    color: '#D48806',
    textAlign: 'right',
    writingDirection: 'rtl',
  },
  factText: {
    fontSize: 15,
    color: gameConfig.colors.text,
    textAlign: 'right',
    lineHeight: 22,
    writingDirection: 'rtl',
    fontFamily: 'Tajawal-Medium',
  },
  statsContainer: {
    marginBottom: 8,
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
    fontFamily: 'Tajawal-Bold',
    color: gameConfig.colors.primary,
    marginBottom: 1,
    writingDirection: 'rtl',
    textAlign: 'right',
  },
  statLabel: {
    fontSize: 9,
    color: gameConfig.colors.text,
    fontFamily: 'Tajawal-Medium',
    writingDirection: 'rtl',
    textAlign: 'right',
  },
  droppedWaterContainer: {
    alignItems: 'center',
    backgroundColor: '#FFF0F0',
    paddingVertical: 6,
    paddingHorizontal: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(208, 2, 27, 0.3)',
    flex: 1,
    marginRight: 8,
  },
  droppedWaterLabel: {
    fontSize: 12,
    fontFamily: 'Tajawal-Medium',
    color: gameConfig.colors.text,
    marginBottom: 2,
    textAlign: 'right',
    writingDirection: 'rtl',
  },
  droppedWaterValue: {
    fontSize: 16,
    fontFamily: 'Tajawal-Bold',
    textAlign: 'right',
    writingDirection: 'rtl',
  },
  bottomStatsRow: {
    flexDirection: 'row-reverse',
    justifyContent: 'space-between',
    alignItems: 'stretch',
  },
  percentageContainer: {
    alignItems: 'center',
    backgroundColor: '#F8F9FF',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 12,
    flex: 1,
    marginLeft: 8,
  },
  percentageLabel: {
    fontSize: 12,
    fontFamily: 'Tajawal-Medium',
    color: gameConfig.colors.text,
    marginBottom: 2,
    textAlign: 'right',
    writingDirection: 'rtl',
  },
  percentageValue: {
    fontSize: 18,
    fontFamily: 'Tajawal-Bold',
    textAlign: 'right',
    writingDirection: 'rtl',
  },
  requirementText: {
    fontSize: 12,
    color: gameConfig.colors.danger,
    textAlign: 'right',
    marginBottom: 8,
    fontFamily: 'Tajawal-Medium',
    backgroundColor: '#FFE6E6',
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: gameConfig.colors.danger,
  },
  buttonsContainer: {
    alignItems: 'stretch',
  },
  buttonRow: {
    flexDirection: 'row-reverse',
    justifyContent: 'space-between',
    gap: 12,
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
    flex: 1,
  },
  nextLevelButton: {
    backgroundColor: gameConfig.colors.secondary,
  },
  nextLevelButtonText: {
    fontSize: 14,
    fontFamily: 'Tajawal-Bold',
    color: gameConfig.colors.white,
  },
  retryButton: {
    backgroundColor: gameConfig.colors.primary,
  },
  retryButtonText: {
    fontSize: 14,
    fontFamily: 'Tajawal-Bold',
    color: gameConfig.colors.white,
  },
  menuButton: {
    backgroundColor: '#8B9DC3',
  },
  menuButtonText: {
    fontSize: 13,
    fontFamily: 'Tajawal-Medium',
    color: gameConfig.colors.white,
  },
});