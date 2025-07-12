import React, { useState, useEffect } from 'react';
import {
  View, Text, Button, StyleSheet,
  TouchableOpacity, Animated, Easing,
  ScrollView, Modal, Alert
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

// [FR] Thèmes de conservation de l'eau par niveau
const WATER_THEMES = {
  1: {
    title: "Sources d'eau",
    icons: ['tint', 'tint', 'cloud', 'cloud', 'tree', 'tree'],
    tips: [
      "Les rivières et les lacs fournissent de l'eau douce aux communautés",
      "La récupération des eaux de pluie réduit le gaspillage",
      "Les arbres aident à maintenir le cycle de l'eau"
    ],
    color: '#4A90E2'
  },
  2: {
    title: "Économie d'eau",
    icons: ['tint', 'tint', 'recycle', 'recycle', 'leaf', 'leaf', 'droplet', 'droplet'],
    tips: [
      "Recycler l'eau diminue la consommation",
      "Les plantes ont besoin d'eau, mais trop en gaspille",
      "Chaque goutte compte dans la préservation de l'eau"
    ],
    color: '#2ECC71'
  },
  3: {
    title: "Pollution de l'eau",
    icons: ['tint', 'tint', 'trash', 'trash', 'industry', 'industry', 'warning', 'warning'],
    tips: [
      "Les déchets industriels polluent les sources d'eau",
      "Les détritus dans l'eau nuisent à la vie aquatique",
      "Une eau propre est essentielle à la santé"
    ],
    color: '#E74C3C'
  },
  4: {
    title: "Solutions pour l'eau",
    icons: ['tint', 'tint', 'filter', 'filter', 'wrench', 'wrench', 'recycle', 'recycle', 'leaf', 'leaf'],
    tips: [
      "Les filtres fournissent de l'eau potable",
      "Réparer les fuites économise des milliers de litres",
      "Recycler et économiser vont de pair"
    ],
    color: '#9B59B6'
  },
  5: {
    title: "Crise mondiale de l'eau",
    icons: ['tint', 'tint', 'globe', 'globe', 'heart', 'heart', 'hand-holding-water', 'hand-holding-water', 'users', 'users', 'exclamation-triangle', 'exclamation-triangle'],
    tips: [
      "Des milliards de personnes sont touchées par la pénurie d'eau",
      "Les communautés doivent collaborer pour la sécurité de l'eau",
      "Tout le monde mérite un accès à l'eau potable"
    ],
    color: '#34495E'
  }
};

// [FR] Fonction pour mélanger les icônes
const randomArrFunction = (arr) => {
  const shuffled = [...arr];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

// [FR] Génération des cartes de jeu par niveau
const gameCardsFunction = (level) => {
  const theme = WATER_THEMES[level];
  const icons = theme.icons;
  const randomIcons = randomArrFunction(icons);
  return randomIcons.map((icon, index) => ({
    id: index,
    symbol: icon,
    isFlipped: false,
  }));
};

const App = () => {
  const [currentLevel, setCurrentLevel] = useState(1);
  const [cards, setCards] = useState(gameCardsFunction(1));
  const [selectedCards, setSelectedCards] = useState([]);
  const [matches, setMatches] = useState(0);
  const [winMessage, setWinMessage] = useState(new Animated.Value(0));
  const [gameWon, setGameWon] = useState(false);
  const [showLevelSelect, setShowLevelSelect] = useState(false);
  const [showTips, setShowTips] = useState(false);
  const [totalScore, setTotalScore] = useState(0);
  const [attempts, setAttempts] = useState(0);
  const [timeStarted, setTimeStarted] = useState(null);
  const [completedLevels, setCompletedLevels] = useState(new Set());

  useEffect(() => {
    if (!timeStarted) {
      setTimeStarted(Date.now());
    }
  }, [cards]);

  const cardClickFunction = (card) => {
    if (!gameWon && selectedCards.length < 2 && !card.isFlipped) {
      const updatedSelectedCards = [...selectedCards, card];
      const updatedCards = cards.map((c) =>
        c.id === card.id ? { ...c, isFlipped: true } : c
      );

      setSelectedCards(updatedSelectedCards);
      setCards(updatedCards);
      setAttempts(attempts + 1);

      if (updatedSelectedCards.length === 2) {
        if (updatedSelectedCards[0].symbol === updatedSelectedCards[1].symbol) {
          setMatches(matches + 1);
          setSelectedCards([]);
          
          if (matches + 1 === cards.length / 2) {
            winGameFunction();
            setGameWon(true);
          }
        } else {
          setTimeout(() => {
            const flippedCards = updatedCards.map((c) =>
              updatedSelectedCards.some((s) => s.id === c.id) ?
                { ...c, isFlipped: false } : c
            );
            setSelectedCards([]);
            setCards(flippedCards);
          }, 1000);
        }
      }
    }
  };

  const winGameFunction = () => {
    const timeTaken = Math.floor((Date.now() - timeStarted) / 1000);
    const levelScore = Math.max(100 - attempts * 2 - timeTaken, 20);
    setTotalScore(totalScore + levelScore);
    setCompletedLevels(prev => new Set([...prev, currentLevel]));
    
    Animated.timing(winMessage, {
      toValue: 1,
      duration: 1000,
      easing: Easing.bounce,
      useNativeDriver: false,
    }).start();
  };

  const startNewLevel = (level) => {
    setCurrentLevel(level);
    setCards(gameCardsFunction(level));
    setSelectedCards([]);
    setMatches(0);
    setWinMessage(new Animated.Value(0));
    setGameWon(false);
    setShowLevelSelect(false);
    setAttempts(0);
    setTimeStarted(Date.now());
  };

  const resetGame = () => {
    startNewLevel(currentLevel);
  };

  const nextLevel = () => {
    if (currentLevel < 5) {
      startNewLevel(currentLevel + 1);
    } else {
      Alert.alert(
        "Congratulations!",
        `You've completed all levels! Final Score: ${totalScore}`,
        [{ text: "Play Again", onPress: () => startNewLevel(1) }]
      );
    }
  };

  const currentTheme = WATER_THEMES[currentLevel];
  const progress = `${matches}/${cards.length / 2}`;

  return (
    <View style={[styles.container, { backgroundColor: currentTheme.color + '20' }]}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={[styles.headerTitle, { color: currentTheme.color }]}>
            AquaMemory
          </Text>
          <Text style={styles.headerSubtitle}>
            Jeu de conservation de l'eau
          </Text>
        </View>

        {/* Level Info */}
        <View style={[styles.levelInfo, { borderColor: currentTheme.color }]}>
          <Text style={[styles.levelTitle, { color: currentTheme.color }]}>
            Level {currentLevel}: {currentTheme.title}
          </Text>
          <View style={styles.statsRow}>
            <Text style={styles.statText}>Matches: {progress}</Text>
            <Text style={styles.statText}>Essaies:{attempts}</Text>
            <Text style={styles.statText}>Score: {totalScore}</Text>
          </View>
        </View>

        {/* Action Buttons */}
        <View style={styles.buttonRow}>
          <TouchableOpacity
            style={[styles.actionButton, { backgroundColor: currentTheme.color }]}
            onPress={() => setShowLevelSelect(true)}
          >
            <Icon name="list" size={16} color="white" />
            <Text style={styles.actionButtonText}>Niveaux</Text>
          </TouchableOpacity>
          
          <TouchableOpacity
            style={[styles.actionButton, { backgroundColor: currentTheme.color }]}
            onPress={() => setShowTips(true)}
          >
            <Icon name="lightbulb-o" size={16} color="white" />
            <Text style={styles.actionButtonText}>Tips</Text>
          </TouchableOpacity>
        </View>

        {/* Game Board */}
        {gameWon ? (
          <Animated.View
            style={[
              styles.winMessage,
              { backgroundColor: currentTheme.color + 'DD' }
            ]}
          >
            <View style={styles.winMessageContent}>
              <Icon name="trophy" size={50} color="#FFD700" />
              <Text style={styles.winText}>Niveau complété!</Text>
              <Text style={styles.winSubText}>
                Bien joué!
              </Text>
              <View style={styles.winButtons}>
                <Button
                  title="Restart Level"
                  onPress={resetGame}
                  color={currentTheme.color}
                />
                {currentLevel < 5 && (
                  <Button
                    title="Next Level"
                    onPress={nextLevel}
                    color="#2ECC71"
                  />
                )}
              </View>
            </View>
          </Animated.View>
        ) : (
          <View style={styles.grid}>
            {cards.map((card) => (
              <TouchableOpacity
                key={card.id}
                style={[
                  styles.card,
                  card.isFlipped && styles.cardFlipped,
                  { borderColor: currentTheme.color }
                ]}
                onPress={() => cardClickFunction(card)}
              >
                {card.isFlipped ? (
                  <Icon
                    name={card.symbol}
                    size={30}
                    style={[styles.cardIcon, { color: currentTheme.color }]}
                  />
                ) : (
                  <Icon
                    name="tint"
                    size={20}
                    style={[styles.cardIcon, { color: currentTheme.color + '40' }]}
                  />
                )}
              </TouchableOpacity>
            ))}
          </View>
        )}
      </ScrollView>

      {/* Level Selection Modal */}
      <Modal
        visible={showLevelSelect}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setShowLevelSelect(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Choisir un niveau</Text>
            <ScrollView style={styles.levelList}>
              {Object.keys(WATER_THEMES).map((level) => {
                const levelNum = parseInt(level);
                const theme = WATER_THEMES[levelNum];
                const isCompleted = completedLevels.has(levelNum);
                const isLocked = levelNum > 1 && !completedLevels.has(levelNum - 1);
                
                return (
                  <TouchableOpacity
                    key={level}
                    style={[
                      styles.levelOption,
                      { backgroundColor: theme.color + '20' },
                      isLocked && styles.levelLocked
                    ]}
                    onPress={() => !isLocked && startNewLevel(levelNum)}
                    disabled={isLocked}
                  >
                    <View style={styles.levelOptionContent}>
                      <Text style={[styles.levelOptionText, { Couleur: theme.color }]}>
                        Niveau {level}: {theme.title}
                      </Text>
                      {isCompleted && <Icon name="check" size={20} color="#2ECC71" />}
                      {isLocked && <Icon name="lock" size={20} color="#95A5A6" />}
                    </View>
                    <Text style={styles.levelDifficulty}>
                      {levelNum <= 2 ? 'Easy' : levelNum <= 4 ? 'Medium' : 'Hard'}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </ScrollView>
            <Button
              title="Close"
              onPress={() => setShowLevelSelect(false)}
              color="#E74C3C"
            />
          </View>
        </View>
      </Modal>

      {/* Tips Modal */}
      <Modal
        visible={showTips}
        animationType="fade"
        transparent={true}
        onRequestClose={() => setShowTips(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Water Conservation Tips</Text>
            <ScrollView style={styles.tipsList}>
              {currentTheme.tips.map((tip, index) => (
                <View key={index} style={styles.tipItem}>
                  <Icon name="tint" size={16} color={currentTheme.color} />
                  <Text style={styles.tipText}>{tip}</Text>
                </View>
              ))}
            </ScrollView>
            <Button
              title="Close"
              onPress={() => setShowTips(false)}
              color={currentTheme.color}
            />
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContainer: {
    flexGrow: 1,
    padding: 20,
  },
  header: {
    alignItems: 'center',
    marginBottom: 20,
  },
  headerTitle: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  headerSubtitle: {
    fontSize: 16,
    color: '#666',
  },
  levelInfo: {
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 10,
    borderWidth: 2,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  levelTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  statText: {
    fontSize: 14,
    color: '#666',
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderRadius: 20,
    minWidth: 80,
    justifyContent: 'center',
  },
  actionButtonText: {
    color: 'white',
    marginLeft: 5,
    fontSize: 14,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginTop: 10,
  },
  card: {
    width: 70,
    height: 70,
    margin: 8,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 10,
    borderWidth: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  cardFlipped: {
    backgroundColor: '#F8F9FA',
  },
  cardIcon: {
    textAlign: 'center',
  },
  winMessage: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  winMessageContent: {
    backgroundColor: 'white',
    padding: 30,
    borderRadius: 15,
    alignItems: 'center',
    margin: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  winText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2ECC71',
    marginTop: 10,
  },
  winSubText: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginVertical: 10,
  },
  winButtons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginTop: 15,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: 'white',
    margin: 20,
    padding: 20,
    borderRadius: 15,
    maxHeight: '80%',
    width: '90%',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 15,
    color: '#2C3E50',
  },
  levelList: {
    maxHeight: 300,
  },
  levelOption: {
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  levelLocked: {
    opacity: 0.5,
  },
  levelOptionContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  levelOptionText: {
    fontSize: 16,
    fontWeight: '600',
  },
  levelDifficulty: {
    fontSize: 12,
    color: '#666',
    marginTop: 5,
  },
  tipsList: {
    maxHeight: 200,
  },
  tipItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 10,
    padding: 10,
    backgroundColor: '#F8F9FA',
    borderRadius: 8,
  },
  tipText: {
    flex: 1,
    marginLeft: 10,
    fontSize: 14,
    color: '#2C3E50',
  },
});

export default App;