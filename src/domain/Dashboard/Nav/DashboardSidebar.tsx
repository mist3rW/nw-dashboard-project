import { cn } from '@/lib/utils';
import { selectIsSidebarCollapse } from '@/redux/selectors/userSelectors';
import { setIsAuth, setIsSidebarCollapse } from '@/redux/slice/userSlice';
import { Layout, LogOut, LucideIcon, Menu, User } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

function DashboardSidebar() {
  const dispatch = useDispatch();
  const isSidebarCollapsed = useSelector(selectIsSidebarCollapse);

  const toggleSidebar = () => {
    dispatch(setIsSidebarCollapse(!isSidebarCollapsed));
  };

  return (
    <div
      className={`fixed flex flex-col ${
        isSidebarCollapsed ? 'w-0 md:w-16' : 'w-72 md:w-64'
      } bg-secondary transition-all duration-300 overflow-hidden h-full shadow-md z-40`}
    >
      {/* Logo and Title */}
      <div
        className={cn(
          'flex justify-between md:justify-normal items-center pt-8',
          isSidebarCollapsed ? 'px-4' : 'px-8'
        )}
      >
        <div className="font-extrabold text-2xl text-secondary-foreground">
          NW
        </div>
      </div>
      <div
        onClick={toggleSidebar}
        className="md:hidden px-3 py-3 bg-primary rounded-full hover:bg-blue-100 absolute top-8 right-8"
      >
        <Menu className="w-4 h-4" color="white" />
      </div>

      {/* Links */}
      <div className="flex-grow mt-8 ">
        <SidebarLink
          href="/dashboard"
          icon={Layout}
          label="Dashboard"
          isCollapsed={isSidebarCollapsed}
        />
        <SidebarLink
          href="/users"
          icon={User}
          label="Users"
          isCollapsed={isSidebarCollapsed}
        />
      </div>

      {/* Side footer */}
      <div className="flex-1 mt-auto">
        <div onClick={() => dispatch(setIsAuth(false))}>
          <SidebarLink
            href="#"
            icon={LogOut}
            label="Sign out"
            isCollapsed={isSidebarCollapsed}
          />
        </div>

        <p className="text-center text-xs text-gray-500 mt-2 ">
          &copy; 2024 NW.
        </p>
      </div>
    </div>
  );
}

export default DashboardSidebar;

type SidebarLinkProps = {
  href: string;
  icon: LucideIcon;
  label: string;
  isCollapsed: boolean;
};

const SidebarLink = ({
  href,
  icon: Icon,
  label,
  isCollapsed,
}: SidebarLinkProps) => {
  const dispatch = useDispatch();
  const isActive = window.location.pathname === href;
  return (
    <Link
      to={href}
      onClick={() => {
        dispatch(setIsSidebarCollapse(true));
      }}
    >
      <div
        className={`cursor-pointer flex items-center hover:bg-primary/20  ${
          isCollapsed ? 'justify-center py-4' : 'justify-start px-8 py-4'
        }
         ${isActive ? 'bg-primary text-secondary dark:bg-primary' : ''}

      }`}
      >
        <Icon className="w-6 h-6 dark:text-white" />

        <span
          className={`${
            isCollapsed ? 'hidden' : 'block'
          } ml-1 font-medium text-secondary-foreground ${
            isActive ? 'text-secondary dark:text-white' : ''
          }`}
        >
          {label}
        </span>
      </div>
    </Link>
  );
};
