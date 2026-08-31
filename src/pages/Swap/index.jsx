import { useState, useCallback } from 'react';
import { AppHeader } from '@/components';
import TradeBoxHeader from './components/TradeBoxHeader';
import TradeBox from './components/TradeBox';
import { BlockNumber } from '@/components';
import studioGhibliBridge from '@/assets/images/studio-ghibli-bridge.jpg';

const Swap = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [refreshFn, setRefreshFn] = useState(() => () => Promise.resolve());

  const handleRefresh = useCallback(async () => {
    try {
      await refreshFn();
    } catch (error) {
      console.error('Error refreshing price: ', error);
    }
  }, [refreshFn]);

  return (
    <div className='relative min-h-screen flex flex-col bg-cover bg-no-repeat bg-fixed bg-center' style={{ backgroundImage: `url(${studioGhibliBridge})` }}>
      <AppHeader />
      <div className='flex-1 flex flex-col items-center justify-center'>
        <div className='max-h-96 px-8 py-16 z-10'>
          <div className='flex flex-col'>
            <TradeBoxHeader 
              refreshTokenTwoAmount={handleRefresh} 
              isLoading={isLoading} 
            />
            <TradeBox onRefresh={setRefreshFn} setIsLoading={setIsLoading} />
          </div>
        </div>
      </div>
      <div className='w-full px-8 py-4'>
        <div className='flex justify-end'>
          <BlockNumber />
        </div>
      </div>
    </div>
  )
}

export default Swap;
