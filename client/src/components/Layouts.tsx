import { useAuth } from '../contexts/authContext';
import NavBar from './NavBar';
import HomePageNavBar from './HomePageNavBar';
import { Outlet } from 'react-router-dom';

const Layout = () => {
  const { user } = useAuth();

  return (
    <>
      {user ? <HomePageNavBar /> : <NavBar />}
      <Outlet />
    </>
  );
};

export default Layout;
