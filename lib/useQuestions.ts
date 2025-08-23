import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";
import NetInfo from "@react-native-community/netinfo";
import { getQuestionsByLevel, Question } from "./questions";

const STORAGE_KEY_PREFIX = "cachedQuestions_";

export function useQuestions(level: string, retryQuestions?: Question[]) {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (retryQuestions && retryQuestions.length > 0) {
      setQuestions(retryQuestions);
      setLoading(false);
      return;
    }

    const STORAGE_KEY = STORAGE_KEY_PREFIX + level;

    const loadQuestions = async () => {
      setLoading(true);

      try {
        // 1️⃣ Charger cache immédiatement
        const cached = await AsyncStorage.getItem(STORAGE_KEY);
        if (cached) {
          setQuestions(JSON.parse(cached));
          setLoading(false);
        }

        // 2️⃣ Vérifier connexion internet
        const netInfo = await NetInfo.fetch();
        const isConnected = netInfo.isConnected;

        if (!isConnected) {
          console.log("📴 Pas de connexion, utilisation du cache uniquement");
          return; // arrêter ici si offline
        }

        // 3️⃣ Fetch depuis Supabase
        const fresh = await getQuestionsByLevel(level);
        if (fresh && fresh.length > 0) {
          if (JSON.stringify(fresh) !== cached) {
            await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(fresh));
            setQuestions(fresh);
          }
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
