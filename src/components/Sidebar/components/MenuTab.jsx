import { Link, useLocation } from 'react-router-dom';

const MenuTab = ({ icon, name, path, onClick }) => {
  const location = useLocation();
  const isActive = location.pathname === path || location.pathname.startsWith(path + '/');
  return (
    <li className="my-1">
      <Link
        to={path}
        onClick={onClick}
        className={`menu-tab ${isActive ? 'bg-secondary text-white' : 'bg-transparent'}`}
      >
        {icon}
        <span className="ml-2">{name}</span>
      </Link>
    </li>
  );
};

export default MenuTab;
