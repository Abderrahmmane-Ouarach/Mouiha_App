import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import NetInfo from "@react-native-community/netinfo";
import { getLevels } from "./questions";


const STORAGE_KEY = "cachedLevels";

export function useLevels() {
  const [levels, setLevels] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchAndCacheLevels = async () => {
    try {
      const fresh = await getLevels();
      if (fresh && fresh.length > 0) {
        await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(fresh));
        setLevels(fresh);
      }
    } catch (e) {
      console.error("Erreur fetch niveaux:", e);
    }
  };

  useEffect(() => {
    const loadLevels = async () => {
      setLoading(true);

      try {
        // 1️⃣ Charger cache
        const cached = await AsyncStorage.getItem(STORAGE_KEY);
        if (cached) {
          setLevels(JSON.parse(cached));
          setLoading(false);
        }

        // 2️⃣ Vérifier connexion
        const netInfo = await NetInfo.fetch();
        if (!netInfo.isConnected) {
          console.log("📴 Pas de connexion → utilisation du cache uniquement");
          return;
        }

        // 3️⃣ Fetch depuis Supabase
        await fetchAndCacheLevels();
      } catch (e) {
        console.error("Erreur load levels:", e);
      } finally {
        setLoading(false);
      }
    };

    loadLevels();

    // 4️⃣ Rafraîchir quand internet revient
    const unsubscribe = NetInfo.addEventListener((state) => {
      if (state.isConnected) {
        fetchAndCacheLevels();
      }
    });

    return () => unsubscribe();
  }, []);

  return { levels, loading };
}
