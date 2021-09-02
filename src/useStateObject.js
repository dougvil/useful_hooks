import { useMemo, useState, useCallback } from 'react';

const applyInitialState = (initialState) => {
  if (typeof initialState === 'function') {
    return initialState();
  }
  return { ...initialState };
};

export const useStateObject = (initialState = {}) => {
  const memoizedState = useMemo(() => initialState, [initialState]);

  const [state, _setState] = useState(() => applyInitialState(initialState));

  const setState = useCallback((newState) => {
    _setState((oldState) => ({ ...oldState, ...newState }));
  }, []);

  const resetState = useCallback(
    (toState) => _setState(applyInitialState(toState || memoizedState)),
    [memoizedState]
  );

  return [state, setState, resetState];
};
