import { useBlockNumber } from '@/hooks/useBlockNumber';

const BlockNumber = () => {
  const { blockNumber, isNewBlock, isLoading, error } = useBlockNumber();

  if (isLoading && !blockNumber) {
    return (
      <div className="flex items-center gap-2 text-sm font-medium text-gray-500 no-underline transition-colors duration-200 ease-in-out px-2 py-1 rounded-xl bg-white/5 hover:text-gray-400 hover:bg-white/10">
        <div className="block-indicator loading"></div>
        <span>Syncing</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center gap-2 text-sm font-medium text-gray-500 no-underline transition-colors duration-200 ease-in-out px-2 py-1 rounded-xl bg-white/5 hover:text-gray-400 hover:bg-white/10">
        <div className="block-indicator error"></div>
        <span>{error}</span>
      </div>
    );
  }

  return (
    <a 
      href={`https://etherscan.io/block/${blockNumber}`} 
      target="_blank" 
      rel="noopener noreferrer"
      className="flex items-center gap-2 text-sm font-medium text-gray-500 no-underline transition-colors duration-200 ease-in-out px-2 py-1 rounded-xl bg-white/5 hover:text-gray-400 hover:bg-white/10"
    >
      <div className={`block-indicator ${isNewBlock ? 'pulse' : ''} ${isLoading ? 'loading' : ''}`}></div>
      <span>{blockNumber}</span>
    </a>
  )
}

export default BlockNumber;
