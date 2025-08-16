// LevelCompleteModal.tsx - Level completion modal with water facts

import React from 'react';
import { 
  View, 
  Text, 
  Modal, 
  TouchableOpacity, 
  StyleSheet,
  ScrollView 
} from 'react-native';
import { GameStats, WaterFact } from '../types';

interface LevelCompleteModalProps {
  visible: boolean;
  stats: GameStats;
  waterFact: WaterFact;
  onNextLevel: () => void;
  isLastLevel: boolean;
}

const LevelCompleteModal: React.FC<LevelCompleteModalProps> = ({
  visible,
  stats,
  waterFact,
  onNextLevel,
  isLastLevel,
}) => {
  const getPerformanceMessage = (percentage: number): string => {
    if (percentage >= 90) return "ممتاز! أداء رائع في المحافظة على نقاء الماء";
    if (percentage >= 70) return "جيد جداً! تحسن ملحوظ في جمع الماء النظيف";
    if (percentage >= 50) return "جيد! يمكنك التحسن أكثر";
    return "حاول مرة أخرى! ركز على الماء النظيف";
  };

  const getQualityColor = (percentage: number): string => {
    if (percentage >= 80) return '#4CAF50';
    if (percentage >= 60) return '#FF9800';
    if (percentage >= 40) return '#FF5722';
    return '#F44336';
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      statusBarTranslucent={true}
    >
      <View style={styles.overlay}>
        <View style={styles.modalContainer}>
          <ScrollView showsVerticalScrollIndicator={false}>
            {/* Header */}
            <View style={styles.header}>
              <Text style={styles.title}>
                {isLastLevel ? "تهانينا! أكملت جميع المستويات" : `المستوى ${stats.level} مكتمل!`}
              </Text>
            </View>

            {/* Stats */}
            <View style={styles.statsContainer}>
              <View style={styles.statRow}>
                <Text style={styles.statLabel}>النقاط النهائية:</Text>
                <Text style={styles.statValue}>{stats.score}</Text>
              </View>
              
              <View style={styles.statRow}>
                <Text style={styles.statLabel}>نقاء الماء:</Text>
                <Text style={[
                  styles.statValue, 
                  { color: getQualityColor(stats.waterQualityPercentage) }
                ]}>
                  {stats.waterQualityPercentage}%
                </Text>
              </View>
              
              <View style={styles.statRow}>
                <Text style={styles.statLabel}>قطرات نظيفة:</Text>
                <Text style={[styles.statValue, { color: '#4FC3F7' }]}>
                  {stats.cleanDropsCaught}
                </Text>
              </View>
              
              <View style={styles.statRow}>
                <Text style={styles.statLabel}>قطرات ملوثة:</Text>
                <Text style={[styles.statValue, { color: '#5D4037' }]}>
                  {stats.pollutedDropsCaught}
                </Text>
              </View>
            </View>

            {/* Performance Message */}
            <View style={styles.performanceContainer}>
              <Text style={styles.performanceText}>
                {getPerformanceMessage(stats.waterQualityPercentage)}
              </Text>
            </View>

            {/* Water Fact */}
            <View style={styles.factContainer}>
              <Text style={styles.factTitle}>💧 حقيقة عن الماء</Text>
              <Text style={styles.factText}>{waterFact.fact}</Text>
              
              <Text style={styles.tipTitle}>💡 نصيحة للمحافظة على الماء</Text>
              <Text style={styles.tipText}>{waterFact.tip}</Text>
            </View>

            {/* Action Button */}
            <TouchableOpacity 
              style={styles.actionButton} 
              onPress={onNextLevel}
            >
              <Text style={styles.actionButtonText}>
                {isLastLevel ? "اللعب مرة أخرى" : "المستوى التالي"}
              </Text>
            </TouchableOpacity>
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
    paddingHorizontal: 20,
  },
  modalContainer: {
    backgroundColor: 'white',
    borderRadius: 20,
    width: '100%',
    maxWidth: 400,
    maxHeight: '80%',
    padding: 20,
    elevation: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
  header: {
    alignItems: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#1976D2',
    textAlign: 'center',
    lineHeight: 28,
  },
  statsContainer: {
    backgroundColor: '#F5F5F5',
    borderRadius: 12,
    padding: 15,
    marginBottom: 15,
  },
  statRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  statLabel: {
    fontSize: 16,
    color: '#666',
    fontWeight: '600',
  },
  statValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1976D2',
  },
  performanceContainer: {
    backgroundColor: '#E3F2FD',
    borderRadius: 12,
    padding: 15,
    marginBottom: 15,
  },
  performanceText: {
    fontSize: 16,
    color: '#1976D2',
    fontWeight: '600',
    textAlign: 'center',
    lineHeight: 22,
  },
  factContainer: {
    backgroundColor: '#F9F9F9',
    borderRadius: 12,
    padding: 15,
    marginBottom: 20,
  },
  factTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2E7D32',
    marginBottom: 8,
  },
  factText: {
    fontSize: 15,
    color: '#333',
    lineHeight: 20,
    marginBottom: 12,
  },
  tipTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FF8F00',
    marginBottom: 8,
  },
  tipText: {
    fontSize: 15,
    color: '#333',
    lineHeight: 20,
  },
  actionButton: {
    backgroundColor: '#1976D2',
    borderRadius: 12,
    paddingVertical: 15,
    paddingHorizontal: 30,
    alignItems: 'center',
  },
  actionButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default LevelCompleteModal;