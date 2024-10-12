import React from 'react';
import { Drawer, List, ListItem, ListItemText, ListItemIcon, IconButton, Divider, Typography } from '@mui/material';
import { Brightness4, Brightness7, AccountCircle, Settings, CalendarToday, Task } from '@mui/icons-material';
import { useThemeContext } from '@/context/ThemeContext';
import { useNavigate, useLocation } from 'react-router-dom';
import { Paths } from '@/routes/paths';

export const Sidebar = () => {
  const { toggleTheme, themeMode } = useThemeContext();
  const navigate = useNavigate();
  const location = useLocation();  // Получаем текущий путь для выделения активного элемента

  return (
    <Drawer variant="permanent" anchor="left">
      <Typography variant="h5" align="center" gutterBottom>
        Меню
      </Typography>
      <List>
        {/* Пункт "Главная" */}
        <ListItem
          button
          selected={location.pathname === Paths.HOME}
          onClick={() => navigate(Paths.HOME)}
        >
          <ListItemIcon>
            <CalendarToday />
          </ListItemIcon>
          <ListItemText primary="Главная" />
        </ListItem>

        {/* Пункт "Профиль" */}
        <ListItem
          button
          selected={location.pathname === Paths.PROFILE}
          onClick={() => navigate(Paths.PROFILE)}
        >
          <ListItemIcon>
            <AccountCircle />
          </ListItemIcon>
          <ListItemText primary="Профиль" />
        </ListItem>

        {/* Пункт "Задачи" */}
        <ListItem
          button
          selected={location.pathname === Paths.TASKS}
          onClick={() => navigate(Paths.TASKS)}
        >
          <ListItemIcon>
            <Task />
          </ListItemIcon>
          <ListItemText primary="Задачи" />
        </ListItem>

        {/* Пункт "Настройки" */}
        <ListItem
          button
          selected={location.pathname === Paths.SETTINGS}
          onClick={() => navigate(Paths.SETTINGS)}
        >
          <ListItemIcon>
            <Settings />
          </ListItemIcon>
          <ListItemText primary="Настройки" />
        </ListItem>
      </List>

      <Divider />

      {/* Переключение темы */}
      <List>
        <ListItem>
          <ListItemText primary="Тема приложения" />
          <IconButton onClick={toggleTheme} color="inherit">
            {themeMode === 'dark' ? <Brightness7 /> : <Brightness4 />}
          </IconButton>
        </ListItem>
      </List>
    </Drawer>
  );
};
