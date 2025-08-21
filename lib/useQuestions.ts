import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";
import { getQuestionsByLevel, Question } from "./questions";

const STORAGE_KEY_PREFIX = "cachedQuestions_";

export function useQuestions(level: string, retryQuestions?: Question[]) {
  console.log("👀 Hook useQuestions mounted, level=", level);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    console.log("🔥 useQuestions triggered for level:", level);

    // ✅ priorité aux retryQuestions
    if (retryQuestions && retryQuestions.length > 0) {
      console.log("♻️ Using retryQuestions only:", retryQuestions.length);
      setQuestions(retryQuestions);
      setLoading(false);
      return;
    }

    const STORAGE_KEY = STORAGE_KEY_PREFIX + level;

    const loadQuestions = async () => {
      setLoading(true);

      try {
        // 1️⃣ Charger cache s'il existe (affichage immédiat)
        const cached = await AsyncStorage.getItem(STORAGE_KEY);
        if (cached) {
          const parsed: Question[] = JSON.parse(cached);
          console.log("📦 Loaded from cache:", parsed);
          setQuestions(parsed);
          setLoading(false);
        }

        // 2️⃣ Toujours fetch depuis Supabase → pour mise à jour
        console.log("🌐 Fetching fresh questions from Supabase for:", level);
        const fresh = await getQuestionsByLevel(level);

        if (fresh && fresh.length > 0) {
          console.log("🆕 Fresh questions fetched:", fresh);

          // comparer avec cache avant d'écraser
          if (JSON.stringify(fresh) !== cached) {
            console.log("🔄 Updating cache with new questions...");
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
