import { useState } from 'react';
import { ArrowPathIcon, Cog6ToothIcon } from '@heroicons/react/24/outline';
import SwapSettings from './SwapSettings';

const TradeBoxHeader = ({ refreshTokenTwoAmount, isLoading }) => {
  const [settings, setSettings] = useState({
    isOpen: false,
    slippage: 0.5,
  });

  const toggleSettings = () => {
    setSettings((prev) => ({ ...prev, isOpen: !prev.isOpen }));
  };

  return (
    <div className="flex flex-row w-full relative">
      <div className="mr-auto flex flex-row space-x-1 hover:scale-[1.05] transition duration-300 bg-violet-500 p-1 rounded-xl">
        <button
          className="transition duration-300 hover:transform hover:opacity-70"
          onClick={refreshTokenTwoAmount}
          aria-label="Refresh"
        >
          <ArrowPathIcon className={`w-6 h-6 ${isLoading ? 'animate-spin' : ''}`} />
        </button>
      </div>
      <div className="ml-auto flex flex-row space-x-1 hover:scale-[1.05] transition duration-300 bg-violet-500 p-1 rounded-xl">
        <button
          onClick={toggleSettings}
          className={`transition duration-300 hover:opacity-70 ${settings.isOpen ? 'rotate-30' : ''}`}
          aria-label="Settings"
          aria-expanded={settings.isOpen}
        >
          <Cog6ToothIcon className="w-6 h-6" />
        </button>
      </div>
      {settings.isOpen && (
        <SwapSettings
          isOpen={settings.isOpen}
          onClose={() => setSettings((prev) => ({ ...prev, isOpen: false }))}
          slippage={settings.slippage}
          setSlippage={(value) => setSettings((prev) => ({ ...prev, slippage: value }))}
        />
      )}
    </div>
  )
}

export default TradeBoxHeader;
