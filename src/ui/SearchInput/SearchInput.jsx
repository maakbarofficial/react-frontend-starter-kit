import { CiSearch } from 'react-icons/ci';

const SearchInput = ({
  placeholder = 'Search...',
  value,
  onChange,
  className = '',
  inputClassName = '',
  iconClassName = '',
}) => {
  return (
    <div className={`relative ${className}`}>
      <div className={`absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none ${iconClassName}`}>
        <CiSearch />
      </div>
      <input
        type="search"
        className={`block w-full p-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-primary focus:border-primary dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary dark:focus:border-primary ${inputClassName}`}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
};

export default SearchInput;
