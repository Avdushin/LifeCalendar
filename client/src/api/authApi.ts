const API_URL = import.meta.env.VITE_API_URL;

// Сохранение токена в localStorage
const saveToken = (token: string) => {
  localStorage.setItem('token', token);
};

// Получение токена из localStorage
export const getToken = () => {
  return localStorage.getItem('token');
};

// Функция для регистрации пользователя
export const registerUser = async (email: string, password: string) => {
  try {
    const response = await fetch(`${API_URL}/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
      throw new Error('Registration failed');
    }

    const data = await response.json();
    saveToken(data.token);
    return data;
  } catch (error) {
    console.error('Error during registration:', error);
    throw error;
  }
};

// Функция для авторизации пользователя
export const loginUser = async (email: string, password: string) => {
  try {
    const response = await fetch(`${API_URL}/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
      throw new Error('Login failed');
    }

    const data = await response.json();
    saveToken(data.token);
    return data;
  } catch (error) {
    console.error('Error during login:', error);
    throw error;
  }
};

// Функция для выхода пользователя
export const logoutUser = () => {
  localStorage.removeItem('token');
};
