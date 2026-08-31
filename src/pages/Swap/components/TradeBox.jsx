import { useEffect, useState, useContext } from 'react';
import { ArrowDownIcon, ChevronDownIcon } from '@heroicons/react/24/outline';
import TokenSelector from '@/components/TokenSelector';
import { useTokenPrices } from '@/hooks/useTokenPrices';
import { useTokenList } from '@/hooks/useTokenList';
import { ChainContext } from '@/contexts/ChainContext';

const TradeBox = ({ onRefresh, setIsLoading }) => {
  const { selectedChain } = useContext(ChainContext);
  const { tokenList, isLoading: tokenListLoading, error: tokenListError } = useTokenList(selectedChain?.chainId);
  const [tokenOne, setTokenOne] = useState(null);
  const [tokenTwo, setTokenTwo] = useState(null);
  const [tokenOneAmount, setTokenOneAmount] = useState('');
  const [tokenTwoAmount, setTokenTwoAmount] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [changeToken, setChangeToken] = useState(1);
  
  const { prices, isLoading, error, refresh } = useTokenPrices(tokenOne, tokenTwo);

  useEffect(() => {
    if (tokenList && tokenList.length >= 2 && !tokenOne && !tokenTwo) {
      setTokenOne(tokenList[0]);
      setTokenTwo(tokenList[1]);
    }
  }, [tokenList, tokenOne, tokenTwo]);

  useEffect(() => {
    if (onRefresh) {
      onRefresh(() => refresh);
    }
    if (setIsLoading) {
        setIsLoading(isLoading);
    }
  }, [refresh, onRefresh, isLoading, setIsLoading]);

  function changeAmount(e) {
    const amount = e.target.value;
    setTokenOneAmount(amount);
    if (amount && prices) {
      setTokenTwoAmount((amount * prices.ratio).toFixed(8));
    } else {
      setTokenTwoAmount('');
    }
  }

  function switchTokens() {
    setTokenOneAmount('');
    setTokenTwoAmount('');
    const tempToken = tokenOne;
    setTokenOne(tokenTwo);
    setTokenTwo(tempToken);
  }

  function openModal(asset) {
    setChangeToken(asset);
    setIsOpen(true);
  }

  function modifyToken(i) {
    setTokenOneAmount('');
    setTokenTwoAmount('');
    if (changeToken === 1) {
      setTokenOne(tokenList[i]);
    } else {
      setTokenTwo(tokenList[i]);
    }
    setIsOpen(false);
  }
  
  useEffect(() => {
    if (tokenOneAmount && prices) {
      setTokenTwoAmount((tokenOneAmount * prices.ratio).toFixed(8));
    } else {
      setTokenTwoAmount('');
    }
  }, [prices, tokenOneAmount]);

  return (
    <div className="flex flex-col w-full mt-2 justify-center relative">
      {error && <div className="bg-white/10 backdrop-blur-sm border-2 border-white/5 p-2 rounded-xl mb-2">{error}</div>}
      {!tokenOne || !tokenTwo ? (
        <div className="bg-white/10 backdrop-blur-sm border-2 border-white/5 h-auto rounded-xl p-4 text-center">
          <p className="text-white">
            {tokenListLoading ? 'Loading' : tokenListError ? 'Error loading tokens' : tokenList && tokenList.length < 2 ? 'Not enough tokens available' : 'Loading'}
          </p>
        </div>
      ) : (
      <>
      <div className="bg-white/10 backdrop-blur-sm border-2 border-white/5 text-white h-auto sm:h-24 rounded-xl p-4">
        <h4 className="font-semibold flex justify-between mb-2 sm:mb-0">
          You're paying
        </h4>
        <div className="flex gap-4 justify-between">
          <input
            type="number"
            placeholder="0"
            className="text-white text-2xl sm:text-3xl focus:outline-none text-ellipsis w-full sm:w-auto [-moz-appearance:_textfield] [&::-webkit-outer-spin-button]:m-0 [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:m-0 [&::-webkit-inner-spin-button]:appearance-none"
            value={tokenOneAmount}
            onChange={changeAmount}
            disabled={isLoading || !prices}
          />
          <button
            className="min-w-20 h-10 bg-white/5 rounded-xl py-2 px-3 flex space-x-3 items-center justify-center hover:scale-[1.02] transition duration-300"
            onClick={() => openModal(1)}
          >
            <img
              src={tokenOne.logoURI}
              alt="assetOneLogo"
              className="w-6 h-6"
            />
            <span className="font-bold text-base">{tokenOne.symbol}</span>
            <ChevronDownIcon className="w-4 h-4" />
          </button>
        </div>
      </div>
      <div className="rounded-xl h-10 w-10 relative -my-[18px] mx-auto bg-white/5 backdrop-blur-sm border-4 border-white/5 z-10 hover:scale-[1.05] transition duration-300">
        <button
          className="inline-flex items-center justify-center w-full h-full opacity-70 transition duration-300 hover:transform hover:opacity-100"
          onClick={switchTokens}
          disabled={isLoading}
        >
          <ArrowDownIcon className="w-4 h-4" />
        </button>
      </div>
      <TokenSelector
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        modifyToken={modifyToken}
        tokenList={tokenList}
        isLoading={tokenListLoading}
        error={tokenListError}
      />
      <div className="grid auto-rows-auto gap-y-1">
        <div className="bg-white/10 backdrop-blur-sm border-2 border-white/5 text-white h-auto sm:h-24 rounded-xl p-4">
          <h4 className="font-semibold flex justify-between mb-2 sm:mb-0">
            To receive
          </h4>
          <div className="flex gap-4 justify-between">
            <input
              type="number"
              placeholder="0"
              className="text-white text-2xl sm:text-3xl focus:outline-none text-ellipsis w-full sm:w-auto [-moz-appearance:_textfield] [&::-webkit-outer-spin-button]:m-0 [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:m-0 [&::-webkit-inner-spin-button]:appearance-none"
              value={tokenTwoAmount}
              disabled={true}
            />
            <button
              className="min-w-20 h-10 bg-white/5 rounded-xl py-2 px-3 flex space-x-3 items-center justify-center hover:scale-[1.02] transition duration-300"
              onClick={() => openModal(2)}
            >
              <img
                src={tokenTwo.logoURI}
                alt="assetTwoLogo"
                className="w-6 h-6"
              />
              <span className="font-bold text-base">{tokenTwo.symbol}</span>
              <ChevronDownIcon className="w-4 h-4" />
            </button>
          </div>
        </div>
        <div className="bg-white/10 backdrop-blur-sm border-2 border-white/5 text-white/40 rounded-xl h-12 cursor-pointer hover:text-white hover:scale-[1.01] transition duration-300">
          <button
            className="text-lg font-semibold inline-flex items-center justify-center p-4 w-full h-full disabled:hover:cursor-not-allowed"
            disabled={!tokenOneAmount || isLoading}
          >
            Swap
          </button>
        </div>
      </div>
      </>
      )}
    </div>
  )
}

export default TradeBox;
