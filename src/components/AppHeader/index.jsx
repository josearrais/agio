import { useState } from 'react';
import { useAccount, useConnect, useDisconnect } from 'wagmi';
import { injected } from 'wagmi/connectors';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import { NavItems } from './NavItems';
import ChainSelector from '../ChainSelector';
import WalletInfo from '../WalletInfo';

const AppHeader = () => {
  const { isConnected } = useAccount();
  const { connect, isPending, error } = useConnect();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleConnect = () => connect({ connector: injected() });
  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);
  const closeMobileMenu = () => setIsMobileMenuOpen(false);

  return (
    <div className='absolute px-4 sm:px-8 py-2 top-0 left-0 right-0 border-b border-white/20 z-50'>
      <div className='flex items-center justify-between grow relative'>

        <div className='relative lg:hidden'>
          <button
            onClick={toggleMobileMenu}
            className='p-2 text-white cursor-pointer bg-white/10 backdrop-blur-sm border border-white/10 rounded-xl hover:bg-white/20 hover:border-white/20 hover:scale-[1.02] transition-all duration-300 relative z-50'
          >
            {isMobileMenuOpen ? <XMarkIcon className='w-6 h-6' /> : <Bars3Icon className='w-6 h-6' />}
          </button>

          {isMobileMenuOpen && (
            <>
              <div className='fixed inset-0 z-40 bg-black/50' onClick={closeMobileMenu} />

              <div className='absolute top-full left-0 mt-4 w-48 bg-white/10 backdrop-blur-xl border border-white/10 rounded-xl shadow-xl p-4 z-50'>
                <NavItems onItemClick={closeMobileMenu} />
              </div>
            </>
          )}
        </div>

        <div className='hidden lg:block'>
          <NavItems />
        </div>

        <div className='inline-flex items-center gap-2'>
          <ChainSelector />
          {isConnected ? (
            <WalletInfo />
          ) : (
            <div className='relative'>
              <button
                onClick={handleConnect}
                disabled={isPending}
                className='w-28 sm:w-36 h-10 bg-white/10 backdrop-blur-sm border border-white/10 text-white flex items-center justify-center rounded-xl text-sm sm:text-base font-semibold cursor-pointer no-underline hover:bg-white/10 hover:border-white/20 hover:scale-[1.02] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed'
              >
                {isPending ? (
                  <div className='flex items-center gap-2'>
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    <span>Connecting</span>
                  </div>
                ) : 'Connect Wallet'}
              </button>

              {error && (
                <div className="absolute top-full right-0 mt-2 w-64 sm:w-80 p-3 bg-red-500/90 backdrop-blur-sm border border-red-400 rounded-lg z-50">
                  <p className="text-white text-sm">
                    {error.message || 'Connection failed. Please try again.'}
                  </p>
                </div>
              )}
            </div>
          )}
        </div>

      </div>
    </div>
  )
}

export default AppHeader;
