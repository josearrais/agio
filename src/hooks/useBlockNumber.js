import { useState, useEffect, useContext } from 'react';
import { ethers } from 'ethers';
import { ChainContext } from '@/contexts/ChainContext';

export const useBlockNumber = () => {
  const { selectedChain } = useContext(ChainContext);
  const [blockNumber, setBlockNumber] = useState(null);
  const [isNewBlock, setIsNewBlock] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!selectedChain) return;

    const provider = new ethers.JsonRpcProvider(selectedChain.rpcUrl);

    const getBlockNumber = async () => {
      try {
        const newBlockNumber = await provider.getBlockNumber();
        setBlockNumber(currentBlockNumber => {
          if (currentBlockNumber !== null && newBlockNumber > currentBlockNumber) {
            setIsNewBlock(true);
            setTimeout(() => setIsNewBlock(false), 2000);
          }
          return newBlockNumber;
        });
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
  }, [selectedChain]);

  return { blockNumber, isNewBlock, isLoading, error };
};
