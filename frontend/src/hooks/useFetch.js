import { useState, useEffect, useMemo } from "react";

const BASE_URL = import.meta.env.VITE_BASE_URL;

function useFetch(endpoint, payload) {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (endpoint === null) {
      return;
    };

    const fetchData = async () => {
      setIsLoading(true);
      try {
        const options = {
          method: payload.method || 'GET',
          headers: {
            "Content-Type": "application/json",
            ...payload.headers,
          },
          body: payload.method === 'GET' ? null : JSON.stringify(payload.body),
        };

        const response = await fetch(`${BASE_URL}${endpoint}`, options);
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const json = await response.json();
        setData(json);
      } catch (error) {
        setError(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [endpoint, payload]);

  return { data, error, isLoading };
}

export default useFetch;
