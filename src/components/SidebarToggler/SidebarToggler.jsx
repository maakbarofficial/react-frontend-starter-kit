import { HiMiniBars3CenterLeft } from 'react-icons/hi2';
import { Sidebar } from '..';
import { useState } from 'react';

const SidebarToggler = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };
  return (
    <div>
      <button onClick={toggleSidebar} className="cursor-pointer">
        <HiMiniBars3CenterLeft className="text-xl md:text-2xl" />
      </button>
      <Sidebar isOpen={isSidebarOpen} closeSidebar={closeSidebar} />
    </div>
  );
};

export default SidebarToggler;
