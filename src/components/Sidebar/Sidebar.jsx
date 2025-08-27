import { useEffect, useState } from 'react';
import { useUserStore } from '@/stores';
import MenuTab from './components/MenuTab';
import DropdownMenu from './components/DropdownMenu';
import { routes, dropdownMenus, roleBasedDropdowns } from './components/SidebarRoutes';
import { useLocation } from 'react-router-dom';

const Sidebar = ({ isOpen, closeSidebar }) => {
  const user = useUserStore((state) => state.user);
  const location = useLocation();
  const [dropdownOpen, setDropdownOpen] = useState({});

  const updateDropdownState = () => {
    const newState = {};

    const matches = (items) =>
      items.some((item) => location.pathname === item.path || location.pathname.startsWith(item.path + '/'));

    dropdownMenus.forEach((menu) => {
      newState[menu.menu] = matches(menu.items);
    });

    if (roleBasedDropdowns[user?.role]) {
      roleBasedDropdowns[user.role].forEach((menu) => {
        newState[menu.title] = matches(menu.items);
      });
    }

    setDropdownOpen((prev) => ({ ...prev, ...newState }));
  };

  useEffect(() => {
    updateDropdownState();
  }, [location.pathname, user?.role]);

  const toggleDropdown = (menu) => {
    setDropdownOpen((prev) => {
      const isCurrentlyOpen = !!prev[menu];
      // Close all dropdowns and toggle current one
      const nextState = Object.keys(prev).reduce((acc, key) => {
        acc[key] = false;
        return acc;
      }, {});
      nextState[menu] = !isCurrentlyOpen;
      return nextState;
    });
  };

  const handleCloseSidebar = () => {
    closeSidebar();
  };

  return (
    <div
      className={`fixed z-50 inset-0 bg-gray-800/75 transition-opacity ${
        isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
      }`}
      onClick={handleCloseSidebar}
    >
      <div
        className={`bg-white dark:bg-gray-900 overflow-y-scroll w-64 h-full p-5 transform transition-transform shadow-lg ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-xl font-bold mb-5">Main Menu</h2>
        <nav className="mt-4">
          <ul className="flex flex-col gap-3">
            {/* Static routes */}
            {routes.map((route) => (
              <MenuTab
                key={route.name}
                icon={route.icon}
                name={route.name}
                path={route.path}
                onClick={handleCloseSidebar}
              />
            ))}

            {/* Dropdown menus */}
            {dropdownMenus.map((menu) => (
              <DropdownMenu
                key={menu.title}
                title={menu.title}
                icon={menu.icon}
                isOpen={dropdownOpen[menu.menu]}
                toggleDropdown={() => toggleDropdown(menu.menu)}
                items={menu.items.map((item) => ({
                  ...item,
                  onClick: handleCloseSidebar,
                }))}
              />
            ))}

            {/* Role-Based Dropdown Menus */}
            {roleBasedDropdowns[user?.role]?.map((menu) => (
              <DropdownMenu
                key={menu.title}
                title={menu.title}
                icon={menu.icon}
                isOpen={dropdownOpen[menu.title]}
                toggleDropdown={() => toggleDropdown(menu.title)}
                items={menu.items.map((item) => ({
                  ...item,
                  onClick: handleCloseSidebar,
                }))}
              />
            ))}
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default Sidebar;
