import Logo from '@/assets/logo.png';
import { Link } from 'react-router-dom';
import { FaChevronDown, FaChevronUp, FaSun, FaMoon, FaUser, FaKey, FaCog, FaSignOutAlt } from 'react-icons/fa';
import { useEffect, useRef, useState } from 'react';
import { useAuthStore, useUserStore } from '@/stores';
import { toast } from 'react-toastify';
import { SidebarToggler, ThemeToggler } from '..';
import { useTheme } from '@/theme/ThemeContext';

const Header = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const { user, setUser } = useUserStore();
  const { setToken } = useAuthStore();
  const { isDarkMode } = useTheme();

  const handleLogout = () => {
    setUser(null);
    setToken(null);
    toast.success('Logout successfully');
  };

  const dropdownRef = useRef(null);

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setDropdownOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="sticky top-0 z-50">
      <header className="flex items-center justify-between bg-white dark:bg-gray-900 shadow-xl border-b-2 border-b-[#C29962] px-5 py-2">
        <div className="flex-center gap-2">
          <SidebarToggler />
          <div className="logo">
            <Link to={'/dashboard'}>
              <img src={Logo} alt="Logo" className="w-10" />
            </Link>
          </div>
        </div>

        <div className="flex-center">
          <div className="hidden md:block">
            <h1 className="text-sm font-bold hidden lg:block">AirSial - Central Reservation Control (CRC)</h1>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="relative" ref={dropdownRef}>
            <button 
              className="flex items-center gap-2 focus:outline-none cursor-pointer"
              onClick={() => setDropdownOpen(!dropdownOpen)}
              aria-label="User menu"
              aria-expanded={dropdownOpen}
            >
              <div className="relative">
                <div className="w-9 h-9 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-700 flex items-center justify-center">
                  {user?.profile_picture ? (
                    <img 
                      src={user.profile_picture} 
                      alt="Profile" 
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <svg
                      className="w-6 h-6 text-gray-500 dark:text-gray-400"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                        clipRule="evenodd"
                      />
                    </svg>
                  )}
                </div>
                <span className="absolute top-0 right-0 w-3 h-3 bg-green-500 border-2 border-white dark:border-gray-900 rounded-full"></span>
              </div>
              
              <div className="hidden md:block">
                <p className="text-xs font-medium text-left">
                  {user?.first_name} {user?.last_name}
                </p>
                <p className="text-[10px] text-gray-500 dark:text-gray-400">
                  {user?.role}
                </p>
              </div>
              
              {dropdownOpen ? <FaChevronUp size={12} /> : <FaChevronDown size={12} />}
            </button>

            {dropdownOpen && (
              <div className="absolute right-0 mt-2 w-56 bg-white dark:bg-gray-800 rounded-md shadow-lg overflow-hidden z-50 border border-gray-200 dark:border-gray-700">
                <div className="px-4 py-3 border-b border-gray-200 dark:border-gray-700">
                  {/* <p className="text-sm font-medium text-gray-900 dark:text-white">
                    {user?.first_name} {user?.last_name}
                  </p> */}
                  <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
                    <span className="font-bold">Username:</span> {user?.user_name}
                  </p>
                </div>
                
                <div className="py-1">
                  <Link
                    to="/profile"
                    className="flex items-center px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                    onClick={() => setDropdownOpen(false)}
                  >
                    <FaUser className="mr-3" />
                    Profile
                  </Link>
                  
                  <Link
                    to="/change-password"
                    className="flex items-center px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                    onClick={() => setDropdownOpen(false)}
                  >
                    <FaKey className="mr-3" />
                    Change Password
                  </Link>
                  
                  <Link
                    to="/settings"
                    className="flex items-center px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                    onClick={() => setDropdownOpen(false)}
                  >
                    <FaCog className="mr-3" />
                    Settings
                  </Link>
                  
                  <div className="px-4 py-2 border-t border-gray-200 dark:border-gray-700">
                    <div className="flex items-center justify-between text-sm text-gray-700 dark:text-gray-300">
                      <span>{isDarkMode ? "Dark" : "Light"} Theme</span>
                      <ThemeToggler />
                    </div>
                  </div>
                </div>
                
                <div className="py-1 border-t border-gray-200 dark:border-gray-700">
                  <button
                    onClick={handleLogout}
                    className="flex items-center w-full px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer"
                  >
                    <FaSignOutAlt className="mr-3" />
                    Logout
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </header>
    </div>
  );
};

export default Header;