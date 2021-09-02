import { useCallback, useState } from 'react';
import { assign } from 'lodash';
import { useWatcherEffect } from './useWatcherEffect';
import { getCookie } from '../helpers/setCookie';

const initialFetchState = {
  data: [],
  isFetching: undefined,
  error: false,
  updatedAt: null,
};

const initialFetchStatePaginated = {
  data: { itens: [], paginator: {} },
  isFetching: undefined,
  error: false,
  updatedAt: null,
};

export const useFetch = (endPoint, callback, headers = null, options = {}) => {
  const [state, setState] = useState(() => {
    return options.paginated
      ? { ...initialFetchStatePaginated }
      : { ...initialFetchState };
  });
  const handleState = (newState) =>
    setState((prev) => assign({}, prev, newState));
  const [params, setParams] = useState(null);

  useWatcherEffect(() => {
    if (params) {
      const token = params.token || getCookie('TOKEN') || window.token;

      handleState({ isFetching: true });
      apiRequest({ endPoint, ...params }, token, headers)
        .then((data) => {
          handleState({
            data,
            isFetching: false,
            error: false,
            updatedAt: Date.now(),
          });
          if (callback) callback(data);
        })
        .catch((error) => {
          handleState({
            error,
            isFetching: false,
            updatedAt: Date.now(),
          });
        });
    }
  }, [params]);

  const clear = useCallback(() => {
    setState({ ...initialFetchState });
  }, []);

  return [state, setParams, clear];
};
