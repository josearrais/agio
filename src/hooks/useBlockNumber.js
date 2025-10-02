import { useState, useEffect } from 'react';
import { ethers } from 'ethers';

const provider = new ethers.JsonRpcProvider(import.meta.env.VITE_RPC_URL);

export const useBlockNumber = () => {
  const [blockNumber, setBlockNumber] = useState(null);
  const [isNewBlock, setIsNewBlock] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getBlockNumber = async () => {
      if (!isLoading) setIsLoading(true);
      try {
        const newBlockNumber = await provider.getBlockNumber();
        if (blockNumber !== null && newBlockNumber > blockNumber) {
          setIsNewBlock(true);
          setTimeout(() => setIsNewBlock(false), 2000);
        }
        setBlockNumber(newBlockNumber);
        setError(null);
      } catch (e) {
        console.error('Failed to fetch block number:', e);
        setError('Error fetching block number');
      } finally {
        setIsLoading(false);
      }
    };

    getBlockNumber();

    const interval = setInterval(getBlockNumber, 15000);
    return () => clearInterval(interval);
  }, []);

  return { blockNumber, isNewBlock, isLoading, error };
};
