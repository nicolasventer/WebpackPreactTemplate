import { type EffectCallback, useEffect } from "preact/hooks";

/**
 * Hook to run a function on mount
 * @param fn function to run
 */
// eslint-disable-next-line react-hooks/exhaustive-deps
export const useMount = (fn: EffectCallback) => useEffect(fn, []);
