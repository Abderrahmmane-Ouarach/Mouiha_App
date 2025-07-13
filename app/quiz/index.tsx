import { useNavigation } from '@react-navigation/native';
import type { NavigationProp } from '@react-navigation/native';
import { View,
    TouchableOpacity,
    Text,
    StyleSheet,
 } from "react-native"

export default function Quiz() {
    const navigation = useNavigation<NavigationProp<any>>();

    const handleTabPress = (tabName: string) => {
        navigation.navigate(tabName);
    };

    return(
        <View>
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
    )
}

const styles = StyleSheet.create({
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
