import { NavItems } from './NavItems';
import ChainSelector from '../ChainSelector';

const AppHeader = () => {
  return (
    <div className='absolute px-8 py-2 top-0 left-0 right-0 border-b border-violet-500'>
      <div className='flex items-center justify-between grow'>
        <NavItems />
        <div className='inline-flex items-center gap-2'>
          <ChainSelector />
          <a className='w-36 h-10 bg-white text-violet-600 flex items-center justify-center rounded-xl text-base font-semibold cursor-pointer no-underline hover:bg-violet-100 hover:scale-[1.05] transition duration-300'>Connect Wallet</a>
        </div>
      </div>
    </div>
  )
}

export default AppHeader;
