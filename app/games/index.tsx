import { useNavigation } from "@react-navigation/native";
import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from "react-native";

const games = [
    { title: 'ذاكرة الماء', path: 'FlipMacher', image: require('../../assets/images/mouiha.png') },
    { title: 'التلوين', path: 'FlipMacher', image: require('../../assets/images/mouiha.png') },
]

export default function Games() {
    const navigation = useNavigation();
    
    return(
        <View style={styles.container}>
            <View style={styles.header}>
                <Image
                    source={require("../../assets/images/logoONEE .png")}
                    style={styles.logo}
                    resizeMode="contain"
                />
            </View>
            <View style={styles.gamesGrid}>
                { games.map((game) => (
                    <View key={game.title} style={styles.gameCard}>
                        <TouchableOpacity
                            style={{ alignItems: 'center', width: '100%' }}
                            onPress={() => {
                                console.log('Navigating to game:', game.path);
                                navigation.navigate(game.path as never);
                            }}
                        >
                            <Image
                                source={game.image}
                                style={styles.gameImage}
                            />
                            <Text style={styles.gameCardText}>{game.title}</Text>
                        </TouchableOpacity>
                    </View>
                ))}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#e6f2ff", // Softer blue background
        alignItems: "center",
        paddingTop: 50,
        paddingBottom: 20,
    },
    header: {
        width: '100%',
        height: 60,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative',
        marginBottom: 20,
    },
    logo: {
        width: 280,
        height: 45,
        alignSelf: 'center',
    },
    iconButton: {
        position: 'absolute',
        right: 5,
        top: 5,
        padding: 8,
    },
    icon: {
        fontSize: 28,
        color: '#007acc',
    },
    placeholder: {
        marginBottom: 15,
    },
    gamesGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
        marginTop: 20,
        gap: 12,
    },
    gameCard: {
        backgroundColor: '#fff',
        borderRadius: 14,
        padding: 12,
        margin: 6,
        alignItems: 'center',
        width: 140,
        shadowColor: '#007acc',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.10,
        shadowRadius: 6,
        elevation: 2,
    },
    gameImage: {
        width: 60,
        height: 60,
        borderRadius: 10,
        marginBottom: 8,
        resizeMode: 'contain',
        alignSelf: 'center',
    },
    gameCardText: {
        fontSize: 15,
        color: '#007acc',
        textAlign: 'center',
        fontFamily: 'Tajawal-Bold',
    },
})