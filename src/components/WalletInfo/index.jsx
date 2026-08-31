import { useState } from 'react';
import { useAccount, useDisconnect, useBalance, useEnsName, useChainId } from 'wagmi';
import { formatUnits } from 'viem';
import { ChevronDownIcon, ChevronUpIcon, DocumentDuplicateIcon, ArrowRightStartOnRectangleIcon } from '@heroicons/react/24/outline';

const WalletInfo = () => {
  const { address, isConnected } = useAccount();
  const { disconnect } = useDisconnect();
  const chainId = useChainId();
  const { data: balance, isLoading: balanceLoading, error: balanceError } = useBalance({
    address,
    query: {
      refetchOnWindowFocus: true,
      refetchOnMount: true,
      refetchInterval: 10000,
    },
  });
  const { data: ensName } = useEnsName({ address });
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  if (!isConnected || !address) return null;

  const formatAddress = (addr) => {
    return `${addr.slice(0, 6)}...${addr.slice(-4)}`;
  };

  const formatBalance = (bal) => {
    if (!bal) return '0.00';

    if (bal.value !== undefined && bal.decimals !== undefined) {
      const formatted = formatUnits(bal.value, bal.decimals);
      const num = parseFloat(formatted);
      return Number.isFinite(num) ? num.toFixed(4) : '0.00';
    }

    if (bal.formatted) {
      const num = parseFloat(bal.formatted);
      return Number.isFinite(num) ? num.toFixed(4) : '0.00';
    }

    return '0.00';
  };

  const copyAddress = async () => {
    try {
      await navigator.clipboard.writeText(address);
    } catch (err) {
      console.error('Failed to copy address:', err);
    }
  };

  const handleDisconnect = () => {
    disconnect();
    setIsDropdownOpen(false);
  };

  let balanceText = '0.00 ETH';
  let balanceTextClass = 'text-white';

  if (balanceLoading) {
    balanceText = 'Loading';
    balanceTextClass = 'text-white/60';
  } else if (balanceError) {
    balanceText = 'Failed to load';
    balanceTextClass = 'text-red-400';
  } else if (balance) {
    balanceText = `${formatBalance(balance)} ${balance.symbol}`;
  }

  const balanceHeader = balanceLoading
    ? 'Loading'
    : balanceError
    ? 'Error'
    : balance
    ? `${formatBalance(balance)} ${balance.symbol}`
    : '0.00 ETH';

  const balanceHeaderClass = balanceLoading
    ? 'text-white/60'
    : balanceError
    ? 'text-red-400'
    : 'text-white/80';

  return (
    <div className="relative">
      <button
        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
        className="flex flex-row hover:cursor-pointer bg-white/10 backdrop-blur-sm border border-white/10 h-10 m-0 rounded-xl p-2.5 list-none select-none hover:bg-white/20 hover:border-white/20 hover:scale-[1.02] transition-all duration-300"
      >
        <div className="flex justify-between gap-2 items-center border-none w-full align-middle whitespace-nowrap">
          <span className="text-white">
            {ensName || formatAddress(address)}
          </span>

          <span className={`text-sm ${balanceHeaderClass}`}>
            {balanceHeader}
          </span>

          {isDropdownOpen ? (
            <ChevronUpIcon className="inline-flex size-4" />
          ) : (
            <ChevronDownIcon className="inline-flex size-4" />
          )}
        </div>
      </button>

      {isDropdownOpen && (
        <>
          <div
            className="fixed inset-0 z-10"
            onClick={() => setIsDropdownOpen(false)}
          />

          <div className="absolute left-0 lg:right-0 lg:left-auto w-64 mt-4 overflow-hidden bg-white/10 backdrop-blur-xl border border-white/10 rounded-xl shadow-xl z-50">
            <div className="p-4 border-b border-white/10">
              <div className="flex items-center gap-3">
                <div className="flex-1">
                  <div className="font-semibold text-white">
                    {ensName || 'Wallet'}
                  </div>
                  <div className="text-sm text-white/60">
                    {formatAddress(address)}
                  </div>
                </div>
              </div>

              <div className="mt-3 p-3 bg-white/5 rounded-lg border border-white/5">
                <div className="text-sm text-white/60">Balance</div>
                <div className={`text-lg font-semibold ${balanceTextClass}`}>
                  {balanceText}
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-2 p-2">
              <button
                onClick={copyAddress}
                className="w-full flex items-center gap-3 px-3 py-2 hover:bg-white/20 rounded-lg transition-all duration-300"
              >
                <DocumentDuplicateIcon className="w-4 h-4" />
                <span>Copy address</span>
              </button>

              <button
                onClick={handleDisconnect}
                className="w-full flex items-center gap-3 px-3 py-2 hover:bg-red-600/80 rounded-lg transition-all duration-300"
              >
                <ArrowRightStartOnRectangleIcon className="w-4 h-4" />
                <span>Disconnect wallet</span>
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  )
}

export default WalletInfo;
