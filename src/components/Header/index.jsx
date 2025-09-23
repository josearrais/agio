import { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/solid';
import { homePageNav } from '@/config/navigation';
import { NavItems } from './NavItems';

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    let timeoutId = null;

    const handleScroll = () => {
      if (timeoutId) {
        window.cancelAnimationFrame(timeoutId);
      }

      timeoutId = window.requestAnimationFrame(() => {
        setScrolled(window.scrollY > 10);
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (timeoutId) {
        window.cancelAnimationFrame(timeoutId);
      }
    };
  }, []);

  const toggleMenu = useCallback(() => {
    setIsOpen(prev => !prev);
  }, []);

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden"
          onClick={toggleMenu}
        />
      )}

      <header
        className={`fixed w-full z-50 transition-all duration-300 ${
          scrolled ? 'backdrop-blur-xl py-2' : 'py-4'
        }`}
      >
        {scrolled && (
          <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
        )}
        <div className="relative px-8 sm:px-14 py-0 top-0 bottom-auto inset-x-0">
          <div className="flex items-center max-w-7xl mx-auto h-16 justify-between">
            <Link to="/" className="text-3xl font-semibold no-underline inline-flex">
              Agio
            </Link>

            <nav className="hidden lg:flex items-center gap-4">
              <Link
                to="/swap"
                className="w-36 h-12 bg-white text-black flex items-center justify-center rounded-xl text-lg font-semibold cursor-pointer no-underline hover:text-violet-600 hover:bg-violet-100 transition-all duration-300"
              >
                Get Started
              </Link>
            </nav>

            <button
              className="lg:hidden z-50"
              onClick={toggleMenu}
              aria-label={isOpen ? 'Close menu' : 'Open menu'}
            >
              {isOpen ? (
                <XMarkIcon className="size-8" />
              ) : (
                <Bars3Icon className="size-8" />
              )}
            </button>
          </div>

          {isOpen && (
            <div className="lg:hidden bg-black rounded-xl mt-2 p-4 z-50">
              <div className="flex flex-col space-y-4">
                <NavItems items={homePageNav} onClick={toggleMenu} />
                <Link
                  to="/swap"
                  className="w-full h-12 bg-white text-black flex items-center justify-center rounded-xl text-lg font-semibold cursor-pointer no-underline hover:text-violet-600 hover:bg-violet-100 transition-all duration-300"
                  onClick={toggleMenu}
                >
                  Get Started
                </Link>
              </div>
            </div>
          )}
        </div>
      </header>
    </>
  )
}

export default Header;
