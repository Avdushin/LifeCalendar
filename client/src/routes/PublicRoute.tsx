import { Navigate, Outlet } from 'react-router-dom';
import { getToken } from '@/api/authApi';
import { Paths } from './paths';

const PublicRoute = () => {
  const token = getToken();

  //? Если пользователь авторизован, перенаправляем его на главную страницу
  return token ? <Navigate to={Paths.HOME} /> : <Outlet />;
};

export default PublicRoute;
