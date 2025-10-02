import { useState, useRef, useEffect } from 'react';
import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/24/solid';
import chainList from '@/config/chainList.json';
import EthereumLogo from '@/assets/svg/ethereum.svg';
import AvalancheLogo from '@/assets/svg/avalanche.svg';
import PolygonLogo from '@/assets/svg/polygon.svg';

const LOGO_MAP = {
  Ethereum: EthereumLogo,
  Avalanche: AvalancheLogo,
  Polygon: PolygonLogo,
};

const CHAINS = chainList.map((c) => ({
  id: String(c.chainId),
  chainId: c.chainId,
  name: c.name,
  label: c.label,
  token: c.token,
  rpcUrl: c.rpcUrl,
  enabled: Boolean(c.enabled),
  logo: LOGO_MAP[c.name],
}));

const ChainSelector = ({ onChange, initialChainId, persistKey = 'selectedChainId' }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedChain, setSelectedChain] = useState(() => {
    try {
      const stored = persistKey ? window.localStorage.getItem(persistKey) : null;
      const byPersist = stored ? CHAINS.find((c) => String(c.chainId) === String(stored)) : null;
      if (byPersist) return byPersist;
    } catch {}
    if (initialChainId) {
      const byProp = CHAINS.find((c) => String(c.chainId) === String(initialChainId));
      if (byProp) return byProp;
    }
    return CHAINS.find((c) => c.enabled) || CHAINS[0];
  });

  const dropdownRef = useRef(null);

  const handleSelectChain = (chain) => {
    if (!chain.enabled) return;
    setSelectedChain(chain);
    setIsOpen(false);
  };

  const toggleDropdown = () => setIsOpen((isOpen) => !isOpen);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    if (typeof onChange === 'function') {
      onChange(selectedChain);
    }
    try {
      if (persistKey) {
        window.localStorage.setItem(persistKey, String(selectedChain.chainId));
      }
    } catch {}
  }, [selectedChain, onChange, persistKey]);

  return (
    <div className='relative' ref={dropdownRef}>
      <button
        onClick={toggleDropdown}
        className='flex flex-row hover:cursor-pointer bg-violet-700 h-full m-0 rounded-xl p-2.5 list-none select-none hover:scale-[1.05] transition duration-300'
      >
        <div className='flex justify-between gap-2 items-center border-none w-full align-middle whitespace-nowrap'>
          <img 
            src={selectedChain.logo}
            alt={selectedChain.label}
            className='w-5 h-5 rounded-md'
          />
          {isOpen ? (
            <ChevronUpIcon className='inline-flex size-4' />
          ) : (
            <ChevronDownIcon className='inline-flex size-4' />
          )}
        </div>
      </button>

      {isOpen && (
        <div className='absolute right-0 w-48 mt-4 overflow-hidden bg-violet-800 rounded-xl shadow-xl z-10'>
          {CHAINS.map((chain) => (
            <button
              key={chain.id}
              onClick={() => handleSelectChain(chain)}
              disabled={!chain.enabled}
              className={`
                flex items-center w-full px-4 py-2.5 text-sm text-left transition-colors
                ${chain.enabled 
                  ? 'text-white hover:bg-violet-700/80 cursor-pointer' 
                  : 'text-violet-400 cursor-not-allowed opacity-60'
                }
              `}
            >
              <img 
                src={chain.logo} 
                alt={chain.label} 
                className="w-5 h-5 mr-3 rounded-md"
              />
              <span className='text-base'>{chain.name}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

export default ChainSelector;
