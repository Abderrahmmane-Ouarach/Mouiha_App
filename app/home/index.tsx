import {
    Image,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from "react-native";
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

export default function Home(){

    return(
        <View style={styles.container}>
            <View style={styles.header}>
                <Image
          source={require("../../assets/images/1753462668554.png")}
          style={{ width: 185, height: 185, marginTop: 0, marginBottom: 0 }}
          resizeMode="contain"
        />
                <TouchableOpacity style={styles.iconButton}>
                    <MaterialIcons name="settings" style={styles.icon} />
                </TouchableOpacity>
            </View>
            <View style={styles.placeholder} />
            <View style={styles.mouihaContainer}>
                <Image
                    style={styles.mouiha}
                    source={require("../../assets/images/uyu.gif")}
                    resizeMode="contain"
                />
            </View>
            <View style={styles.placeholder} />
            <View style={styles.blueContainer}>
                <Text style={styles.blueContainerText}>
                    مرحبًا بك في تطبيق التوعية بالمياه لدينا! تعرف على أهمية الحفاظ على المياه من خلال الأنشطة الترفيهية والألعاب.
                </Text>
            </View>
            <View style={styles.placeholder} />
            <View>
                <View style={styles.didYouKnowCard}>
                    <Text style={styles.didYouKnowTitle}>هل تعلم ؟</Text>
                    <Text style={styles.didYouKnowText}>
                        أن كل قطرة ماء مهمة؟ الحفاظ على المياه يساعد في حماية البيئة وضمان توفرها للأجيال القادمة.
                    </Text>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#e6f2ff", // Softer blue background
        alignItems: "center",
        justifyContent: "space-between",
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
    mouihaContainer: {
        backgroundColor: '#e6f2ff',
        alignItems: 'center',
        justifyContent: 'center',
        width: 200,
        height: 200,
        borderRadius: 100,
        alignSelf: 'center',
        padding: 10,
    },
    gif: {
    width: 200,
    height: 300,
  },
    mouiha: {
        width: 350,
        height: 350,
        alignSelf: 'center',
    },
    blueContainer: {
        backgroundColor: '#007acc',
        padding: 18,
        borderRadius: 18,
        marginHorizontal: 16,
        shadowColor: '#007acc',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.18,
        shadowRadius: 8,
        elevation: 4,
        width: '90%',
        alignSelf: 'center',
    },
    blueContainerText: {
        color: '#fff',
        fontSize: 17,
        textAlign: 'center',
        lineHeight: 24,
        fontFamily: "Tajawal-Medium",
    letterSpacing: 0.2,
    },
    didYouKnowCard: {
        backgroundColor: '#fff',
        borderRadius: 16,
        padding: 16,
        marginVertical: 10,
        marginHorizontal: 16,
        shadowColor: '#007acc',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.10,
        shadowRadius: 6,
        elevation: 2,
        width: '90%',
        alignSelf: 'center',
    },
    didYouKnowTitle: {
        color: '#007acc',
        fontFamily:"Tajawal-Bold",

        fontSize: 16,
        marginBottom: 6,
        textAlign: 'center',
    },
    didYouKnowText: {
        color: '#333',
        fontSize: 15,
        textAlign: 'center',
        fontFamily: "Tajawal-Regular",
        lineHeight: 22,
    },
    
})
