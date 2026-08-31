import { useState, useEffect, useCallback } from 'react';
import { fetchTokenPrices } from '../api/ankr';
import chainList from '../config/chainList.json';

export const useTokenPrices = (tokenOne, tokenTwo) => {
  const [prices, setPrices] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const getPrices = useCallback(async () => {
    if (!tokenOne || !tokenTwo) return;

    setIsLoading(true);
    setError(null);

    try {
      const fetchedPrices = await fetchTokenPrices(tokenOne, tokenTwo, chainList);
      setPrices(fetchedPrices);
    } catch (e) {
      setError('Error fetching token prices');
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  }, [tokenOne, tokenTwo]);

  useEffect(() => {
    getPrices();
  }, [getPrices]);

  return { prices, isLoading, error, refresh: getPrices };
};
