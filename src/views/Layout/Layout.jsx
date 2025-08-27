import Header from '@/components/Header/Header';
import Sidebar from '@/components/Sidebar/Sidebar';
import { useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { HealthCheck } from '..';

const Layout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const location = useLocation();

  const closeSidebar = () => setIsSidebarOpen(false);

  // Routes where header/sidebar should be hidden
  const hideHeaderRoutes = ['/load/domestic', '/load/international'];
  const hideHeader = hideHeaderRoutes.includes(location.pathname);

  return (
    <>
      {!hideHeader && <Header />}
      {!hideHeader && <Sidebar isOpen={isSidebarOpen} closeSidebar={closeSidebar} />}
      <Outlet />
      <HealthCheck />
    </>
  );
};

export default Layout;
