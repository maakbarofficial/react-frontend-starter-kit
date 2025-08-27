import { useLogout } from '@/hooks';
import { useAuthStore, useUserStore } from '@/stores';
import { useTheme } from '@/theme/ThemeContext';
import { useState, useMemo, useRef, useEffect } from 'react';
import { FaChevronDown, FaChevronUp, FaSun, FaMoon, FaUser, FaKey, FaCog, FaSignOutAlt } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { ThemeToggler } from '..';
import { toast } from 'react-toastify';

const getInitials = (name) => {
  const parts = name.trim().split(' ');
  const initials = (parts[0]?.charAt(0) || '') + (parts[1]?.charAt(0) || '');
  return initials.toUpperCase();
};

const getRandomColor = () => {
  const colors = [
    'bg-red-500',
    'bg-green-500',
    'bg-blue-500',
    'bg-yellow-500',
    'bg-purple-500',
    'bg-pink-500',
    'bg-orange-500',
    'bg-indigo-500',
  ];
  return colors[Math.floor(Math.random() * colors.length)];
};

const UserAvatar = ({ name = 'User' }) => {
  const { user, setUser } = useUserStore();
  const { setToken } = useAuthStore();
  const { isDarkMode } = useTheme();
  const logout = useLogout();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const initials = useMemo(() => getInitials(name), [name]);
  const backgroundColor = useMemo(() => getRandomColor(), []);

  const handleLogout = () => {
    setUser(null);
    setToken(null);
    toast.success('Logout successfully');
  };


  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="relative inline-block text-left">
      <div
        className="flex items-center justify-center gap-2 cursor-pointer"
        onClick={() => setDropdownOpen(!dropdownOpen)}
      >
        <button
          className={`w-10 h-10 flex items-center justify-center rounded-full cursor-pointer text-white font-semibold ${backgroundColor}`}
        >
          {initials}
        </button>
        <div>{dropdownOpen ? <FaChevronUp size={10} /> : <FaChevronDown size={10} />}</div>
      </div>

      {dropdownOpen && (
        <div className="absolute right-0 mt-2 w-56 bg-white dark:bg-gray-800 rounded-md shadow-lg overflow-hidden z-50 border border-gray-200 dark:border-gray-700">
          <div className="px-4 py-3 border-b border-gray-200 dark:border-gray-700">
            <p className="text-sm font-medium text-gray-900 dark:text-white">
              {user?.first_name} {user?.last_name}
            </p>
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
  );
};

export default UserAvatar;
