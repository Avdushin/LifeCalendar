import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { loginUser } from '@/api/authApi';
import { useNavigate } from 'react-router-dom';
import {
  TextField,
  Button,
  Container,
  Typography,
  Link,
  CircularProgress,
  Box,
  IconButton,
} from '@mui/material';
import { Brightness4, Brightness7 } from '@mui/icons-material';
import { toast } from 'react-toastify';
import { Paths } from '@/routes/paths';
import { useThemeContext } from '@/context/ThemeContext';

export const LoginPage = () => {
  const { register, handleSubmit } = useForm();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { toggleTheme, themeMode } = useThemeContext();

  const onSubmit = async (data: any) => {
    setLoading(true);
    try {
      await loginUser(data.email, data.password);
      toast.success('Успешная авторизация!');
      navigate(Paths.HOME);
    } catch {
      toast.error('Не удалось войти, попробуйте еще раз');
      setErrorMessage('Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      height="100vh"
      width="100vw"
    >
      <Container maxWidth="sm">
        <Box display="flex" justifyContent="flex-end" mb={2}>
          {/* Кнопка для переключения темы */}
          <IconButton onClick={toggleTheme} color="inherit">
            {themeMode === 'dark' ? <Brightness7 /> : <Brightness4 />}
          </IconButton>
        </Box>
        <Typography variant="h4" gutterBottom>
          Авторизация
        </Typography>
        <form onSubmit={handleSubmit(onSubmit)}>
          <TextField
            {...register('email')}
            label="Email"
            variant="outlined"
            fullWidth
            margin="normal"
            disabled={loading}
          />
          <TextField
            {...register('password')}
            label="Пароль"
            variant="outlined"
            type="password"
            fullWidth
            margin="normal"
            disabled={loading}
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            disabled={loading}
          >
            {loading ? <CircularProgress size={24} /> : 'Войти'}
          </Button>
          <Typography gap={20} mt={1}>
            Ещё нет аккаунта?{' '}
            <Link href={Paths.REGISTER} underline="hover">
              {'Зарегистрироваться!'}
            </Link>
          </Typography>
        </form>
        {errorMessage && <Typography color="error">{errorMessage}</Typography>}
      </Container>
    </Box>
  );
};
