import { useCallback, useEffect, useLayoutEffect } from 'react';

export const useWatcherEffect = (fn, deps) => {
  const memoizedFn = useCallback(fn, deps);
  const effectDeps = [...deps, memoizedFn];
  useEffect(fn, effectDeps);
};

export const useWatcherLayoutEffect = (fn, deps) => {
  const memoizedFn = useCallback(fn, deps);
  const effectDeps = [...deps, memoizedFn];
  useLayoutEffect(fn, effectDeps);
};
