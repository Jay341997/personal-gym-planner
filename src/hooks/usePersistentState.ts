import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";

export function usePersistentState<T>(
  storageKey: string,
  initialValue: T,
  migrate?: (raw: unknown) => T
) {
  const [state, setState] = useState<T>(initialValue);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const saved = await AsyncStorage.getItem(storageKey);
        if (saved) {
          const parsed = JSON.parse(saved);
          setState(migrate ? migrate(parsed) : (parsed as T));
        }
      } catch (error) {
        console.warn("Failed to load local data", error);
      } finally {
        setLoading(false);
      }
    }

    load();
  }, [storageKey]);

  useEffect(() => {
    if (loading) return;

    AsyncStorage.setItem(storageKey, JSON.stringify(state)).catch((error) => {
      console.warn("Failed to save local data", error);
    });
  }, [loading, state, storageKey]);

  return { state, setState, loading };
}
