// GameOverModal.tsx - Game over modal with final results

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

interface GameOverModalProps {
  visible: boolean;
  stats: GameStats;
  waterFact: WaterFact;
  onRestart: () => void;
  onExit: () => void;
}

const GameOverModal: React.FC<GameOverModalProps> = ({
  visible,
  stats,
  waterFact,
  onRestart,
  onExit,
}) => {
  const getFinalMessage = (percentage: number): string => {
    if (percentage >= 90) return "بطل الماء! أداء استثنائي في المحافظة على الماء النظيف";
    if (percentage >= 80) return "حارس الماء! عمل رائع في حماية مصادر الماء";
    if (percentage >= 70) return "صديق البيئة! إنجاز جيد في الحفاظ على نقاء الماء";
    if (percentage >= 50) return "مبتدئ واعد! استمر في التعلم عن أهمية الماء النظيف";
    return "تحتاج للمزيد من التدريب! تعلم المزيد عن حماية مصادر الماء";
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
              <Text style={styles.gameOverTitle}>انتهت اللعبة!</Text>
              <Text style={styles.finalMessage}>
                {getFinalMessage(stats.waterQualityPercentage)}
              </Text>
            </View>

            {/* Final Stats */}
            <View style={styles.statsContainer}>
              <Text style={styles.statsTitle}>النتائج النهائية</Text>
              
              <View style={styles.majorStat}>
                <Text style={styles.majorStatLabel}>النقاط الإجمالية</Text>
                <Text style={styles.majorStatValue}>{stats.score}</Text>
              </View>
              
              <View style={styles.qualityContainer}>
                <Text style={styles.qualityLabel}>مستوى نقاء الماء</Text>
                <Text style={[
                  styles.qualityPercentage, 
                  { color: getQualityColor(stats.waterQualityPercentage) }
                ]}>
                  {stats.waterQualityPercentage}%
                </Text>
                <View style={styles.qualityBar}>
                  <View 
                    style={[
                      styles.qualityFill,
                      { 
                        width: `${stats.waterQualityPercentage}%`,
                        backgroundColor: getQualityColor(stats.waterQualityPercentage)
                      }
                    ]} 
                  />
                </View>
              </View>
              
              <View style={styles.detailedStats}>
                <View style={styles.statRow}>
                  <View style={styles.statItem}>
                    <View style={[styles.dropIcon, { backgroundColor: '#4FC3F7' }]} />
                    <Text style={styles.statItemLabel}>قطرات نظيفة</Text>
                    <Text style={styles.statItemValue}>{stats.cleanDropsCaught}</Text>
                  </View>
                  
                  <View style={styles.statItem}>
                    <View style={[styles.dropIcon, { backgroundColor: '#5D4037' }]} />
                    <Text style={styles.statItemLabel}>قطرات ملوثة</Text>
                    <Text style={styles.statItemValue}>{stats.pollutedDropsCaught}</Text>
                  </View>
                </View>
                
                <View style={styles.statRow}>
                  <View style={styles.statItem}>
                    <Text style={styles.statItemLabel}>المستوى الأقصى</Text>
                    <Text style={styles.statItemValue}>{stats.level}</Text>
                  </View>
                  
                  <View style={styles.statItem}>
                    <Text style={styles.statItemLabel}>إجمالي القطرات</Text>
                    <Text style={styles.statItemValue}>{stats.totalDrops}</Text>
                  </View>
                </View>
              </View>
            </View>

            {/* Water Fact */}
            <View style={styles.factContainer}>
              <Text style={styles.factTitle}>💧 حقيقة مهمة عن الماء</Text>
              <Text style={styles.factText}>{waterFact.fact}</Text>
              
              <Text style={styles.tipTitle}>💡 نصيحة للمحافظة على الماء</Text>
              <Text style={styles.tipText}>{waterFact.tip}</Text>
            </View>

            {/* Action Buttons */}
            <View style={styles.buttonContainer}>
              <TouchableOpacity 
                style={[styles.actionButton, styles.primaryButton]} 
                onPress={onRestart}
              >
                <Text style={styles.primaryButtonText}>العب مرة أخرى</Text>
              </TouchableOpacity>
              
              <TouchableOpacity 
                style={[styles.actionButton, styles.secondaryButton]} 
                onPress={onExit}
              >
                <Text style={styles.secondaryButtonText}>الخروج</Text>
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
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  modalContainer: {
    backgroundColor: 'white',
    borderRadius: 20,
    width: '100%',
    maxWidth: 400,
    maxHeight: '85%',
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
  gameOverTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#D32F2F',
    marginBottom: 8,
  },
  finalMessage: {
    fontSize: 16,
    color: '#1976D2',
    textAlign: 'center',
    fontWeight: '600',
    lineHeight: 22,
  },
  statsContainer: {
    backgroundColor: '#F8F9FA',
    borderRadius: 15,
    padding: 20,
    marginBottom: 20,
  },
  statsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
    marginBottom: 15,
  },
  majorStat: {
    alignItems: 'center',
    marginBottom: 20,
    padding: 15,
    backgroundColor: '#E3F2FD',
    borderRadius: 12,
  },
  majorStatLabel: {
    fontSize: 16,
    color: '#666',
    marginBottom: 5,
  },
  majorStatValue: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1976D2',
  },
  qualityContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  qualityLabel: {
    fontSize: 16,
    color: '#333',
    fontWeight: '600',
    marginBottom: 5,
  },
  qualityPercentage: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  qualityBar: {
    width: '100%',
    height: 12,
    backgroundColor: '#E0E0E0',
    borderRadius: 6,
    overflow: 'hidden',
  },
  qualityFill: {
    height: '100%',
    borderRadius: 6,
  },
  detailedStats: {
    gap: 10,
  },
  statRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 15,
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'white',
    padding: 12,
    borderRadius: 10,
  },
  dropIcon: {
    width: 16,
    height: 16,
    borderRadius: 8,
    marginBottom: 5,
  },
  statItemLabel: {
    fontSize: 12,
    color: '#666',
    textAlign: 'center',
    marginBottom: 3,
  },
  statItemValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  factContainer: {
    backgroundColor: '#F1F8E9',
    borderRadius: 15,
    padding: 18,
    marginBottom: 20,
    borderLeftWidth: 4,
    borderLeftColor: '#4CAF50',
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
    color: '#F57C00',
    marginBottom: 8,
  },
  tipText: {
    fontSize: 15,
    color: '#333',
    lineHeight: 20,
  },
  buttonContainer: {
    gap: 12,
  },
  actionButton: {
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 12,
    alignItems: 'center',
  },
  primaryButton: {
    backgroundColor: '#1976D2',
  },
  primaryButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  secondaryButton: {
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderColor: '#1976D2',
  },
  secondaryButtonText: {
    color: '#1976D2',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default GameOverModal;