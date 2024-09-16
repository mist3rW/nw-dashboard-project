import { Navigate, Route, Routes } from 'react-router-dom';
import './App.css';
import Auth from './domain/Auth/Auth';
import Signin from './domain/Auth/Signin';
import Users from './domain/Dashboard/Users';
import DashboardWrapper from './domain/Dashboard/DashboardWrapper';
import Dashboard from './domain/Dashboard/Dashboard';
import { useSelector } from 'react-redux';
import { selectIsAuth } from './redux/selectors/userSelectors';
import SingleUsers from './domain/Dashboard/SingleUsers';

function App() {
  const isAuth = useSelector(selectIsAuth);

  return (
    <Routes>
      <Route Component={Auth}>
        <Route path="signin" Component={Signin}></Route>
      </Route>
      <Route Component={DashboardWrapper}>
        <Route
          path="/dashboard"
          element={isAuth ? <Dashboard /> : <Navigate to="/signin" />}
        ></Route>
        <Route
          path="/users"
          element={isAuth ? <Users /> : <Navigate to="/signin" />}
        ></Route>
        <Route
          path="/user/:id"
          element={isAuth ? <SingleUsers /> : <Navigate to="/signin" />}
        ></Route>
      </Route>
      <Route path="*" element={<Navigate to="/signin" />}></Route>
    </Routes>
  );
}

export default App;
