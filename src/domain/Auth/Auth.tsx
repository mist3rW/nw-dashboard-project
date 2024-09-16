import { Outlet } from 'react-router-dom';
import bgImage from '../../assets/auth-bg.jpg';

export default function Auth() {
  return (
    <div
      className="flex justify-center items-center h-screen"
      style={{
        background: `linear-gradient(0deg, rgba(0, 0,0 , 0.3), rgba(255, 0, 150, 0.4)), url(${bgImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
    >
      <Outlet />
    </div>
  );
}
