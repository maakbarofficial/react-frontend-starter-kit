import { useLocalStorage } from '@/hooks';

const Tabs = ({ tabs, storageKey = 'activeTab', onTabChange }) => {
  const defaultTab = tabs[0].id;
  const [activeTab, setActiveTab] = useLocalStorage(storageKey, defaultTab);

  const handleTabChange = (newTab) => {
    setActiveTab(newTab);
    if (onTabChange) {
      onTabChange(newTab);
    }
  };
  return (
    <div>
      {/* Mobile Select */}
      <div className="sm:hidden">
        <select
          value={activeTab}
          onChange={(e) => handleTabChange(e.target.value)}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        >
          {tabs.map((tab) => (
            <option key={tab.id} value={tab.id}>
              {tab.label}
            </option>
          ))}
        </select>
      </div>

      {/* Desktop Tabs */}
      <ul className="hidden text-sm font-medium text-center text-gray-500 rounded-lg shadow-sm sm:flex dark:divide-gray-700 dark:text-gray-400">
        {tabs.map((tab) => (
          <li key={tab.id} className="w-full focus-within:z-10">
            <button
              onClick={() => handleTabChange(tab.id)}
              className={`cursor-pointer inline-block w-full p-4 border-gray-200 dark:border-gray-700 focus:outline-none ${
                activeTab === tab.id
                  ? 'text-gray-900 bg-gray-100 dark:bg-gray-700 dark:text-white border-2 border-b-primary dark:border-2 dark:border-b-brand shadow-inner'
                  : 'bg-white hover:text-gray-700 hover:bg-gray-50 dark:hover:text-white dark:bg-gray-800 dark:hover:bg-gray-700'
              }`}
            >
              {tab.label}
            </button>
          </li>
        ))}
      </ul>

      {/* Tab Content */}
      <div className="p-4 mt-2 bg-white border border-gray-200 rounded-lg dark:bg-gray-800 dark:border-gray-700">
        {tabs.find((tab) => tab.id === activeTab)?.content}
      </div>
    </div>
  );
};

export default Tabs;
