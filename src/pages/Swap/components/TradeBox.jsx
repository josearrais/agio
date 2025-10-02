import { useEffect, useState } from 'react';
import { ArrowDownIcon, ChevronDownIcon } from '@heroicons/react/24/outline';
import tokenList from '@/config/tokenList.json';
import TokenSelector from '@/components/TokenSelector';
import { useTokenPrices } from '@/hooks/useTokenPrices';

const TradeBox = ({ onRefresh, setIsLoading }) => {
  const [tokenOne, setTokenOne] = useState(tokenList[0]);
  const [tokenTwo, setTokenTwo] = useState(tokenList[1]);
  const [tokenOneAmount, setTokenOneAmount] = useState('');
  const [tokenTwoAmount, setTokenTwoAmount] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [changeToken, setChangeToken] = useState(1);
  
  const { prices, isLoading, error, refresh } = useTokenPrices(tokenOne, tokenTwo);

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
      {error && <div className="bg-violet-700 p-2 rounded-xl mb-2">{error}</div>}
      <div className="bg-violet-500 text-white border-0 h-auto sm:h-24 rounded-xl p-4">
        <h4 className="font-semibold flex justify-between mb-2 sm:mb-0">
          You're paying
        </h4>
        <div className="flex gap-4 justify-between">
          <input
            type="number"
            placeholder="0"
            className="bg-violet-500 text-white text-2xl sm:text-3xl focus:outline-none text-ellipsis w-full sm:w-auto [-moz-appearance:_textfield] [&::-webkit-outer-spin-button]:m-0 [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:m-0 [&::-webkit-inner-spin-button]:appearance-none"
            value={tokenOneAmount}
            onChange={changeAmount}
            disabled={isLoading || !prices}
          />
          <button
            className="min-w-20 h-10 bg-violet-600 rounded-xl py-2 px-3 flex space-x-3 items-center justify-center hover:scale-[1.05] transition duration-300"
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
      <div className="rounded-xl h-10 w-10 relative -my-[18px] mx-auto bg-violet-500 border-4 border-violet-600 z-10 hover:scale-[1.05] transition duration-300">
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
      />
      <div className="grid auto-rows-auto gap-y-1">
        <div className="bg-violet-500 text-white border-0 h-auto sm:h-24 rounded-xl p-4">
          <h4 className="font-semibold flex justify-between mb-2 sm:mb-0">
            To receive
          </h4>
          <div className="flex gap-4 justify-between">
            <input
              type="number"
              placeholder="0"
              className="bg-violet-500 text-white text-2xl sm:text-3xl focus:outline-none text-ellipsis w-full sm:w-auto [-moz-appearance:_textfield] [&::-webkit-outer-spin-button]:m-0 [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:m-0 [&::-webkit-inner-spin-button]:appearance-none"
              value={tokenTwoAmount}
              disabled={true}
            />
            <button
              className="min-w-20 h-10 bg-violet-600 rounded-xl py-2 px-3 flex space-x-3 items-center justify-center hover:scale-[1.05] transition duration-300"
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
        <div className="bg-white text-violet-600 rounded-xl h-12 cursor-pointer hover:bg-violet-100 hover:scale-[1.02] transition duration-300">
          <button
            className="text-lg font-semibold inline-flex items-center justify-center p-4 w-full h-full disabled:hover:cursor-not-allowed"
            disabled={!tokenOneAmount || isLoading}
          >
            Swap
          </button>
        </div>
      </div>
    </div>
  )
}

export default TradeBox;
