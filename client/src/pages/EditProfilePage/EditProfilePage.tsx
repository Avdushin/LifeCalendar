import { useForm } from 'react-hook-form';
import { Container, TextField, Button, Typography, Box, Divider } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { Paths } from '@/routes/paths';

export const EditProfilePage = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const navigate = useNavigate();

  const onSubmit = (data: any) => {
    console.log('Данные профиля обновлены:', data);
    // Логика для обновления профиля через API
  };

  return (
    <Container maxWidth="md" style={{ marginLeft: '240px', paddingTop: '20px' }}>
      <Typography variant="h4" gutterBottom>
        Редактировать профиль
      </Typography>
      <Divider />
      <Box mt={4}>
        <form onSubmit={handleSubmit(onSubmit)}>
          {/* Username */}
          <TextField
            {...register('username', { required: 'Username обязателен' })}
            label="Username"
            variant="outlined"
            fullWidth
            margin="normal"
            error={!!errors.username}
            helperText={errors.username ? errors.username.message : ''}
          />
          
          {/* Email */}
          <TextField
            {...register('email', {
              required: 'Email обязателен',
              pattern: {
                value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                message: 'Неверный формат email',
              },
            })}
            label="Email"
            variant="outlined"
            fullWidth
            margin="normal"
            error={!!errors.email}
            helperText={errors.email ? errors.email.message : ''}
          />

          {/* Дата рождения */}
          <TextField
            {...register('birthdate')}
            label="Дата рождения"
            type="date"
            variant="outlined"
            fullWidth
            margin="normal"
            InputLabelProps={{
              shrink: true,
            }}
          />

          {/* Имя (опционально) */}
          <TextField
            {...register('firstName')}
            label="Имя"
            variant="outlined"
            fullWidth
            margin="normal"
          />

          {/* Фамилия (опционально) */}
          <TextField
            {...register('lastName')}
            label="Фамилия"
            variant="outlined"
            fullWidth
            margin="normal"
          />

          {/* Отчество (опционально) */}
          <TextField
            {...register('middleName')}
            label="Отчество"
            variant="outlined"
            fullWidth
            margin="normal"
          />

          <Box mt={2}>
            <Button type="submit" variant="contained" color="primary">
              Обновить профиль
            </Button>
          </Box>
        </form>
      </Box>

      <Box mt={4}>
        {/* Ссылка на изменение пароля */}
        <Button variant="outlined" color="secondary" onClick={() => navigate(Paths.PASSWORD_RESET)}>
          Изменить пароль
        </Button>
      </Box>
    </Container>
  );
};
