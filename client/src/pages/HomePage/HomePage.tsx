import { LifeCalendar, TodoList } from '@/components';
import { logoutUser } from '@/api/authApi';
import { useNavigate } from 'react-router-dom';
import { Container, Typography, Button, Box } from '@mui/material';
import { Paths } from '@/routes';

export const HomePage = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    logoutUser();
    navigate(Paths.LOGIN);
  };

  return (
    <Box display="flex">
      <Container maxWidth="lg" style={{ marginLeft: '240px', paddingTop: '20px' }}>
        {/* Основной контент страницы */}
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography variant="h4">Добро пожаловать в My Life Calendar!</Typography>
          <Button variant="contained" color="secondary" onClick={handleLogout}>
            Выйти
          </Button>
        </Box>

        <LifeCalendar />
        <TodoList />
      </Container>
    </Box>
  );
};
