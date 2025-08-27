import { useState, useCallback } from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { supabase } from "../../lib/supabase";
import { useFocusEffect } from "@react-navigation/native";

export default function Home() {
  const [facts, setFacts] = useState<string[]>([]);
  const [didYouKnowText, setDidYouKnowText] = useState("");

  const loadCachedFacts = async () => {
    const cached = await AsyncStorage.getItem("did_you_know");
    if (cached) {
      const parsed = JSON.parse(cached);
      if (parsed.length > 0) {
        setFacts(parsed);
        const randomIndex = Math.floor(Math.random() * parsed.length);
        setDidYouKnowText(parsed[randomIndex]);
      }
    }
  };

  const fetchFacts = async () => {
    const { data, error } = await supabase.from("did_you_know").select("fact");
    if (error || !data || data.length === 0) return;
    const factList = data.map((item) => item.fact);
    setFacts(factList);
    await AsyncStorage.setItem("did_you_know", JSON.stringify(factList));
    const randomIndex = Math.floor(Math.random() * factList.length);
    setDidYouKnowText(factList[randomIndex]);
  };

  const getRandomFact = (currentFact?: string) => {
    if (facts.length === 0) return "";
    if (facts.length === 1) return facts[0];
    let newFact = currentFact;
    let tries = 0;
    while (newFact === currentFact && tries < 10) {
      const randomIndex = Math.floor(Math.random() * facts.length);
      newFact = facts[randomIndex];
      tries++;
    }
    return newFact;
  };

  useFocusEffect(
    useCallback(() => {
      (async () => {
        await loadCachedFacts();
        await fetchFacts();
      })();
    }, [])
  );

  const handleDidYouKnowPress = () => {
    const nextFact = getRandomFact(didYouKnowText) || "";
    setDidYouKnowText(nextFact);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image
          source={require("../../assets/images/logo ONEE .png")}
          style={{ width: 320, height: 150 }}
          resizeMode="contain"
        />
      </View>
      <View style={styles.placeholder} />
      <View style={styles.mouihaContainer}>
        <Image
          style={styles.mouiha}
          source={require("../../assets/images/uyu.gif")}
          resizeMode="contain"
        />
        <Image
          source={require("../../assets/images/1753462668554.png")}
          resizeMode="contain"
          style={styles.mouihaText}
        />
      </View>
      <View style={styles.placeholder} />
      <View style={styles.blueContainer}>
        <Text style={styles.blueContainerText}>
          مرحبًا بكم في عالم مويهة !
        </Text>
      </View>
      <View style={styles.placeholder} />
      <TouchableOpacity
        style={styles.didYouKnowCard}
        onPress={handleDidYouKnowPress}
      >
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
    
    marginTop: -30,
  },
  mouiha: {
    width: 350,
    height: 350,
    alignSelf: "center",
  },
  mouihaText: {
    width: "90%",
    height: "100%",
    marginTop:-130,
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
