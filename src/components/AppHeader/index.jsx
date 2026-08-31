import { useAccount, useConnect, useDisconnect } from 'wagmi';
import { injected } from 'wagmi/connectors';
import { NavItems } from './NavItems';
import ChainSelector from '../ChainSelector';
import WalletInfo from '../WalletInfo';

const AppHeader = () => {
  const { isConnected } = useAccount();
  const { connect, isPending, error } = useConnect();
  const { disconnect } = useDisconnect();

  const handleConnect = () => {
    connect({ connector: injected() });
  };

  return (
    <div className='absolute px-8 py-2 top-0 left-0 right-0 border-b border-white/20'>
      <div className='flex items-center justify-between grow'>
        <NavItems />
        <div className='inline-flex items-center gap-2'>
          <ChainSelector />
          {isConnected ? (
            <WalletInfo />
          ) : (
            <button 
              onClick={handleConnect}
              disabled={isPending}
              className='w-36 h-10 bg-white/10 backdrop-blur-sm border border-white/10 text-white flex items-center justify-center rounded-xl text-base font-semibold cursor-pointer no-underline hover:bg-white/10 hover:border-white/20 hover:text-white hover:scale-[1.02] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed relative overflow-hidden'
            >
              {isPending ? (
                <div className='flex items-center gap-2'>
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  <span>Connecting</span>
                </div>
              ) : (
                'Connect Wallet'
              )}
            </button>
          )}
          
          {error && (
            <div className="absolute top-full right-8 mt-2 w-64 sm:w-80 p-3 bg-red-100 border border-red-600 rounded-lg z-50">
              <p className="text-red-600 text-sm">
                {error.message || 'Connection failed. Please try again.'}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default AppHeader;
