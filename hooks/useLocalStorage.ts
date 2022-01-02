import { useCallback, useEffect, useState } from "react";

export default function useLocalStorage(
  key: string,
  initialValue: string
): [string, (value: string | ((val: string) => string)) => void] {
  const [storedValue, setStoredValue] = useState<string>("");

  useEffect(() => {
    const item = localStorage.getItem(key);
    setStoredValue(item ?? initialValue);
  }, [key, initialValue]);

  const setValue = useCallback(
    (value: string | ((val: string) => string)) => {
      try {
        const valueToStore =
          value instanceof Function ? value(storedValue) : value;
        setStoredValue(valueToStore);
        localStorage.setItem(key, valueToStore);
      } catch {
        console.error("Error setting localStorage value");
      }
    },
    [key, storedValue]
  );
  return [storedValue, setValue];
}
