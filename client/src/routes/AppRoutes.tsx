import { Routes, Route } from 'react-router-dom';
import {
  HomePage,
  LoginPage,
  RegisterPage,
  NotFoundPage,
  ProfilePage,
  TasksPage,
  SettingsPage,
  EditProfilePage,
} from '@/pages';
import PrivateRoute from './PrivateRoute';
import PublicRoute from './PublicRoute';
import { Paths } from '@/routes/paths';
import { Sidebar } from '@/components';

const AppRoutes = () => {
  return (
    <Routes>
      {/* Открытые маршруты для неавторизованных пользователей */}
      <Route element={<PublicRoute />}>
        <Route path={Paths.LOGIN} element={<LoginPage />} />
        <Route path={Paths.REGISTER} element={<RegisterPage />} />
      </Route>

      {/* Закрытые маршруты для авторизованных пользователей */}
      <Route element={<PrivateRoute />}>
        <Route
          path={Paths.HOME}
          element={
            <>
              <Sidebar />
              <HomePage />
            </>
          }
        />
        <Route
          path={Paths.PROFILE}
          element={
            <>
              <Sidebar />
              <ProfilePage />
            </>
          }
        />
        <Route
          path={Paths.EDIT_PROFILE}
          element={
            <>
              <Sidebar />
              <EditProfilePage />
            </>
          }
        />
        <Route
          path={Paths.TASKS}
          element={
            <>
              <Sidebar />
              <TasksPage />
            </>
          }
        />
        <Route
          path={Paths.SETTINGS}
          element={
            <>
              <Sidebar />
              <SettingsPage />
            </>
          }
        />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;
