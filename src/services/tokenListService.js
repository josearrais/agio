import defaultTokenList from '../config/tokenList.json';
import tokenListSources from '../config/tokenListSources.json';

class TokenListService {
  constructor() {
    this.cache = new Map();
    this.cacheTimeout = 5 * 60 * 1000;
    this.retryAttempts = 3;
    this.retryDelay = 1000;
    this.currentTokenList = null;
    this.currentChainId = null;
    this.isLoading = false;
    this.error = null;
  }

  isCacheValid(cacheKey) {
    const cached = this.cache.get(cacheKey);
    if (!cached) return false;
    return Date.now() - cached.timestamp < this.cacheTimeout;
  }

  async fetchWithRetry(url, attempts = this.retryAttempts) {
    for (let i = 0; i < attempts; i++) {
      try {
        const response = await fetch(`https://wispy-bird-88a7.uniswap.workers.dev/?url=${encodeURIComponent(url)}`);
        
        if (!response.ok) {
          throw new Error(`HTTP ${response.status}: ${response.statusText}`);
        }
        
        const data = await response.json();
        
        if (!data || typeof data !== 'object') {
          throw new Error('Invalid token list format');
        }
        
        const tokens = Array.isArray(data) ? data : (data.tokens || []);
        
        if (!Array.isArray(tokens)) {
          throw new Error('Token list must contain tokens array');
        }
        
        return tokens;
      } catch (error) {
        console.warn(`Attempt ${i + 1}/${attempts} failed for ${url}:`, error.message);
        
        if (i === attempts - 1) {
          throw error;
        }
        
        await new Promise(resolve => setTimeout(resolve, this.retryDelay * Math.pow(2, i)));
      }
    }
  }

  async fetchTokenList(source) {
    const cacheKey = source.url;
    
    if (this.isCacheValid(cacheKey)) {
      return this.cache.get(cacheKey).data;
    }

    if (source.url === 'default') {
      const cachedData = {
        data: defaultTokenList,
        timestamp: Date.now()
      };
      this.cache.set(cacheKey, cachedData);
      return defaultTokenList;
    }

    try {
      const tokens = await this.fetchWithRetry(source.url);
      
      const cachedData = {
        data: tokens,
        timestamp: Date.now()
      };
      this.cache.set(cacheKey, cachedData);
      
      return tokens;
    } catch (error) {
      console.error(`Failed to fetch token list from ${source.name}:`, error);
      throw error;
    }
  }

  async loadTokenList(chainId = null) {
    if (this.currentChainId !== chainId) {
      this.cache.clear();
      this.currentChainId = chainId;
    }
    
    if (this.isLoading) {
      return this.currentTokenList;
    }

    this.isLoading = true;
    this.error = null;

    try {
      const enabledSources = tokenListSources
        .filter(source => source.enabled)
        .sort((a, b) => a.priority - b.priority);

      for (const source of enabledSources) {
        try {
          const tokenList = await this.fetchTokenList(source);
          
          let validTokens = tokenList.filter(token => 
            token && 
            token.address && 
            token.symbol && 
            token.decimals !== undefined &&
            token.chainId !== undefined
          );

          if (chainId !== null) {
            validTokens = validTokens.filter(token => token.chainId === chainId);
          }

          if (validTokens.length > 0) {
            this.currentTokenList = validTokens;
            return validTokens;
          }
        } catch (error) {
          console.warn(`Failed to load from ${source.name}`);
          continue;
        }
      }

      throw new Error('All token list sources failed');
    } catch (error) {
      this.error = error.message;
      console.error('Token list loading failed:', error);
      
      let fallbackList = defaultTokenList;
      if (chainId !== null) {
        fallbackList = defaultTokenList.filter(token => token.chainId === chainId);
      }
      this.currentTokenList = fallbackList;
      return fallbackList;
    } finally {
      this.isLoading = false;
    }
  }

  getCurrentTokenList() {
    return this.currentTokenList || defaultTokenList;
  }

  clearCache() {
    this.cache.clear();
  }

  getError() {
    return this.error;
  }

  getLoadingStatus() {
    return this.isLoading;
  }
}

export const tokenListService = new TokenListService();
export default tokenListService;
