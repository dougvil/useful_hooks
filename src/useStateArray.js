import { useState } from 'react';
import { concat, remove, isEqual, find } from 'lodash';

export const useStateArray = (initialArray = []) => {
  const [state, setState] = useState(() => [...initialArray]);

  const _add = (query) => {
    setState((prevState) => concat(prevState, query));
  };

  const _rem = (query, field) => {
    setState((prevState) => {
      const aux = [...prevState];
      remove(aux, (s) =>
        field ? `${field}` === `${s[field]}` : isEqual(s, query)
      );
      return aux;
    });
  };

  const _clear = () => {
    setState([]);
  };

  const _set = (newArray) => {
    setState(newArray);
  };

  const _toggle = (i) => {
    if (find(state, i)) {
      return _rem(i);
    }
    _add(i);
  };

  const _handlers = {};
  _handlers.add = _add;
  _handlers.remove = _rem;
  _handlers.clear = _clear;
  _handlers.set = _set;
  _handlers.toggle = _toggle;

  return [state, _handlers];
};
