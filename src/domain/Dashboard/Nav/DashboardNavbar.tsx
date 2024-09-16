import { selectIsSidebarCollapse } from '@/redux/selectors/userSelectors';
import { setIsSidebarCollapse } from '@/redux/slice/userSlice';
import { Menu } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';

export default function DashboardNavbar() {
  const dispatch = useDispatch();
  const isSidebarCollapsed = useSelector(selectIsSidebarCollapse);

  const toggleSidebar = () => {
    dispatch(setIsSidebarCollapse(!isSidebarCollapsed));
  };

  return (
    <div className="flex justify-between items-center w-full mb-4">
      <div className="flex justify-between items-center gap-5">
        <button
          className="px-3 py-3 bg-gray-100 rounded-full hover:bg-blue-100"
          onClick={toggleSidebar}
        >
          <Menu size={24} className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
