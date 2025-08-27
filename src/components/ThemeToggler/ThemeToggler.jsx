import { useTheme } from '@/theme/ThemeContext';
import { FiMoon, FiSun } from 'react-icons/fi';

const ThemeToggler = () => {
  const { toggleTheme, isDarkMode } = useTheme();
  return (
    <button onClick={toggleTheme} className="p-2 mx-5 cursor-pointer">
      {isDarkMode ? <FiMoon size={15} /> : <FiSun size={15} />}
    </button>
  );
};

export default ThemeToggler;
