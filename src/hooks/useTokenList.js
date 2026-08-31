import { useState, useEffect, useCallback } from 'react';
import { tokenListService } from '../services/tokenListService';

export const useTokenList = (chainId = null) => {
  const [tokenList, setTokenList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const loadTokenList = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      const tokens = await tokenListService.loadTokenList(chainId);
      setTokenList(tokens);
    } catch (err) {
      setError(err.message);
      setTokenList(tokenListService.getCurrentTokenList());
    } finally {
      setIsLoading(false);
    }
  }, [chainId]);

  const refreshTokenList = useCallback(async () => {
    tokenListService.clearCache();
    await loadTokenList();
  }, [loadTokenList]);

  useEffect(() => {
    loadTokenList();
  }, [loadTokenList]);

  return {
    tokenList,
    isLoading,
    error,
    refresh: refreshTokenList
  };
};
