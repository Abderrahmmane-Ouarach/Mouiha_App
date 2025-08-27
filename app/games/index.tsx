import { useNavigation } from "@react-navigation/native";
import { useRef } from "react";
import {
  Animated,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Dimensions
} from "react-native";

const { width, height } = Dimensions.get('window');

const games = [
  { 
    title: "ذاكرة الماء", 
    path: "FlipMacher", 
    image: require("../../assets/images/1755905122696.png"), 
    disabled: false,
    description: "تحدى ذاكرتك مع لعبة الماء"
  },
  { 
    title: "احفظ القطرة", 
    path: "SaveTheDrop", 
    image: require("../../assets/images/1755905122702.png"), 
    disabled: false,
    description: "ساعد في حفظ كل قطرة ماء"
  },
];

export default function Games() {
  const navigation = useNavigation();
  
  // Create separate refs for scale and rotation animations
  const scaleAnims = useRef(games.map(() => new Animated.Value(1))).current;
  const rotateAnims = useRef(games.map(() => new Animated.Value(0))).current;

  const handlePress = (path: string) => {
    navigation.navigate(path as never);
  };

  const onPressIn = (index: number) => {
    if (games[index].disabled) return;
    
    Animated.parallel([
      Animated.spring(scaleAnims[index], {
        toValue: 0.95,
        useNativeDriver: true,
      }),
      Animated.timing(rotateAnims[index], {
        toValue: 1,
        duration: 200,
        useNativeDriver: true,
      })
    ]).start();
  };

  const onPressOut = (index: number) => {
    if (games[index].disabled) return;
    
    Animated.parallel([
      Animated.spring(scaleAnims[index], {
        toValue: 1,
        friction: 4,
        tension: 100,
        useNativeDriver: true,
      }),
      Animated.timing(rotateAnims[index], {
        toValue: 0,
        duration: 200,
        useNativeDriver: true,
      })
    ]).start(() => handlePress(games[index].path));
  };

  return (
    <View style={styles.container}>
      {/* Header Section */}
      <View style={styles.headerSection}>
        <View style={styles.imageContainer}>
          <Image
            source={require("../../assets/images/logoo.png")}
            style={styles.headerImage}
            resizeMode="contain"
          />
        </View>
        <View style={styles.titleContainer}>
          <Text style={styles.mainTitle}>العب واستفد مع مويهة</Text>
          <Text style={styles.subtitle}>اختر لعبتك المفضلة</Text>
        </View>
      </View>

      {/* Games Grid */}
      <View style={styles.gamesContainer}>
        <View style={styles.gamesGrid}>
          {games.map((game, index) => {
            const rotateInterpolate = rotateAnims[index].interpolate({
              inputRange: [0, 1],
              outputRange: ['0deg', '2deg']
            });

            return (
              <Animated.View
                key={game.title}
                style={[
                  styles.gameCard,
                  game.disabled && styles.disabledCard,
                  {
                    transform: [
                      { scale: scaleAnims[index] },
                      { rotate: rotateInterpolate }
                    ]
                  }
                ]}
              >
                <TouchableOpacity
                  activeOpacity={0.9}
                  disabled={game.disabled}
                  onPressIn={() => onPressIn(index)}
                  onPressOut={() => onPressOut(index)}
                  style={styles.touchableContent}
                >
                  <View style={styles.imageWrapper}>
                    <Image source={game.image} style={styles.gameImage} />
                    {!game.disabled && <View style={styles.shimmerEffect} />}
                  </View>
                  
                  <View style={styles.textContent}>
                    <Text style={styles.gameTitle}>{game.title}</Text>
                    <Text style={styles.gameDescription}>{game.description}</Text>
                  </View>
                  
                  {!game.disabled && (
                    <View style={styles.playButton}>
                      <Text style={styles.playButtonText}>العب الآن</Text>
                    </View>
                  )}
                </TouchableOpacity>
              </Animated.View>
            );
          })}
        </View>
      </View>

      {/* Decorative Elements */}
      <View style={styles.decorativeElements}>
        <View style={[styles.bubble, styles.bubble1]} />
        <View style={[styles.bubble, styles.bubble2]} />
        <View style={[styles.bubble, styles.bubble3]} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e6f7ff',
    paddingTop: 50,
    paddingBottom: 30,
    paddingHorizontal: 20,
  },
  
  headerSection: {
    alignItems: 'center',
    marginBottom: 40,
  },
  
  imageContainer: {
    marginBottom: 10,
    marginTop: -50,
  },
  
  headerImage: {
    width: 150,
    height: 200,
  },
  
  titleContainer: {
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    paddingVertical: 15,
    paddingHorizontal: 25,
    borderRadius: 25,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
    marginTop: -20,
  },
  
  mainTitle: {
    fontSize: 24,
    fontFamily: "Tajawal-Bold",
    color: "#0066cc",
    textAlign: "center",
    marginBottom: 5,
  },
  
  subtitle: {
    fontSize: 16,
    fontFamily: "Tajawal-Regular",
    color: "#0080cc",
    textAlign: "center",
    opacity: 0.8,
  },
  
  gamesContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  
  gamesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    alignItems: 'center',
    gap: 20,
  },
  
  gameCard: {
    backgroundColor: '#ffffff',
    borderRadius: 25,
    padding: 20,
    width: width * 0.4,
    minHeight: 220,
    shadowColor: "#0066cc",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.15,
    shadowRadius: 15,
    elevation: 8,
    borderWidth: 3,
    borderColor: '#e1f5fe',
    overflow: 'hidden',
  },
  
  disabledCard: {
    opacity: 0.6,
    backgroundColor: '#f5f5f5',
  },
  
  touchableContent: {
    alignItems: 'center',
    height: '100%',
    justifyContent: 'space-between',
  },
  
  imageWrapper: {
    position: 'relative',
    marginBottom: 15,
  },
  
  gameImage: {
    width: 90,
    height: 90,
    borderRadius: 5,
    backgroundColor: '#f0f8ff',
    padding: 8,
  },
  
  shimmerEffect: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    borderRadius: 15,
  },
  
  textContent: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },
  
  gameTitle: {
    fontSize: 18,
    fontFamily: "Tajawal-Bold",
    color: "#0066cc",
    textAlign: "center",
    marginBottom: 8,
  },
  
  gameDescription: {
    fontSize: 13,
    fontFamily: "Tajawal-Regular",
    color: "#0080cc",
    textAlign: "center",
    opacity: 0.8,
    lineHeight: 18,
  },
  
  playButton: {
    backgroundColor: '#0066cc',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 15,
    marginTop: 10,
  },
  
  playButtonText: {
    color: '#ffffff',
    fontSize: 14,
    fontFamily: "Tajawal-Bold",
    textAlign: 'center',
  },
  
  decorativeElements: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: -1,
  },
  
  bubble: {
    position: 'absolute',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 50,
  },
  
  bubble1: {
    width: 60,
    height: 60,
    top: '15%',
    left: '10%',
  },
  
  bubble2: {
    width: 40,
    height: 40,
    top: '70%',
    right: '15%',
  },
  
  bubble3: {
    width: 80,
    height: 80,
    top: '45%',
    left: '5%',
  },
});