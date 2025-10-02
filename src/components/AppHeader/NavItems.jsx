import { Link, useLocation } from 'react-router-dom';
import { appNav } from '@/config/navigation';

export const NavItems = ({ items = appNav }) => {
  const location = useLocation();
  
  return (
    <div className="hidden lg:flex items-center self-center gap-4">
      {items.map((link) => (
        <span key={link.name} className="hover:scale-105 transition duration-300">
          <Link 
            className={`text-base font-semibold cursor-pointer py-2 px-4 rounded-xl transition duration-300 list-none no-underline ${
              location.pathname === link.link 
                ? 'bg-violet-700 text-white' 
                : 'text-white hover:bg-violet-700'
            }`}
            to={link.link}
          >
            {link.name}
          </Link>
        </span>
      ))}
    </div>
  )
}
