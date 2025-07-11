import { Image, Text, View, StyleSheet, TouchableOpacity, Alert} from "react-native";
import Video from 'react-native-video';

export default function App() {
  console.log("hi");
  
  const handleStart = () => {
    Alert.alert("Bienvenue !", "Navigation vers la suite prévue ici.");
    // Ici tu peux naviguer avec React Navigation (plus tard)
  };
  return (
    <View style={styles.container}>
      {/* Logo */}
      <Image
        source={require("../assets/images/logoONEE .png")}
        style={styles.logo}
        resizeMode="contain"
      />

      {/* Section centrale */}
      
      <View style={styles.centerSection}>
  <Text style={styles.welcomeText}>
    Bienvenue à Mouiha!
  </Text>
  <Text style={styles.solganText}>
    Préservons l’eau, protégeons la vie
  </Text>

  <Image
        source={require('../assets/images/uyu.gif')}
        style={styles.gif}
      />

  {/* Espacement ajouté ici pour faire remonter le bouton */}
  <View style={{ height: 10}} />

  <TouchableOpacity style={styles.button} onPress={handleStart}>
  
  <Text style={styles.buttonText}>➔	  Commencer</Text>
</TouchableOpacity>

</View>

      
      {/* Footer */}
      <Text style={styles.footer}>© ONEE - 2025</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f0f8ff", // Couleur douce
    alignItems: "center",
    justifyContent: "space-between",
    paddingTop: 50,
    paddingBottom: 20,
  },
  logo: {
    width: 320, height: 60, marginTop: 10 
  },
  centerSection: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 20,
  },
  welcomeText: {
    fontSize: 23,
    fontWeight: "600",
    color: "#004080",
    textAlign: "center",
    marginBottom: 11,
    fontFamily: "Inter-SemiBold"
  },
  solganText:{
fontSize: 12,
marginTop:2,
color: "#888",
  }, 
  gif: {
    width: 200,
    height: 300,
  },
  button: {
  backgroundColor: "#007acc",
  paddingVertical: 12,
  paddingHorizontal: 25,
  borderRadius: 25,
  flexDirection: "row", // ← important
  alignItems: "center",
  justifyContent: "center",
  gap: 10, // ou marginRight dans l'icône si React Native < 0.71
},
buttonIcon: {
  width: 16,
  height: 16,
  marginRight: 8,
  tintColor: "#fff", // pour colorer la flèche si elle est en noir
},
buttonText: {
  color: "#fff",
  fontSize: 16,
  fontWeight: "600",
},

  footer: {
    fontSize: 14,
    color: "#888",
  },
});


// import React, { useState, useEffect, useRef } from 'react';
// import {
//   View,
//   Text,
//   TouchableOpacity,
//   StyleSheet,
//   Alert,
//   Animated,
//   Easing,
// } from 'react-native';

// const LEVELS = [
//   {
//     level: 1,
//     pairs: [
//       { id: 1, emoji: '🚰', message: 'Fermer le robinet évite le gaspillage !' },
//       { id: 2, emoji: '💧', message: 'Chaque goutte compte.' },
//       { id: 3, emoji: '🚿', message: 'Prendre une douche rapide économise l’eau.' },
//     ],
//     tankStart: 8,
//     drainRate: 1,
//   },
//   {
//     level: 2,
//     pairs: [
//       { id: 1, emoji: '🚰', message: 'Robinet fermé = économie d’eau.' },
//       { id: 2, emoji: '💧', message: 'La pluie est une ressource précieuse.' },
//       { id: 3, emoji: '🚿', message: 'La douche plutôt que le bain sauve des litres.' },
//       { id: 4, emoji: '🌿', message: 'Arrose le jardin le matin pour limiter l’évaporation.' },
//     ],
//     tankStart: 10,
//     drainRate: 1,
//   },
//   {
//     level: 3,
//     pairs: [
//       { id: 1, emoji: '🚰', message: 'Un robinet qui goutte gaspille 20L par jour !' },
//       { id: 2, emoji: '💧', message: 'Réutilise l’eau de pluie pour arroser.' },
//       { id: 3, emoji: '🚿', message: 'Un minuteur aide à réduire la durée de douche.' },
//       { id: 4, emoji: '🌿', message: 'Plante locale = moins d’arrosage.' },
//       { id: 5, emoji: '♻️', message: 'Recycle l’eau usée si possible.' },
//     ],
//     tankStart: 12,
//     drainRate: 2,
//   },
// ];

