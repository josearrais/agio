import { useContext } from 'react';
import { useBlockNumber } from '@/hooks/useBlockNumber';
import { ChainContext } from '@/contexts/ChainContext';

const BlockNumber = () => {
  const { blockNumber, isNewBlock, isLoading, error } = useBlockNumber();
  const { selectedChain } = useContext(ChainContext);

  const explorerBlockBadgeClass = "flex items-center gap-2 text-sm font-medium text-gray-500 no-underline transition-colors duration-200 ease-in-out px-2 py-1 rounded-xl bg-white/5 backdrop-blur-sm hover:text-gray-400 hover:bg-white/10";

  if (isLoading && !blockNumber) {
    return (
      <div className={explorerBlockBadgeClass}>
        <div className="block-indicator loading"></div>
        <span>Syncing</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className={explorerBlockBadgeClass}>
        <div className="block-indicator error"></div>
        <span>{error}</span>
      </div>
    );
  }

  return (
    <a 
      href={`${selectedChain?.blockExplorerUrl}/block/${blockNumber}`}
      target="_blank" 
      rel="noopener noreferrer"
      className={explorerBlockBadgeClass}
    >
      <div className={`block-indicator ${isNewBlock ? 'pulse' : ''} ${isLoading ? 'loading' : ''}`}></div>
      <span>{blockNumber}</span>
    </a>
  )
}

export default BlockNumber;
