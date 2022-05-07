import { useEffect } from 'react';
import { getDataFromStorage, setDataToStorage } from './helpers';

export function laggy(useSWRNext: any) {
  // @ts-ignore
  return (key, fetcher, config) => {
    const oldData = getDataFromStorage(JSON.stringify(key));
    const swr = useSWRNext(key, fetcher, config);

    useEffect(() => {
      if (swr.data !== undefined) {
        setDataToStorage(JSON.stringify(key), swr.data);
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [swr.data]);

    const dataOrLaggyData = swr.data === undefined ? oldData : swr.data;

    const isLagging = swr.data === undefined && oldData !== undefined;

    return Object.assign({}, swr, {
      data: dataOrLaggyData,
      isLagging,
    });
  };
}