// function shuffleArray(array) {
//   return array
//     .map((v) => ({ v, sort: Math.random() }))
//     .sort((a, b) => a.sort - b.sort)
//     .map(({ v }) => v);
// }

// export default function WaterMemoryGame() {
//   const [levelIndex, setLevelIndex] = useState(0);
//   const [cards, setCards] = useState([]);
//   const [selected, setSelected] = useState([]);
//   const [matched, setMatched] = useState([]);
//   const [tank, setTank] = useState(LEVELS[0].tankStart);
//   const [showAll, setShowAll] = useState(true);
//   const [feedback, setFeedback] = useState(null);
//   const [educMessage, setEducMessage] = useState(null);

//   const lock = useRef(false);
//   const tankAnim = useRef(new Animated.Value(1)).current;

//   useEffect(() => {
//     startLevel(levelIndex);
//   }, [levelIndex]);

//   function startLevel(index) {
//     const level = LEVELS[index];
//     const deck = shuffleArray(
//       [...level.pairs, ...level.pairs].map((card, i) => ({
//         ...card,
//         uniqueId: i + '-' + Math.random().toString(),
//       }))
//     );
//     setCards(deck);
//     setMatched([]);
//     setSelected([]);
//     setTank(level.tankStart);
//     tankAnim.setValue(1);
//     setShowAll(true);
//     setEducMessage(`Niveau ${level.level} : Trouve les paires et économise l’eau !`);

//     setTimeout(() => setShowAll(false), 3000);
//   }

//   useEffect(() => {
//     if (selected.length === 2) {
//       lock.current = true;
//       const [first, second] = selected;
//       const card1 = cards[first];
//       const card2 = cards[second];

//       if (card1.id === card2.id) {
//         setFeedback('good');
//         setEducMessage(card1.message);
//         setMatched((prev) => [...prev, first, second]);

//         setTimeout(() => {
//           setFeedback(null);
//           setSelected([]);
//           lock.current = false;

//           if (matched.length + 2 === cards.length) {
//             if (levelIndex < LEVELS.length - 1) {
//               setTimeout(() => {
//                 Alert.alert(
//                   '🎉 Niveau terminé !',
//                   'Passer au niveau suivant ?',
//                   [
//                     { text: 'Non', style: 'cancel' },
//                     {
//                       text: 'Oui',
//                       onPress: () => setLevelIndex(levelIndex + 1),
//                     },
//                   ]
//                 );
//               }, 500);
//             } else {
//               Alert.alert('🏆 Bravo, tu as terminé tous les niveaux !');
//             }
//           }
//         }, 1000);
//       } else {
//         setFeedback('bad');
//         setEducMessage("Oups ! Mauvaise paire, attention à l'eau.");
//         setTimeout(() => {
//           setFeedback(null);
//           setSelected([]);

//           setTank((t) => {
//             const newTank = Math.max(t - LEVELS[levelIndex].drainRate, 0);
//             Animated.timing(tankAnim, {
//               toValue: newTank / LEVELS[levelIndex].tankStart,
//               duration: 400,
//               useNativeDriver: true,
//      import React, { useState, useEffect, useRef } from 'react';
// import {
//   View,
//   Text,
//   TouchableOpacity,
//   StyleSheet,
//   Alert,
//   Animated,
//   Easing,
// } from 'react-native';

