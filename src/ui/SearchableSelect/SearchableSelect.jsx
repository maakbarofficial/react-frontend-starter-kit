import { useEffect, useState, useRef } from 'react';
import { FiChevronDown, FiX, FiCheck } from 'react-icons/fi';
import { InputSkeleton } from '@/ui';

const SearchableSelect = ({
  options = [],
  loading = false,
  value,
  onChange,
  name,
  placeholder = 'Select an option',
  optionLabel = 'label',
  optionValue = 'value',
  defaultFirstOption = false,
  setSelectedValue,
  className = '',
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedOption, setSelectedOption] = useState(null);
  const dropdownRef = useRef(null);
  const searchInputRef = useRef(null);

  const filteredOptions = options.filter((option) =>
    String(option[optionLabel]).toLowerCase().includes(searchTerm.toLowerCase()),
  );

  useEffect(() => {
    if (defaultFirstOption && options.length > 0 && !value) {
      const firstOption = options[0];
      setSelectedOption(firstOption);
      if (setSelectedValue) {
        setSelectedValue(firstOption[optionValue]);
      }
      onChange?.({ target: { name, value: firstOption[optionValue] } });
    }
  }, [options, defaultFirstOption]);

  useEffect(() => {
    if (value === undefined || value === null || value === '') {
      if (defaultFirstOption && options.length > 0) {
        const firstOption = options[0];
        setSelectedOption(firstOption);
        if (setSelectedValue) {
          setSelectedValue(firstOption[optionValue]);
        }
        onChange?.({ target: { name, value: firstOption[optionValue] } });
      } else {
        setSelectedOption(null);
      }
    } else if (options.length > 0) {
      const foundOption = options.find((option) => String(option[optionValue]) === String(value));
      setSelectedOption(foundOption || null);
    }
  }, [value, options, optionValue]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleSelect = (option) => {
    setSelectedOption(option);
    if (onChange) {
      onChange({
        target: {
          name,
          value: option[optionValue],
        },
      });
    }
    if (setSelectedValue) {
      setSelectedValue(option[optionValue]);
    }
    setIsOpen(false);
    setSearchTerm('');
  };

  const handleClear = (e) => {
    e.stopPropagation();
    setSelectedOption(null);
    setSearchTerm('');
    if (onChange) {
      onChange({
        target: {
          name,
          value: '',
        },
      });
    }
    if (setSelectedValue) {
      setSelectedValue('');
    }
    if (isOpen && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  };

  return (
    <div className={`relative ${className}`} ref={dropdownRef}>
      {loading ? (
        <InputSkeleton />
      ) : (
        <>
          <div
            className="select cursor-pointer !flex !items-center !justify-between"
            onClick={() => {
              setIsOpen(!isOpen);
              if (!isOpen && searchInputRef.current) {
                setTimeout(() => searchInputRef.current.focus(), 0);
              }
            }}
          >
            {selectedOption ? (
              <span className="truncate">{selectedOption[optionLabel]}</span>
            ) : (
              <span className="text-gray-400">{placeholder}</span>
            )}
            <div className="flex items-center">
              {isOpen && searchTerm && (
                <button type="button" onClick={handleClear} className="mr-1 text-gray-400 hover:text-gray-600">
                  <FiX size={14} />
                </button>
              )}
              <FiChevronDown
                className={`transition-transform duration-200 ${isOpen ? 'transform rotate-180' : ''}`}
                size={16}
              />
            </div>
          </div>

          {isOpen && (
            <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg dark:bg-gray-700 dark:border-gray-600 max-h-60 overflow-auto">
              <div className="sticky top-0 p-2 bg-white dark:bg-gray-700">
                <input
                  ref={searchInputRef}
                  type="text"
                  placeholder="Search..."
                  className="w-full p-1 text-xs border border-gray-300 rounded dark:bg-gray-800 dark:border-gray-600 dark:text-white"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  autoFocus
                />
              </div>
              {filteredOptions.length > 0 ? (
                <ul>
                  {filteredOptions.map((option, index) => (
                    <li
                      key={index}
                      className={`px-3 py-2 text-xs cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-600 flex items-center justify-between ${
                        selectedOption && String(selectedOption[optionValue]) === String(option[optionValue])
                          ? 'bg-gray-100 dark:bg-gray-600'
                          : ''
                      }`}
                      onClick={() => handleSelect(option)}
                    >
                      <span>{option[optionLabel]}</span>
                      {selectedOption && String(selectedOption[optionValue]) === String(option[optionValue]) && (
                        <FiCheck size={14} className="text-blue-500" />
                      )}
                    </li>
                  ))}
                </ul>
              ) : (
                <div className="px-3 py-2 text-xs text-gray-500 dark:text-gray-400">No data available</div>
              )}
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default SearchableSelect;
