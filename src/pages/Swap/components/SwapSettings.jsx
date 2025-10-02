import { useEffect, useRef } from 'react';
import { XMarkIcon } from '@heroicons/react/24/solid';
import { SlippageTolerance } from '@/components';

const SwapSettings = ({ isOpen, onClose, slippage, setSlippage }) => {
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      ref={dropdownRef}
      className="absolute right-0 top-10 w-72 max-w-[calc(100vw-3rem)] p-4 bg-violet-700 border border-violet-800 rounded-xl shadow-xl z-20"
    >
      <div className="flex justify-between items-center">
        <span className="text-lg font-semibold leading-none">Settings</span>
        <button onClick={onClose} className="p-2 rounded-xl hover:bg-violet-800">
          <XMarkIcon className="w-6 h-6" />
        </button>
      </div>

      <div className="mb-4">
        <SlippageTolerance slippage={slippage} setSlippage={setSlippage} />
      </div>
    </div>
  )
}

export default SwapSettings;