// const LEVELS = [
//   {
//     level: 1,
//     pairs: [
//       { id: 1, emoji: '🚰', message: 'Fermer le robinet évite le gaspillage !' },
//       { id: 2, emoji: '💧', message: 'Chaque goutte compte.' },
//       { id: 3, emoji: '🚿', message: 'Prendre une douche rapide économise l’eau.' },
//     ],
//     tankStart: 8,
//     drainRate: 1,
//   },
//   {
//     level: 2,
//     pairs: [
//       { id: 1, emoji: '🚰', message: 'Robinet fermé = économie d’eau.' },
//       { id: 2, emoji: '💧', message: 'La pluie est une ressource précieuse.' },
//       { id: 3, emoji: '🚿', message: 'La douche plutôt que le bain sauve des litres.' },
//       { id: 4, emoji: '🌿', message: 'Arrose le jardin le matin pour limiter l’évaporation.' },
//     ],
//     tankStart: 10,
//     drainRate: 1,
//   },
//   {
//     level: 3,
//     pairs: [
//       { id: 1, emoji: '🚰', message: 'Un robinet qui goutte gaspille 20L par jour !' },
//       { id: 2, emoji: '💧', message: 'Réutilise l’eau de pluie pour arroser.' },
//       { id: 3, emoji: '🚿', message: 'Un minuteur aide à réduire la durée de douche.' },
//       { id: 4, emoji: '🌿', message: 'Plante locale = moins d’arrosage.' },
//       { id: 5, emoji: '♻️', message: 'Recycle l’eau usée si possible.' },
//     ],
//     tankStart: 12,
//     drainRate: 2,
//   },
// ];

// function shuffleArray(array) {
//   return array
//     .map((v) => ({ v, sort: Math.random() }))
//     .sort((a, b) => a.sort - b.sort)
//     .map(({ v }) => v);
// }

// export default function WaterMemoryGame() {
//   const [levelIndex, setLevelIndex] = useState(0);
//   const [cards, setCards] = useState([]);
//   const [selected, setSelected] = useState([]);
//   const [matched, setMatched] = useState([]);
//   const [tank, setTank] = useState(LEVELS[0].tankStart);
//   const [showAll, setShowAll] = useState(true);
//   const [feedback, setFeedback] = useState(null);
//   const [educMessage, setEducMessage] = useState(null);

//   const lock = useRef(false);
//   const tankAnim = useRef(new Animated.Value(1)).current;

//   useEffect(() => {
//     startLevel(levelIndex);
//   }, [levelIndex]);

//   function startLevel(index) {
//     const level = LEVELS[index];
//     const deck = shuffleArray(
//       [...level.pairs, ...level.pairs].map((card, i) => ({
//         ...card,
//         uniqueId: i + '-' + Math.random().toString(),
//       }))
//     );
//     setCards(deck);
//     setMatched([]);
//     setSelected([]);
//     setTank(level.tankStart);
//     tankAnim.setValue(1);
//     setShowAll(true);
//     setEducMessage(`Niveau ${level.level} : Trouve les paires et économise l’eau !`);

//     setTimeout(() => setShowAll(false), 3000);
//   }

//   useEffect(() => {
//     if (selected.length === 2) {
//       lock.current = true;
//       const [first, second] = selected;
//       const card1 = cards[first];
//       const card2 = cards[second];

//       if (card1.id === card2.id) {
//         setFeedback('good');
//         setEducMessage(card1.message);
//         setMatched((prev) => [...prev, first, second]);

//         setTimeout(() => {
//           setFeedback(null);
//           setSelected([]);
//           lock.current = false;

//           if (matched.length + 2 === cards.length) {
//             if (levelIndex < LEVELS.length - 1) {
//               setTimeout(() => {
//                 Alert.alert(
//                   '🎉 Niveau terminé !',
//                   'Passer au niveau suivant ?',
//                   [
//                     { text: 'Non', style: 'cancel' },
//                     {
//                       text: 'Oui',
//                       onPress: () => setLevelIndex(levelIndex + 1),
//                     },
//                   ]
//                 );
//               }, 500);
//             } else {
//               Alert.alert('🏆 Bravo, tu as terminé tous les niveaux !');
//             }
//           }
//         }, 1000);
//       } else {
//         setFeedback('bad');
//         setEducMessage("Oups ! Mauvaise paire, attention à l'eau.");
//         setTimeout(() => {
//           setFeedback(null);
//           setSelected([]);

//           setTank((t) => {
//             const newTank = Math.max(t - LEVELS[levelIndex].drainRate, 0);
//             Animated.timing(tankAnim, {
//               toValue: newTank / LEVELS[levelIndex].tankStart,
//               duration: 400,
//               useNativeDriver: true,
//               easing: Easing.linear,
//             }).start();
//             return newTank;
//           });

