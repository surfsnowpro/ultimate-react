import {useEffect, useState} from "react";

export function useLocalStorageState(key, initialValue) {
  const [state, setState] = useState( function() {
    const value = localStorage.getItem(key);
    return value ? JSON.parse(value) : initialValue;
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(state));
  }, [key, state])

  return [state, setState];
}