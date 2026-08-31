import { useState } from 'react';
import { QuestionMarkCircleIcon } from '@heroicons/react/24/outline';

const SlippageTolerance = ({ slippage, setSlippage }) => {
  const [activePreset, setActivePreset] = useState(slippage.toString());
  const [showTooltip, setShowTooltip] = useState(false);

  const handleSlippageChange = (e) => {
    const value = e.target.value;
    if (value === '' || /^\d*\.?\d*$/.test(value)) {
      if (value !== '') {
        setActivePreset('');
        setSlippage(parseFloat(value));
      }
    }
  };

  const handlePresetClick = (value) => {
    setActivePreset(value);
    setSlippage(parseFloat(value));
  };

  return (
    <div className="relative">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center space-x-1">
          <span className="text-sm text-gray-300">Slippage tolerance</span>
          <div className="relative">
            <QuestionMarkCircleIcon 
              className="w-4 h-4 text-gray-400 cursor-help"
              onMouseEnter={() => setShowTooltip(true)}
              onMouseLeave={() => setShowTooltip(false)}
            />
            {showTooltip && (
              <div className="absolute left-0 w-24 sm:w-48 lg:w-96 p-2 mt-1 text-xs text-white bg-black rounded-xl shadow-lg z-50">
                Your transaction will revert if the price changes unfavorably by more than this percentage.
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="flex space-x-2">
        {['0.5', '1'].map((value) => (
          <button
            key={value}
            onClick={() => handlePresetClick(value)}
            className={`px-3 py-1 text-sm rounded-xl transition-colors ${
              activePreset === value
                ? 'bg-white/25 text-white'
                : 'bg-white/20 hover:bg-white/25 text-gray-300'
            }`}
          >
            {value}%
          </button>
        ))}

        <div className="flex items-center">
          <input
            type="text"
            value={slippage.toString()}
            onChange={handleSlippageChange}
            className="w-16 bg-white/10 border border-white/25 rounded-xl px-2 py-1 text-right text-white text-sm focus:outline-none focus:ring-1 focus:ring-gray-300"
            placeholder="0.5"
          />
          <span className="ml-1 text-sm">%</span>
        </div>
      </div>
    </div>
  )
}

export default SlippageTolerance;
