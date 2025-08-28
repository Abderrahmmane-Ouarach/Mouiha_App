import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";
import { getQuestionsByLevel, Question } from "./questions";
import NetInfo from "@react-native-community/netinfo";

const STORAGE_KEY_PREFIX = "cachedQuestions_";

export function useQuestions(level: string, retryQuestions?: Question[]) {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [loading, setLoading] = useState(true);

  const STORAGE_KEY = STORAGE_KEY_PREFIX + level;

  // Fonction pour charger le cache
  const loadCache = async () => {
    try {
      const cached = await AsyncStorage.getItem(STORAGE_KEY);
      if (cached) {
        setQuestions(JSON.parse(cached));
        setLoading(false);
      }
    } catch (e) {
      console.warn("Erreur lecture cache:", e);
    }
  };

  // Fonction pour fetch Supabase si online
  const fetchFreshQuestions = async () => {
    try {
      const fresh = await getQuestionsByLevel(level);
      const cached = await AsyncStorage.getItem(STORAGE_KEY);
      if (fresh && fresh.length > 0 && JSON.stringify(fresh) !== cached) {
        await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(fresh));
        setQuestions(fresh);
      }
    } catch (e) {
      console.warn("Erreur fetch questions:", e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Priorité aux retryQuestions
    if (retryQuestions && retryQuestions.length > 0) {
      setQuestions(retryQuestions);
      setLoading(false);
      return;
    }

    loadCache(); // Affiche immédiatement le cache

    // Listener NetInfo pour rafraîchir quand l’internet revient
    const unsubscribe = NetInfo.addEventListener((state) => {
      if (state.isConnected) {
        fetchFreshQuestions();
      }
    });

    // Premier fetch si déjà connecté
    NetInfo.fetch().then((state) => {
      if (state.isConnected) fetchFreshQuestions();
    });

    return () => unsubscribe();
  }, [level, retryQuestions]);

  return { questions, loading };
}
