import { useState, useEffect, useRef } from 'react';
import { XMarkIcon, MagnifyingGlassIcon } from '@heroicons/react/24/solid';

const TokenSelector = ({ isOpen, onClose, modifyToken, tokenList, isLoading, error }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const searchInputRef = useRef(null);

  const filteredTokens = (tokenList || []).filter(token => {
    const query = searchQuery.toLowerCase();
    return (
      token.name.toLowerCase().includes(query) ||
      token.symbol.toLowerCase().includes(query) ||
      token.address.toLowerCase().includes(query)
    );
  });

  useEffect(() => {
    if (isOpen && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) {
      setSearchQuery('');
    }
  }, [isOpen]);

  const handleTokenSelect = (token) => {
    modifyToken(token);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div onClick={onClose} className={`fixed inset-0 flex justify-center items-center ${isOpen ? "visible bg-black/20" : "invisible"} z-20`}>
        <div onClick={(e) => e.stopPropagation()} className={`flex flex-col bg-white/10 backdrop-blur-xl border border-white/25 rounded-xl shadow-xl ${isOpen ? "block" : "hidden"} max-h-[60vh] max-w-[400px] w-full m-4 overflow-hidden`}>
            <div className='flex justify-between items-center p-4 border-b border-white/25'>
                <span className='text-lg font-semibold leading-none'>Select a token</span>
                <button onClick={onClose} className='p-1 rounded-xl hover:bg-white/10 transition duration-300'>
                    <XMarkIcon className='w-6 h-6' />
                </button>
            </div>
            
            <div className='px-4 py-2 border-b border-white/25'>
                <div className='relative'>
                    <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
                        <MagnifyingGlassIcon className='h-5 w-5' />
                    </div>
                    <input
                        ref={searchInputRef}
                        type='text'
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className='block w-full pl-10 pr-3 py-2.5 bg-white/5 border border-white/25 rounded-xl text-sm placeholder-white/25 focus:outline-none focus:ring-1 focus:ring-white/25 focus:border-white/25'
                        placeholder='Search for token or paste address'
                    />
                </div>
            </div>

            <div className='flex-1 overflow-y-auto custom-scrollbar'>
                {isLoading ? (
                    <div className='flex flex-col items-center justify-center py-8 px-4 text-center'>
                        <div className='text-white/60 text-sm'>Loading tokens</div>
                    </div>
                ) : error ? (
                    <div className='flex flex-col items-center justify-center py-8 px-4 text-center'>
                        <div className='text-red-400 text-sm mb-2'>Error loading tokens</div>
                        <div className='text-white/60 text-xs'>{error}</div>
                    </div>
                ) : filteredTokens.length > 0 ? (
                    filteredTokens.map((token, i) => (
                        <div 
                            key={i} 
                            className='flex justify-start items-center px-4 py-3 hover:cursor-pointer hover:bg-white/5 transition-colors'
                            onClick={() => handleTokenSelect(i)}
                        >
                            <img src={token.logoURI} alt={token.symbol} className='w-6 h-6 rounded-full' />
                            <div className='ml-3'>
                                <div className='text-base font-semibold'>{token.symbol}</div>
                                <div className='text-sm font-light text-white/75'>{token.name}</div>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className='flex flex-col items-center justify-center py-8 px-4 text-center'>
                        <div className='text-white/75 text-sm'>No tokens found</div>
                    </div>
                )}
            </div>
        </div>
    </div>
  )
}

export default TokenSelector;
