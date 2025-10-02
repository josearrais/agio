import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className="relative">
      <div className="flex flex-col items-center justify-center min-h-screen gap-2 text-center bg-violet-600">
        <h3 className="text-3xl font-bold text-violet-900 sm:text-4xl md:text-5xl">404</h3>
        <h4 className="text-4xl font-bold sm:text-5xl md:text-6xl">Page not found.</h4>
        <p className="max-w-sm mx-auto mt-3">
          The page you are looking for does not exist or may have been moved.
        </p>
        <Link to='/' className="inline-flex items-center justify-center w-48 h-12 bg-white text-violet-600 rounded-xl m-4 text-lg font-semibold transition-transform hover:scale-[1.02] active:scale-[0.98] duration-300">Go Back Home</Link>
      </div>
    </div>
  )
}

export default NotFound;
