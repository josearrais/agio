import { Link, useLocation } from 'react-router-dom';
import { appNav } from '@/config/navigation';

export const NavItems = ({ items = appNav, onItemClick }) => {
  const location = useLocation();

  return (
    <div className="flex flex-col lg:flex-row items-center self-center gap-4 w-full lg:w-auto">
      {items.map((link) => {
        const isActive = location.pathname === link.link;

        return (
          <span
            key={link.name}
            className="w-full lg:w-auto hover:scale-105 transition duration-300"
          >
            <Link
              className={`text-base font-semibold cursor-pointer py-2 px-4 rounded-xl transition duration-300 list-none no-underline block
                text-left lg:text-center
                ${isActive ? 'bg-white/20 text-white' : 'text-white hover:bg-white/10'}
              `}
              to={link.link}
              onClick={onItemClick}
            >
              {link.name}
            </Link>
          </span>
        );
      })}
    </div>
  )
}
