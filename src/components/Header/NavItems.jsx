import { Link } from 'react-router-dom';

export const NavItems = ({ items, onClick }) => {
  return (
    <div className="flex flex-col lg:flex-row items-center space-y-4 lg:space-y-0 lg:space-x-8">
      {items.map((item) => (
        <Link
          key={item.name}
          to={item.link}
          onClick={onClick}
          className="text-lg font-medium text-white hover:text-violet-600 transition duration-300 px-4 py-2 rounded-xl hover:bg-white/5"
        >
          {item.name}
        </Link>
      ))}
    </div>
  )
}
