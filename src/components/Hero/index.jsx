const Hero = () => {
  return (
    <div className='relative'>
      <div className='min-h-screen justify-start items-center flex'>
        <div className='text-center absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2'>
          <h1 className='font-bold text-3xl sm:text-4xl md:text-5xl lg:text-6xl lg:whitespace-nowrap animate-fadeInUp'>Where <i className='font-semibold'>Speed</i> Meets <i className='font-semibold'>Liquidity</i></h1>
          <p className='font-semibold text-xl lg:text-2xl mt-11 md:mt-6 p-3 animate-fadeInUpDelay'>Move assets across networks in seconds. <br/>Anytime. Anywhere. Onchain.</p>
          <div className='inline-block no-underline mt-11 md:mt-6 animate-fadeInUpDelay'>
            <button className='w-56 h-12 bg-white text-black rounded-xl m-2 text-lg font-semibold cursor-pointer transition-transform hover:scale-[1.02] active:scale-[0.98] duration-300'>User Guides</button>
            <button className='w-56 h-12 bg-black text-white rounded-xl m-2 text-lg font-semibold cursor-pointer transition-transform hover:scale-[1.02] active:scale-[0.98] duration-300'>Developer Docs</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Hero;
