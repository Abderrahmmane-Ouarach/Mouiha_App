import { useEffect, useState } from "react";
import { getLevels } from "./questions";

export function useLevels() {
  const [levels, setLevels] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLevels = async () => {
      setLoading(true);
      const lvls = await getLevels();
      setLevels(lvls);
      setLoading(false);
    };

    fetchLevels();
  }, []);

  return { levels, loading };
}
