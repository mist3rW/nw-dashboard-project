import { Outlet } from 'react-router-dom';
import DashboardNavbar from './Nav/DashboardNavbar';
import DashboardSidebar from './Nav/DashboardSidebar';
import { useSelector } from 'react-redux';
import { selectIsSidebarCollapse } from '@/redux/selectors/userSelectors';
import { cn } from '@/lib/utils';

export default function DashboardWrapper() {
  const isSidebarCollapsed = useSelector(selectIsSidebarCollapse);

  return (
    <div
      className={cn(
        'flex bg-primary-foreground text-gray-900 w-full min-h-screen'
      )}
    >
      <DashboardSidebar />
      <main
        className={cn(
          'flex flex-col w-full h-full py-7 px-9 ',
          isSidebarCollapsed ? 'md:pl-24' : 'md:pl-72'
        )}
      >
        <DashboardNavbar />
        <Outlet />
      </main>
    </div>
  );
}
