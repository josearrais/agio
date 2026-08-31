import { AnkrProvider } from '@ankr.com/ankr.js';

const provider = new AnkrProvider(import.meta.env.VITE_RPC_KEY);

const NATIVE_TOKEN_ADDRESS = '0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee';

const getChainNetwork = (() => {
  let table;
  return (chainList, chainId, network) => {
    if (!table) {
      table = Object.fromEntries(chainList.map(({ chainId, network }) => [chainId, network]));
    }
    return network || table[chainId] || 'eth';
  };
})();

export const fetchTokenPrices = async (tokenOne, tokenTwo, chainList) => {
  try {
    const getPrice = ({ chainId, address, network }) => {
      const networkKey = getChainNetwork(chainList, chainId, network);
      const params = { blockchain: networkKey };
      if (address.toLowerCase() !== NATIVE_TOKEN_ADDRESS) {
        params.contractAddress = address;
      }
      return provider.getTokenPrice(params);
    };

    const [tokenOnePrice, tokenTwoPrice] = await Promise.all([
      getPrice(tokenOne),
      getPrice(tokenTwo),
    ]);

    const ratio = tokenTwoPrice.usdPrice > 0 ? tokenOnePrice.usdPrice / tokenTwoPrice.usdPrice : 0;

    return {
      tokenOne: tokenOnePrice.usdPrice,
      tokenTwo: tokenTwoPrice.usdPrice,
      ratio,
    };
  } catch (error) {
    console.error('Error fetching token prices:', error);
    throw error;
  }
};
