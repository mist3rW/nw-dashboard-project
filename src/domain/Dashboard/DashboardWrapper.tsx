import { Outlet } from 'react-router-dom';
import DashboardNavbar from './Nav/DashboardNavbar';
import DashboardSidebar from './Nav/DashboardSidebar';
import { useSelector } from 'react-redux';
import {
  selectIsDarkMode,
  selectIsSidebarCollapse,
} from '@/redux/selectors/userSelectors';
import { cn } from '@/lib/utils';
import { useEffect } from 'react';

export default function DashboardWrapper() {
  const isSidebarCollapsed = useSelector(selectIsSidebarCollapse);

  const isDarkMode = useSelector(selectIsDarkMode);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.add('light');
    }
  }, [isDarkMode]);

  return (
    <div
      className={cn(
        'flex bg-gray-50 text-gray-900 w-full min-h-screen',
        isDarkMode ? 'dark' : 'light'
      )}
    >
      <DashboardSidebar />
      <main
        className={cn(
          'flex flex-col w-full h-full py-7 px-9 bg-red-50',
          isSidebarCollapsed ? 'md:pl-24' : 'md:pl-72'
        )}
      >
        <DashboardNavbar />
        <Outlet />
      </main>
    </div>
  );
}
