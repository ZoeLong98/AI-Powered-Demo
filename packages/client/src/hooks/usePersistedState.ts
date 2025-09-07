import { useState, useEffect } from 'react';

/**
 * Persisted state Hook that stores state using localStorage
 * @param key localStorage key name
 * @param defaultValue default value
 * @returns [state, setState] tuple
 */
export function usePersistedState<T>(key: string, defaultValue: T) {
  // Read from localStorage on initialization
  const [state, setState] = useState<T>(() => {
    try {
      const saved = localStorage.getItem(key);
      if (saved !== null) {
        return JSON.parse(saved);
      }
    } catch (error) {
      console.warn(`Failed to parse localStorage key "${key}":`, error);
    }
    return defaultValue;
  });

  // Save to localStorage when state changes
  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(state));
    } catch (error) {
      console.warn(`Failed to save to localStorage key "${key}":`, error);
    }
  }, [key, state]);

  return [state, setState] as const;
}