//           lock.current = false;
//         }, 1000);
//       }
//     }
//   }, [selected]);

//   useEffect(() => {
//     if (tank <= 0) {
//       Alert.alert(
//         '💧 Game Over',
//         "Le réservoir est vide ! Essaie à nouveau.",
//         [{ text: 'Rejouer', onPress: () => startLevel(levelIndex) }]
//       );
//     }
//   }, [tank]);

//   const onCardPress = (index) => {
//     if (
//       lock.current ||
//       showAll ||
//       selected.includes(index) ||
//       matched.includes(index)
//     )
//       return;
//     if (selected.length < 2) {
//       setSelected((prev) => [...prev, index]);
//     }
//   };

//   return (
//     <View style={styles.container}>
//       <Text style={styles.title}>Sensibilisation à l'eau 💧</Text>

//       <View style={styles.tank}>
//         <Text style={styles.tankLabel}>Réservoir :</Text>
//         <View style={styles.tankBar}>
//           <Animated.View
//             style={[
//               styles.tankFill,
//               { transform: [{ scaleX: tankAnim }] },
//             ]}
//           />
//         </View>
//       </View>

//       <View style={styles.grid}>
//         {cards.map((card, index) => {
//           const flipped =
//             showAll || selected.includes(index) || matched.includes(index);
//           const feedbackStyle =
//             feedback && selected.includes(index)
//               ? feedback === 'good'
//                 ? styles.good
//                 : styles.bad
//               : {};

//           return (
//             <TouchableOpacity
//               key={card.uniqueId}
//               onPress={() => onCardPress(index)}
//               style={[styles.card, flipped && styles.flipped, feedbackStyle]}
//               disabled={flipped}
//               activeOpacity={0.8}
//             >
//               <Text style={styles.emoji}>{flipped ? card.emoji : '❓'}</Text>
//             </TouchableOpacity>
//           );
//         })}
//       </View>

//       {educMessage && (
//         <Text
//           style={[
//             styles.message,
//             feedback === 'good' ? styles.good : feedback === 'bad' ? styles.bad : {},
//           ]}
//         >
//           {educMessage}
//         </Text>
//       )}

//       <TouchableOpacity
//         style={styles.btn}
//         onPress={() => startLevel(levelIndex)}
//       >
//         <Text style={styles.btnText}>🔁 Recommencer</Text>
//       </TouchableOpacity>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     alignItems: 'center',
//     paddingTop: 50,
//     backgroundColor: '#e6faff',
//   },
//   title: {
//     fontSize: 24,
//     fontWeight: 'bold',
//     marginBottom: 10,
//     color: '#004d66',
//   },
//   tank: {
//     width: '90%',
//     marginBottom: 20,
//   },
//   tankLabel: {
//     fontSize: 16,
//     marginBottom: 4,
//     color: '#0077be',
//   },
//   tankBar: {
//     height: 20,
//     backgroundColor: '#cceeff',
//     borderRadius: 10,
//     overflow: 'hidden',
//   },
//   tankFill: {
//     height: '100%',
//     backgroundColor: '#0077be',
//     transform: [{ scaleX: 1 }],
//   },
//   grid: {
//     flexDirection: 'row',
//     flexWrap: 'wrap',
//     justifyContent: 'center',
//     width: '90%',
//     marginBottom: 15,
//   },
//   card: {
//     width: 60,
//     height: 60,
//     backgroundColor: '#0077be',
//     margin: 5,
//     borderRadius: 10,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   flipped: { backgroundColor: '#a2d5f2' },
//   emoji: { fontSize: 30, color: '#fff' },
//   good: { backgroundColor: '#3cd070' },
//   bad: { backgroundColor: '#ff5c5c' },
//   message: {
//     fontSize: 16,
//     marginTop: 10,
//     paddingHorizontal: 20,
//     textAlign: 'center',
//     fontWeight: 'bold',
//   },
//   btn: {
//     marginTop: 20,
//     backgroundColor: '#0077be',
//     paddingVertical: 10,
//     paddingHorizontal: 30,
//     borderRadius: 15,
//   },
//   btnText: { color: '#fff', fontSize: 16, fontWeight: '600' },
// });         easing: Easing.linear,
//             }).start();
//             return newTank;
//           });

