import React from 'react';
import { FaChevronDown, FaChevronRight } from 'react-icons/fa';
import MenuTab from './MenuTab';

const DropdownMenu = ({ title, icon, isOpen, toggleDropdown, items }) => {
  return (
    <li>
      <div onClick={toggleDropdown} className={`menu-tab cursor-pointer ${isOpen ? 'bg-secondary text-white' : ''}`}>
        {icon}
        <span className="ml-2">{title}</span>
        <span className="ml-auto">{isOpen ? <FaChevronDown /> : <FaChevronRight />}</span>
      </div>

      <ul className={`ml-4 mt-2 overflow-hidden ${isOpen ? 'max-h-full opacity-100' : 'max-h-0 opacity-0'}`}>
        {items.map((item) => (
          <MenuTab key={item.name} icon={item.icon} name={item.name} path={item.path} onClick={item.onClick} />
        ))}
      </ul>
    </li>
  );
};

export default DropdownMenu;
