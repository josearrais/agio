import { createConfig, http } from 'wagmi';
import { optimism, mainnet, polygon, avalanche } from 'wagmi/chains';
import { injected } from 'wagmi/connectors';
import chainList from './chainList.json';

const customChains = chainList.map(chain => ({
  id: chain.chainId,
  name: chain.name,
  nativeCurrency: {
    name: 'ETH',
    symbol: 'ETH',
    decimals: 18,
  },
  rpcUrls: {
    default: { http: [chain.rpcUrl] },
    public: { http: [chain.rpcUrl] },
  },
  blockExplorers: {
    default: { name: 'Explorer', url: chain.blockExplorerUrl },
  },
}));

export const config = createConfig({
  chains: [optimism, mainnet, polygon, avalanche, ...customChains],
  connectors: [
    injected(),
  ],
  transports: {
    [optimism.id]: http(),
    [mainnet.id]: http(),
    [polygon.id]: http(),
    [avalanche.id]: http(),
    ...customChains.reduce((acc, chain) => ({
      ...acc,
      [chain.id]: http(),
    }), {}),
  },
});

export default config;
