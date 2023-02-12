import { useEffect, useState } from "react";
/**
 @function useDebounce
 @description  Custom hook to debounce a value using the useState and useEffect hooks.
 @template T
 @param {T} value - The value to be debounced.
 @param {number} [delay=500] - The delay in milliseconds before setting the debounced value.
 @returns {T} The debounced value.
 @example useDebounce(addUser,500)
 */
function useDebounce<T>(value: T, delay?: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedValue(value), delay || 500);

    return () => {
      clearTimeout(timer);
    };
  }, [value, delay]);

  return debouncedValue;
}

export default useDebounce;
