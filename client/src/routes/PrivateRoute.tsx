import { Navigate, Outlet } from 'react-router-dom';
import { getToken } from '@/api/authApi';
import { Paths } from '@/routes/paths';

const PrivateRoute = () => {
  const token = getToken();

  // Если токена нет, перенаправляем на страницу логина
  return token ? <Outlet /> : <Navigate to={Paths.LOGIN} />;
};

export default PrivateRoute;
