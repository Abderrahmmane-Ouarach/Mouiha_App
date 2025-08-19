import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useState, useEffect } from "react";

const didYouKnowData = [
  "70٪ من سطح الأرض مغطى بالمياه، ولكن أقل من 1٪ فقط صالح للشرب.",
  "تسرب صنبور بمعدل قطرة في الثانية يمكن أن يهدر أكثر من 11,000 لتر ماء في السنة.",
  "غسل السيارة بدلو ماء بدل الخرطوم يوفر أكثر من 200 لتر في كل غسلة.",
  "زراعة الأرز تستهلك كميات ضخمة من المياه مقارنة بمحاصيل أخرى.",
  "إغلاق الصنبور أثناء تنظيف الأسنان يوفر حتى 30 لتراً يومياً للفرد.",
  "إعادة تدوير لتر واحد من المياه الرمادية يمكن أن يوفر كميات كبيرة من المياه العذبة.",
  "في بعض الدول، أكثر من 80٪ من استهلاك المياه يذهب للزراعة.",
  "ترشيد استهلاك المياه يساهم أيضاً في تقليل استهلاك الطاقة المستخدمة في ضخها وتسخينها.",
  "الماء يشكل حوالي 60٪ من وزن جسم الإنسان.",
  "إنتاج كيلو واحد من اللحم البقري يحتاج إلى أكثر من 15,000 لتر ماء."
];

export default function Home() {
  const [didYouKnowText, setDidYouKnowText] = useState("");

  // Fonction qui choisit un fait aléatoire différent
  const getRandomFact = (currentFact?: string) => {
    let newFact = currentFact;
    while (newFact === currentFact) {
      const randomIndex = Math.floor(Math.random() * didYouKnowData.length);
      newFact = didYouKnowData[randomIndex];
    }
    return newFact;
  };

  useEffect(() => {
    // Premier affichage
    setDidYouKnowText(getRandomFact());
  }, []);

  const handleDidYouKnowPress = () => {
    // Nouveau fait différent
    setDidYouKnowText(getRandomFact(didYouKnowText));
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Image
          source={require("../../assets/images/1753462668554.png")}
          style={{ width: 185, height: 185 }}
          resizeMode="contain"
        />
      </View>

      <View style={styles.placeholder} />

      {/* Gif central */}
      <View style={styles.mouihaContainer}>
        <Image
          style={styles.mouiha}
          source={require("../../assets/images/uyu.gif")}
          resizeMode="contain"
        />
      </View>

      <View style={styles.placeholder} />

      {/* Texte de bienvenue */}
      <View style={styles.blueContainer}>
        <Text style={styles.blueContainerText}>
          مرحبًا بك في تطبيق التوعية بالمياه مويهة! تعرف على أهمية الحفاظ على
          المياه من خلال الأنشطة الترفيهية والألعاب.
        </Text>
      </View>

      <View style={styles.placeholder} />

      {/* Section Did You Know */}
      <TouchableOpacity style={styles.didYouKnowCard} onPress={handleDidYouKnowPress}>
        <Image
          source={require("../../assets/images/lampe.png")}
          style={styles.backgroundImage}
        />
        <Text style={styles.didYouKnowTitle}>هل تعلم ؟</Text>
        <Text style={styles.didYouKnowText}>{didYouKnowText}</Text>
        <Text style={styles.tapHint}>اضغط لمعرفة معلومة جديدة 💡</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#e6f2ff",
    alignItems: "center",
    justifyContent: "space-between",
    paddingTop: 50,
    paddingBottom: 20,
  },
  header: {
    width: "100%",
    height: 60,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
  },
  placeholder: {
    marginBottom: 15,
  },
  mouihaContainer: {
    backgroundColor: "#e6f2ff",
    alignItems: "center",
    justifyContent: "center",
    width: 200,
    height: 200,
    borderRadius: 100,
    alignSelf: "center",
    padding: 10,
  },
  mouiha: {
    width: 350,
    height: 350,
    alignSelf: "center",
  },
  blueContainer: {
    backgroundColor: "#007acc",
    padding: 18,
    borderRadius: 18,
    marginHorizontal: 16,
    shadowColor: "#007acc",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.18,
    shadowRadius: 8,
    elevation: 4,
    width: "90%",
    alignSelf: "center",
  },
  blueContainerText: {
    color: "#fff",
    fontSize: 17,
    textAlign: "center",
    lineHeight: 24,
    fontFamily: "Tajawal-Medium",
    letterSpacing: 0.2,
  },
  backgroundImage: {
    position: "absolute",
    top: 0.9,
    left: -1,
    width: 90,
    height: 90,
    resizeMode: "contain",
    opacity: 0.15,
    zIndex: 0,
  },
  didYouKnowCard: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 16,
    marginVertical: 10,
    marginHorizontal: 16,
    shadowColor: "#007acc",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 2,
    width: "90%",
    alignSelf: "center",
    position: "relative",
    overflow: "hidden",
  },
  didYouKnowTitle: {
    color: "#007acc",
    fontFamily: "Tajawal-Bold",
    fontSize: 16,
    marginBottom: 6,
    textAlign: "center",
    zIndex: 1,
  },
  didYouKnowText: {
    color: "#333",
    fontSize: 15,
    textAlign: "center",
    fontFamily: "Tajawal-Regular",
    lineHeight: 22,
    zIndex: 1,
  },
  tapHint: {
    marginTop: 8,
    fontSize: 13,
    color: "#acb1b4ff",
    textAlign: "center",
    fontFamily: "Tajawal-Medium",
  },
});
