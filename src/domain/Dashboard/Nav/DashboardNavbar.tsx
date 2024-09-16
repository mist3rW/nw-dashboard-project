import { selectIsSidebarCollapse } from '@/redux/selectors/userSelectors';
import { setIsSidebarCollapse } from '@/redux/slice/userSlice';
import { Menu, Moon, Sun } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';

export default function DashboardNavbar() {
  const isDarkMode = false;
  const dispatch = useDispatch();
  const isSidebarCollapsed = useSelector(selectIsSidebarCollapse);

  const toggleSidebar = () => {
    dispatch(setIsSidebarCollapse(!isSidebarCollapsed));
  };

  // const isDarkMode = useAppSelector((state) => state.global.isDarkMode);

  const toggleDarkMode = () => {
    // dispatch(setIsDarkMode(!isDarkMode));
  };
  return (
    <div className="flex justify-between items-center w-full mb-7">
      {/* LEFT */}
      <div className="flex justify-between items-center gap-5">
        <button
          className="px-3 py-3 bg-gray-100 rounded-full hover:bg-blue-100"
          onClick={toggleSidebar}
        >
          <Menu size={24} className="w-4 h-4" />
        </button>
      </div>
      {/* RIGHT */}
      <div className="flex justify-between items-center gap-5">
        <div className="hidden md:flex justify-between items-center gap-5">
          <div>
            <button onClick={toggleDarkMode}>
              {isDarkMode ? (
                <Sun
                  size={24}
                  className="w-6 h-6 cursor-pointer text-gray-500"
                />
              ) : (
                <Moon
                  size={24}
                  className="w-6 h-6 cursor-pointer text-gray-500"
                />
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
