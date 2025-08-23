import { useEffect, useState } from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

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
  "إنتاج كيلو واحد من اللحم البقري يحتاج إلى أكثر من 15,000 لتر ماء (معظمها مياه أمطار).",
  "الاستحمام لمدة 5 دقائق بدلاً من 10 دقائق يوفر حوالي 50 لتراً من الماء يومياً.",
  "استخدام غسالة الأطباق الممتلئة بدلاً من الغسيل اليدوي يوفر حتى 100 لتر لكل دورة غسيل.",
  "قطرة ماء واحدة تحتوي على حوالي 166 مليار مليار جزيء من الماء.",
  "المياه الجوفية تشكل أكثر من 30٪ من المياه العذبة في العالم.",
  "الأمطار في صحراء أتاكاما بتشيلي نادرة جداً، مما يجعلها من أجف الأماكن على الأرض.",
  "شجرة واحدة كبيرة يمكن أن تمتص أكثر من 150 لتراً من الماء يومياً.",
  "إنتاج قميص قطني واحد يتطلب حوالي 2,700 لتر من الماء.",
  "المحيطات تحتوي على 97٪ من كل الماء الموجود على الأرض.",
  "يمكن للإنسان أن يعيش بدون طعام لأسابيع، لكن بدون ماء لأيام قليلة فقط.",
  "تركيب أجهزة توفير المياه في الصنابير يمكن أن يقلل استهلاك الماء بنسبة 50٪.",
  "الجليد القطبي يحتوي على حوالي 68٪ من المياه العذبة في العالم.",
  "حوض استحمام ممتلئ يستهلك حوالي 300 لتر، بينما الدش لـ5 دقائق يستهلك 100 لتر فقط.",
  "إنتاج فنجان قهوة واحد يحتاج إلى حوالي 140 لتراً من الماء.",
  "المياه تتبخر من المحيطات بمعدل تريليون لتر كل ثانية.",
  "استخدام نظام الري بالتنقيط يوفر حتى 90٪ من المياه مقارنة بالري التقليدي.",
  "البحر الميت يحتوي على 10 أضعاف ملوحة المحيطات العادية.",
  "كل دقيقة، يموت طفل في مكان ما بالعالم بسبب عدم توفر المياه النظيفة.",
  "إنتاج كيلو واحد من الشوكولاتة يتطلب أكثر من 17,000 لتر من الماء.",
  "المياه الجوفية في بعض طبقات الأرض قد تكون عمرها آلاف السنين.",
  "غسل الخضروات والفواكه في وعاء بدلاً من الماء الجاري يوفر حتى 25 لتراً يومياً."
];

export default function Home() {
  const [didYouKnowText, setDidYouKnowText] = useState("");

  const getRandomFact = (currentFact?: string) => {
  if (didYouKnowData.length === 0) return "";
  if (didYouKnowData.length === 1) return didYouKnowData[0];
  let newFact = currentFact;
  let tries = 0;
  while (newFact === currentFact && tries < 10) {
    const randomIndex = Math.floor(Math.random() * didYouKnowData.length);
    newFact = didYouKnowData[randomIndex];
    tries++;
  }
  return newFact;
};

  useEffect(() => {
    const nextFact = getRandomFact() || "";
    setDidYouKnowText(nextFact);
  }, []);

  const handleDidYouKnowPress = () => {
const nextFact = getRandomFact(didYouKnowText) || "";
  setDidYouKnowText(nextFact);
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Image
          source={require("../../assets/images/1753462668554.png")}
          style={{ width: 165, height: 185 }}
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
  مرحبًا بك في مويهة ! {"\n"}
  اكتشف أهمية الحفاظ على المياه من خلال الألعاب والأنشطة التعليمية
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
    marginBottom: 10,
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
    marginTop: -30,
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
    marginBottom: -50,
    marginTop: -50,
    position: "relative",
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
    marginTop: -25,
    
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
