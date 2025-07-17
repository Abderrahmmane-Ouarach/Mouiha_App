import {
    Image,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from "react-native";

export default function Videos() {
    return(
        <View style={styles.container}>
            <View style={styles.header}>
                <Image
                    source={require("../../assets/images/logoONEE .png")}
                    style={styles.logo}
                    resizeMode="contain"
                />
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
    
})