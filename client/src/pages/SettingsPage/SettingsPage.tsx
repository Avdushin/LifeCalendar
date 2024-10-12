import { Container, Typography, List, ListItem, ListItemText, IconButton, Divider } from '@mui/material';
import { Brightness4, Brightness7 } from '@mui/icons-material';
import { useThemeContext } from '@/context/ThemeContext';

export const SettingsPage = () => {
  const { toggleTheme, themeMode } = useThemeContext();

  return (
    <Container maxWidth="md" style={{ marginLeft: '240px'}}>
      <Typography variant="h4" gutterBottom>
        Настройки
      </Typography>
      <Divider />

      {/* Настройки темы */}
      <List>
        <ListItem>
          <ListItemText primary="Тема приложения" />
          <IconButton onClick={toggleTheme} color="inherit">
            {themeMode === 'dark' ? <Brightness7 /> : <Brightness4 />}
          </IconButton>
        </ListItem>
      </List>

      {/* Будущие настройки профиля */}
      <Divider />
      <Typography variant="h6" gutterBottom>
        Настройки профиля
      </Typography>
      <List>
        <ListItem>
          <ListItemText primary="Редактировать профиль" />
        </ListItem>
      </List>
    </Container>
  );
};
