// navigation.tsx - Game navigation component

import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  ImageBackground,
} from 'react-native';
import { WaterDropCatcher } from './index';

type Screen = 'menu' | 'game' | 'instructions';

const GameNavigation: React.FC = () => {
  const [currentScreen, setCurrentScreen] = useState<Screen>('menu');

  const MenuScreen = () => (
    <ImageBackground
      source={{ uri: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80' }}
      style={styles.backgroundImage}
      imageStyle={styles.backgroundImageStyle}
    >
      <SafeAreaView style={styles.menuContainer}>
        <View style={styles.titleContainer}>
          <Text style={styles.gameTitle}>لعبة صيد قطرات الماء</Text>
          <Text style={styles.gameSubtitle}>احم المياه النظيفة وتعلم عن أهمية المحافظة عليها</Text>
        </View>
        
        <View style={styles.menuButtons}>
          <TouchableOpacity
            style={[styles.menuButton, styles.playButton]}
            onPress={() => setCurrentScreen('game')}
          >
            <Text style={styles.playButtonText}>ابدأ اللعب</Text>
          </TouchableOpacity>
          
          <TouchableOpacity
            style={[styles.menuButton, styles.instructionsButton]}
            onPress={() => setCurrentScreen('instructions')}
          >
            <Text style={styles.instructionsButtonText}>كيفية اللعب</Text>
          </TouchableOpacity>
        </View>
        
        <View style={styles.footer}>
          <Text style={styles.footerText}>لعبة تعليمية للتوعية بأهمية المحافظة على الماء</Text>
        </View>
      </SafeAreaView>
    </ImageBackground>
  );

  const InstructionsScreen = () => (
    <SafeAreaView style={styles.instructionsContainer}>
      <View style={styles.instructionsHeader}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => setCurrentScreen('menu')}
        >
          <Text style={styles.backButtonText}>← العودة</Text>
        </TouchableOpacity>
        <Text style={styles.instructionsTitle}>كيفية اللعب</Text>
      </View>
      
      <View style={styles.instructionsContent}>
        <View style={styles.instructionSection}>
          <Text style={styles.sectionTitle}>🎯 الهدف</Text>
          <Text style={styles.sectionText}>
            احرص على جمع أكبر عدد من قطرات الماء النظيفة وتجنب القطرات الملوثة للحفاظ على نقاء الماء
          </Text>
        </View>
        
        <View style={styles.instructionSection}>
          <Text style={styles.sectionTitle}>🎮 طريقة اللعب</Text>
          <Text style={styles.sectionText}>
            • اسحب الدلو يميناً ويساراً لصيد القطرات{'\n'}
            • اجمع القطرات الزرقاء (الماء النظيف){'\n'}
            • تجنب القطرات البنية (الماء الملوث){'\n'}
            • لديك 30 ثانية في كل مستوى
          </Text>
        </View>
        
        <View style={styles.instructionSection}>
          <Text style={styles.sectionTitle}>🏆 النقاط</Text>
          <Text style={styles.sectionText}>
            • قطرة ماء نظيفة = +10 نقاط{'\n'}
            • قطرة ماء ملوثة = -5 نقاط{'\n'}
            • مكافأة حسب نسبة نقاء الماء{'\n'}
            • مضاعف النقاط يزيد مع المستوى
          </Text>
        </View>
        
        <View style={styles.instructionSection}>
          <Text style={styles.sectionTitle}>📚 التعلم</Text>
          <Text style={styles.sectionText}>
            بعد كل مستوى ستتعلم حقائق مهمة عن الماء ونصائح للمحافظة عليه في حياتك اليومية
          </Text>
        </View>
      </View>
      
      <TouchableOpacity
        style={styles.startGameButton}
        onPress={() => setCurrentScreen('game')}
      >
        <Text style={styles.startGameButtonText}>ابدأ اللعب الآن!</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );

  const GameScreen = () => (
    <View style={styles.gameScreenContainer}>
      <WaterDropCatcher />
      <TouchableOpacity
        style={styles.exitGameButton}
        onPress={() => setCurrentScreen('menu')}
      >
        <Text style={styles.exitGameButtonText}>← العودة للقائمة</Text>
      </TouchableOpacity>
    </View>
  );

  const renderScreen = () => {
    switch (currentScreen) {
      case 'menu':
        return <MenuScreen />;
      case 'instructions':
        return <InstructionsScreen />;
      case 'game':
        return <GameScreen />;
      default:
        return <MenuScreen />;
    }
  };

  return <View style={styles.container}>{renderScreen()}</View>;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backgroundImage: {
    flex: 1,
    justifyContent: 'center',
  },
  backgroundImageStyle: {
    opacity: 0.3,
  },
  menuContainer: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 40,
    backgroundColor: 'rgba(135, 206, 235, 0.9)',
  },
  titleContainer: {
    alignItems: 'center',
    marginTop: 50,
  },
  gameTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1976D2',
    textAlign: 'center',
    marginBottom: 10,
    textShadowColor: '#fff',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  gameSubtitle: {
    fontSize: 16,
    color: '#0D47A1',
    textAlign: 'center',
    lineHeight: 22,
    paddingHorizontal: 20,
  },
  menuButtons: {
    alignItems: 'center',
    gap: 20,
  },
  menuButton: {
    paddingHorizontal: 40,
    paddingVertical: 15,
    borderRadius: 15,
    minWidth: 200,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 8,
  },
  playButton: {
    backgroundColor: '#1976D2',
  },
  playButtonText: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },
  instructionsButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderWidth: 2,
    borderColor: '#1976D2',
  },
  instructionsButtonText: {
    color: '#1976D2',
    fontSize: 18,
    fontWeight: '600',
  },
  footer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  footerText: {
    fontSize: 14,
    color: '#0D47A1',
    textAlign: 'center',
    fontStyle: 'italic',
  },
  instructionsContainer: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  instructionsHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: '#1976D2',
    paddingTop: 50,
  },
  backButton: {
    padding: 10,
  },
  backButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  instructionsTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
    flex: 1,
    textAlign: 'center',
    marginRight: 40,
  },
  instructionsContent: {
    flex: 1,
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  instructionSection: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 20,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1976D2',
    marginBottom: 10,
  },
  sectionText: {
    fontSize: 16,
    color: '#333',
    lineHeight: 22,
  },
  startGameButton: {
    backgroundColor: '#4CAF50',
    marginHorizontal: 20,
    marginBottom: 30,
    paddingVertical: 15,
    borderRadius: 12,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 8,
  },
  startGameButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  gameScreenContainer: {
    flex: 1,
    backgroundColor: '#87CEEB',
  },
  exitGameButton: {
    position: 'absolute',
    top: 50,
    left: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 20,
    zIndex: 1000,
  },
  exitGameButtonText: {
    color: 'white',
    fontSize: 14,
    fontWeight: '600',
  },
});

export default GameNavigation;