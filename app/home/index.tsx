import { Image, TouchableOpacity, View, Text, StyleSheet } from "react-native";
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

export default function Home(){
    const handleTabPress = (tabName: string) => {
        // Handle tab press logic here
        console.log(`Pressed ${tabName} tab`);
    };

    return(
        <View style={styles.container}>
            <View>
                <Image
                    source={require("../assets/images/logoONEE .png")}
                    // style={styles.logo}
                    resizeMode="contain"
                />
                <TouchableOpacity>
                    <MaterialIcons name="settings" />
                </TouchableOpacity>
            </View>
            <View style={styles.placeholder} />
            <View>
                <Image
                    source={require("../assets/images/mouiha.png")}
                />
            </View>
            <View style={styles.placeholder} />
            <View>
                <Text>
                    Welcome to our water awareness app! Learn about the importance of water conservation through fun activities and games.
                </Text>
            </View>
            <View style={styles.placeholder} />
            <View>
                <View>
                    <Text>Did You know ??!</Text>
                </View>
                <View style={{ marginBottom: 10}} />
                <View>
                    <Text>
                        Welcome to our water awareness app! Learn about the importance of water conservation through fun activities and games.
                    </Text>
                </View>
            </View>
            {/* Bottom Navigation */}
            <View style={styles.bottomNav}>
                <TouchableOpacity
                    style={[styles.navItem, styles.activeNavItem]}
                    onPress={() => handleTabPress('Home')}
                >
                    <View style={styles.navIconPlaceholder}>
                        <Text style={styles.navIcon}>🏠</Text>
                    </View>
                    <Text style={[styles.navText, styles.activeNavText]}>Home</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.navItem}
                    onPress={() => handleTabPress('Quiz')}
                >
                    <View style={styles.navIconPlaceholder}>
                        <Text style={styles.navIcon}>❓</Text>
                    </View>
                    <Text style={styles.navText}>Quiz</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.navItem}
                    onPress={() => handleTabPress('Games')}
                >
                    <View style={styles.navIconPlaceholder}>
                        <Text style={styles.navIcon}>🎮</Text>
                    </View>
                    <Text style={styles.navText}>Games</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.navItem}
                    onPress={() => handleTabPress('Stories')}
                >
                    <View style={styles.navIconPlaceholder}>
                        <Text style={styles.navIcon}>📚</Text>
                    </View>
                    <Text style={styles.navText}>Stories</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.navItem}
                    onPress={() => handleTabPress('Videos')}
                >
                    <View style={styles.navIconPlaceholder}>
                        <Text style={styles.navIcon}>📺</Text>
                    </View>
                    <Text style={styles.navText}>Videos</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {

    },
    placeholder: {
        marginBottom: 40,
    },
    bottomNav: {
        flexDirection: 'row',
        backgroundColor: 'rgba(255, 255, 255, 0.95)',
        paddingVertical: 10,
        paddingHorizontal: 5,
        borderTopWidth: 1,
        borderTopColor: '#e0e0e0',
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
      },
      navItem: {
        flex: 1,
        alignItems: 'center',
        paddingVertical: 8,
        borderRadius: 10,
        marginHorizontal: 2,
      },
      activeNavItem: {
        backgroundColor: 'rgba(33, 150, 243, 0.1)',
      },
      navIconPlaceholder: {
        width: 30,
        height: 30,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 4,
      },
      navIcon: {
        fontSize: 18,
      },
      navText: {
        fontSize: 12,
        color: '#666',
        fontWeight: '500',
      },
      activeNavText: {
        color: '#2196f3',
        fontWeight: 'bold',
      },
})

