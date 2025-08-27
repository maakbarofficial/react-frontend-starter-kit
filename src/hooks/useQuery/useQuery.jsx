import { useState, useEffect, useRef } from 'react';

const useQuery = (config) => {
  const { fn, method = 'GET', body = null, immediate = true, revalidateInterval, retry = 0, abortInterval } = config;

  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(null);
  const intervalRef = useRef(null);
  const abortControllerRef = useRef(null);
  const retryCountRef = useRef(0);

  const query = async () => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }

    abortControllerRef.current = new AbortController();

    const abortTimeout = setTimeout(() => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
        setIsError('Request timed out');
      }
    }, abortInterval);

    try {
      setIsLoading(true);
      let result;
      if (method === 'GET') {
        result = await fn({ signal: abortControllerRef.current.signal });
      } else if (method === 'POST' || method === 'PUT' || method === 'DELETE') {
        result = await fn(body, { signal: abortControllerRef.current.signal });
      }
      setData(result);
      setIsError(null);
      retryCountRef.current = 0;
    } catch (err) {
      console.error('Failed to query data', err.message);
      setIsError(err.message);

      if (retryCountRef.current < retry) {
        retryCountRef.current += 1;
        console.log(`Retrying... (${retryCountRef.current}/${retry})`);
        query();
      }
    } finally {
      clearTimeout(abortTimeout);
      setIsLoading(false);
      abortControllerRef.current = null;
    }
  };

  const startRevalidation = () => {
    if (revalidateInterval && typeof revalidateInterval === 'number' && revalidateInterval > 0) {
      intervalRef.current = setInterval(() => {
        query();
      }, revalidateInterval);
    }
  };

  const stopRevalidation = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };

  useEffect(() => {
    if (immediate) {
      query();
    }

    startRevalidation();

    return () => {
      stopRevalidation();
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };
  }, [fn, method, body, immediate, revalidateInterval, retry, abortInterval]);

  const revalidate = () => {
    query();
  };

  return { data, isLoading, isError, query, revalidate };
};

export default useQuery;
