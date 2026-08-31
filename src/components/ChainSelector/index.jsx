import { useState, useRef, useEffect, useContext } from 'react';
import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/24/solid';
import { useSwitchChain, useChainId } from 'wagmi';
import { ChainContext } from '@/contexts/ChainContext';

const ChainSelector = () => {
  const { chains, selectedChain, setSelectedChain } = useContext(ChainContext);
  const { switchChain } = useSwitchChain();
  const wagmiChainId = useChainId();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const wagmiChain = chains.find(c => c.chainId === wagmiChainId);
    if (wagmiChain && wagmiChain.chainId !== selectedChain?.chainId) {
      setSelectedChain(wagmiChain);
    }
  }, [wagmiChainId, selectedChain, chains]);

  const handleSelectChain = (chain) => {
    if (!chain.enabled) return;
    switchChain({ chainId: chain.chainId });
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

  return (
    <div className='relative' ref={dropdownRef}>
      <button
        onClick={toggleDropdown}
        className='flex flex-row hover:cursor-pointer bg-white/10 backdrop-blur-sm border border-white/10 h-10 m-0 rounded-xl p-2.5 list-none select-none hover:bg-white/20 hover:border-white/20 hover:scale-[1.02] transition-all duration-300'
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
        <>
          <div
            className='fixed inset-0 z-10'
            onClick={() => setIsOpen(false)}
          />
          
          <div className='absolute left-0 lg:right-0 lg:left-auto w-48 mt-4 overflow-hidden bg-white/10 backdrop-blur-xl border border-white/10 rounded-xl shadow-xl z-50'>
            {chains.map((chain) => (
              <button
                key={chain.id}
                onClick={() => handleSelectChain(chain)}
                disabled={!chain.enabled}
                className={`
                  flex items-center w-full px-4 py-2.5 text-sm text-left transition-colors
                  ${chain.enabled 
                    ? 'text-white hover:bg-white/10 cursor-pointer' 
                    : 'cursor-not-allowed opacity-60'
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
        </>
      )}
    </div>
  )
}

export default ChainSelector;
