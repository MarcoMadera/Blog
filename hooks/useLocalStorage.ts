import { useCallback, useEffect, useState } from "react";

export default function useLocalStorage(
  key: string,
  initialValue: string
): [string, (value: string | ((val: string) => string)) => void] {
  // State to store our value
  // Pass initial state function to useState so logic is only executed once
  const [storedValue, setStoredValue] = useState<string>("");

  useEffect(() => {
    // Get from local storage by key
    const item = localStorage.getItem(key);
    // If none return initialValue
    setStoredValue(item ?? initialValue);
  }, [key, initialValue]);

  // Return a wrapped version of useState's setter function that ...
  // ... persists the new value to localStorage.
  const setValue = useCallback(
    (value: string | ((val: string) => string)) => {
      try {
        // Allow value to be a function so we have same API as useState
        const valueToStore =
          value instanceof Function ? value(storedValue) : value;
        // Save state
        setStoredValue(valueToStore);
        // Save to local storage
        localStorage.setItem(key, valueToStore);
      } catch (error) {
        // A more advanced implementation would handle the error case
        console.log(error);
      }
    },
    [key, storedValue]
  );
  return [storedValue, setValue];
}
