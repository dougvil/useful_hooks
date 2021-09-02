import { useState } from 'react';
import { isEmpty, concat, uniqBy } from 'lodash';
import { usePrevious } from 'react-use';
import { useWatcherEffect } from './useWatcherEffect';

export const useStoreDataControl = (store) => {
  const [ready, setReady] = useState(false);
  const [completed, setCompleted] = useState(false);
  const {
    data: { itens, paginator },
  } = store;

  const previousPaginator = usePrevious(paginator);

  const [mergedData, setMergedData] = useState(store.data);

  useWatcherEffect(() => {
    /** Valida se ja atingiu a ultima pagina */
    if (!isEmpty(paginator) && !completed) {
      setCompleted(paginator.current_page === paginator.last_page);
    }
    if (ready) {
      // console.log(paginator, paginator.current_page === paginator.last_page);

      if (previousPaginator.current_page < paginator.current_page) {
        /** Se avancou para proxima pagina concatena o conteudo no final do array */
        return setMergedData({
          itens: concat([], mergedData.itens, itens),
          paginator,
        });
      }
      /** Se voltou para pagina contatena no inicio do array e limpa duplicados */
      const mixedArray = concat([], itens, mergedData.itens);
      return setMergedData({
        itens: uniqBy(mixedArray, 'id'),
        paginator,
      });
    }
    setReady(true);
  }, [store.data]);

  return {
    ...store,
    data: { ...mergedData, completed },
  };
};
