import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";
import { getQuestionsByLevel, Question } from "./questions";
import NetInfo from "@react-native-community/netinfo";

const STORAGE_KEY_PREFIX = "cachedQuestions_";

export function useQuestions(level: string, retryQuestions?: Question[]) {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const STORAGE_KEY = STORAGE_KEY_PREFIX + level;

    const loadQuestions = async () => {
      setLoading(true);

      // 1️⃣ priorité aux retryQuestions
      if (retryQuestions && retryQuestions.length > 0) {
        setQuestions(retryQuestions);
        setLoading(false);
        return;
      }

      try {
        // 2️⃣ Charger cache si disponible
        const cached = await AsyncStorage.getItem(STORAGE_KEY);
        if (cached) {
          setQuestions(JSON.parse(cached));
          setLoading(false);
        }

        // 3️⃣ Vérifier connexion
        const netInfo = await NetInfo.fetch();
        if (!netInfo.isConnected) {
          console.log("📴 Pas de connexion → utilisation du cache uniquement");
          return;
        }

        // 4️⃣ Fetch depuis Supabase
        const fresh = await getQuestionsByLevel(level);
        if (fresh && fresh.length > 0 && JSON.stringify(fresh) !== cached) {
          await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(fresh));
          setQuestions(fresh);
        }
      } catch (e) {
        console.warn("Erreur load questions:", e);
      } finally {
        setLoading(false);
      }
    };

    loadQuestions();
  }, [level, retryQuestions]);

  return { questions, loading };
}