//           lock.current = false;
//         }, 1000);
//       }
//     }
//   }, [selected]);

//   useEffect(() => {
//     if (tank <= 0) {
//       Alert.alert(
//         '💧 Game Over',
//         "Le réservoir est vide ! Essaie à nouveau.",
//         [{ text: 'Rejouer', onPress: () => startLevel(levelIndex) }]
//       );
//     }
//   }, [tank]);

//   const onCardPress = (index) => {
//     if (
//       lock.current ||
//       showAll ||
//       selected.includes(index) ||
//       matched.includes(index)
//     )
//       return;
//     if (selected.length < 2) {
//       setSelected((prev) => [...prev, index]);
//     }
//   };

//   return (
//     <View style={styles.container}>
//       <Text style={styles.title}>Sensibilisation à l'eau 💧</Text>

//       <View style={styles.tank}>
//         <Text style={styles.tankLabel}>Réservoir :</Text>
//         <View style={styles.tankBar}>
//           <Animated.View
//             style={[
//               styles.tankFill,
//               { transform: [{ scaleX: tankAnim }] },
//             ]}
//           />
//         </View>
//       </View>

//       <View style={styles.grid}>
//         {cards.map((card, index) => {
//           const flipped =
//             showAll || selected.includes(index) || matched.includes(index);
//           const feedbackStyle =
//             feedback && selected.includes(index)
//               ? feedback === 'good'
//                 ? styles.good
//                 : styles.bad
//               : {};

//           return (
//             <TouchableOpacity
//               key={card.uniqueId}
//               onPress={() => onCardPress(index)}
//               style={[styles.card, flipped && styles.flipped, feedbackStyle]}
//               disabled={flipped}
//               activeOpacity={0.8}
//             >
//               <Text style={styles.emoji}>{flipped ? card.emoji : '❓'}</Text>
//             </TouchableOpacity>
//           );
//         })}
//       </View>

//       {educMessage && (
//         <Text
//           style={[
//             styles.message,
//             feedback === 'good' ? styles.good : feedback === 'bad' ? styles.bad : {},
//           ]}
//         >
//           {educMessage}
//         </Text>
//       )}

//       <TouchableOpacity
//         style={styles.btn}
//         onPress={() => startLevel(levelIndex)}
//       >
//         <Text style={styles.btnText}>🔁 Recommencer</Text>
//       </TouchableOpacity>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     alignItems: 'center',
//     paddingTop: 50,
//     backgroundColor: '#e6faff',
//   },
//   title: {
//     fontSize: 24,
//     fontWeight: 'bold',
//     marginBottom: 10,
//     color: '#004d66',
//   },
//   tank: {
//     width: '90%',
//     marginBottom: 20,
//   },
//   tankLabel: {
//     fontSize: 16,
//     marginBottom: 4,
//     color: '#0077be',
//   },
//   tankBar: {
//     height: 20,
//     backgroundColor: '#cceeff',
//     borderRadius: 10,
//     overflow: 'hidden',
//   },
//   tankFill: {
//     height: '100%',
//     backgroundColor: '#0077be',
//     transform: [{ scaleX: 1 }],
//   },
//   grid: {
//     flexDirection: 'row',
//     flexWrap: 'wrap',
//     justifyContent: 'center',
//     width: '90%',
//     marginBottom: 15,
//   },
//   card: {
//     width: 60,
//     height: 60,
//     backgroundColor: '#0077be',
//     margin: 5,
//     borderRadius: 10,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   flipped: { backgroundColor: '#a2d5f2' },
//   emoji: { fontSize: 30, color: '#fff' },
//   good: { backgroundColor: '#3cd070' },
//   bad: { backgroundColor: '#ff5c5c' },
//   message: {
//     fontSize: 16,
//     marginTop: 10,
//     paddingHorizontal: 20,
//     textAlign: 'center',
//     fontWeight: 'bold',
//   },
//   btn: {
//     marginTop: 20,
//     backgroundColor: '#0077be',
//     paddingVertical: 10,
//     paddingHorizontal: 30,
//     borderRadius: 15,
//   },
//   btnText: { color: '#fff', fontSize: 16, fontWeight: '600' },
// });
