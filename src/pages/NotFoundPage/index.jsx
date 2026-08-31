import { Link } from 'react-router-dom';
import totoroInTheSnow from '@/assets/images/totoro-holding-a-lantern-in-the-snow.jpg';

const NotFound = () => {
  return (
    <div className='relative min-h-screen bg-cover bg-no-repeat bg-fixed bg-center' style={{ backgroundImage: `url(${totoroInTheSnow})` }}>
      <div className="flex flex-col items-center justify-center min-h-screen gap-2 text-center">
        <h3 className="text-4xl font-bold text-white/60 sm:text-5xl md:text-6xl">404</h3>
        <h4 className="text-3xl font-bold sm:text-4xl md:text-5xl">Page not found</h4>
        <p className="max-w-sm mx-auto mt-3">
          The page you are looking for does not exist or may have been moved.
        </p>
        <Link to='/' className="inline-flex items-center justify-center w-40 h-10 bg-white/10 backdrop-blur-sm border border-white/10 text-white hover:text-white/40 rounded-xl m-4 text-lg font-semibold transition-transform hover:scale-[0.98] duration-300">Go Back Home</Link>
      </div>
    </div>
  )
}

export default NotFound;
