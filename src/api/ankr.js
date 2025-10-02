import { AnkrProvider } from '@ankr.com/ankr.js';

const provider = new AnkrProvider(import.meta.env.VITE_RPC_KEY);

const getChainNetwork = (chainList, chainId, network) => {
  const TABLE = Object.fromEntries(chainList.map(({ chainId, network }) => [chainId, network]));
  return network || TABLE[chainId] || 'eth';
};

export const fetchTokenPrices = async (tokenOne, tokenTwo, chainList) => {
  try {
    const getPrice = ({ chainId, address, network }) => {
      const networkKey = getChainNetwork(chainList, chainId, network);
      const params = { blockchain: networkKey };
      if (address.toLowerCase() !== '0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee') {
        params.contractAddress = address;
      }
      return provider.getTokenPrice(params);
    };

    const [tokenOnePrice, tokenTwoPrice] = await Promise.all([
      getPrice(tokenOne),
      getPrice(tokenTwo),
    ]);

    return {
      tokenOne: tokenOnePrice.usdPrice,
      tokenTwo: tokenTwoPrice.usdPrice,
      ratio: tokenOnePrice.usdPrice / tokenTwoPrice.usdPrice,
    };
  } catch (error) {
    console.error('Error fetching token prices:', error);
    throw error;
  }
};
