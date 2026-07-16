import { useEffect, useState } from "react";

export default function useLocalStorage<T>(
  key: string,
  initialValue: T
) {
  const [value, setValue] = useState<T>(() => {
    try {
      const item = localStorage.getItem(key);

      if (item) {
        return JSON.parse(item);
      }

      return initialValue;
    } catch {
      return initialValue;
    }
  });


  useEffect(() => {
    try {
      localStorage.setItem(
        key,
        JSON.stringify(value)
      );
    } catch {
      console.error(
        "Erro ao salvar no localStorage"
      );
    }
  }, [key, value]);


  return [
    value,
    setValue,
  ] as const;
}