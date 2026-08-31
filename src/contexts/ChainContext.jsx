import { createContext, useState, useMemo, useEffect } from 'react';
import { useChainId } from 'wagmi';
import chainList from '@/config/chainList.json';
import OptimismLogo from '@/assets/svg/optimism.svg';
import EthereumLogo from '@/assets/svg/ethereum.svg';
import PolygonLogo from '@/assets/svg/polygon.svg';
import AvalancheLogo from '@/assets/svg/avalanche.svg';

const LOGO_MAP = {
  Optimism: OptimismLogo,
  Ethereum: EthereumLogo,
  Polygon: PolygonLogo,
  Avalanche: AvalancheLogo,
};

const CHAINS = chainList.map((c) => ({
  ...c,
  id: String(c.chainId),
  logo: LOGO_MAP[c.name],
}));

const ChainContext = createContext();

const ChainProvider = ({ children, initialChainId, persistKey = 'selectedChainId' }) => {
  const wagmiChainId = useChainId();
  
  const [selectedChain, setSelectedChain] = useState(() => {
    if (typeof window === 'undefined') {
      const byProp = initialChainId ? CHAINS.find((c) => String(c.chainId) === String(initialChainId)) : null;
      return byProp || CHAINS.find((c) => c.enabled) || CHAINS[0];
    }

    try {
      const stored = persistKey ? window.localStorage.getItem(persistKey) : null;
      const byPersist = stored ? CHAINS.find((c) => String(c.chainId) === String(stored)) : null;
      if (byPersist) return byPersist;
    } catch (error) {
      console.error(error);
    }

    if (initialChainId) {
      const byProp = CHAINS.find((c) => String(c.chainId) === String(initialChainId));
      if (byProp) return byProp;
    }

    return CHAINS.find((c) => c.enabled) || CHAINS[0];
  });

  useEffect(() => {
    const wagmiChain = CHAINS.find((c) => c.chainId === wagmiChainId);
    if (wagmiChain && wagmiChain.chainId !== selectedChain?.chainId) {
      setSelectedChain(wagmiChain);
    }
  }, [wagmiChainId, selectedChain]);

  useEffect(() => {
    if (typeof window !== 'undefined' && persistKey && selectedChain) {
      try {
        window.localStorage.setItem(persistKey, String(selectedChain.chainId));
      } catch (error) {
        console.error(error);
      }
    }
  }, [selectedChain, persistKey]);

  const contextValue = useMemo(() => ({
    chains: CHAINS,
    selectedChain,
    setSelectedChain,
  }), [selectedChain]);

  return (
    <ChainContext.Provider value={contextValue}>
      {children}
    </ChainContext.Provider>
  );
};

export { ChainContext, ChainProvider };
