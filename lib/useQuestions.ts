import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getQuestionsByLevel, Question } from "./questions";

const STORAGE_KEY_PREFIX = "cachedQuestions_";

export function useQuestions(level: string, retryQuestions?: Question[]) {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [loading, setLoading] = useState(true);

  const loadFromCache = async () => {
    try {
      const json = await AsyncStorage.getItem(STORAGE_KEY_PREFIX + level);
      if (json) {
        const cachedQuestions: Question[] = JSON.parse(json);
        setQuestions(cachedQuestions);
        setLoading(false);
        return true;
      }
    } catch (e) {
      console.warn("Erreur lecture cache questions:", e);
    }
    return false;
  };

  const fetchAndCacheQuestions = async () => {
    try {
      if (retryQuestions && retryQuestions.length > 0) {
        setQuestions(retryQuestions);
      } else {
        const freshQuestions = await getQuestionsByLevel(level);
        setQuestions(freshQuestions);
        await AsyncStorage.setItem(
          STORAGE_KEY_PREFIX + level,
          JSON.stringify(freshQuestions)
        );
      }
    } catch (e) {
      console.warn("Erreur fetch questions Supabase:", e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setLoading(true);
    loadFromCache().then((found) => {
      if (!found) {
        fetchAndCacheQuestions();
      }
    });
  }, [level, retryQuestions]);

  return { questions, loading };
}
