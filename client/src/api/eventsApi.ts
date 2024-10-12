import { getToken } from './authApi';

const API_URL = import.meta.env.VITE_API_URL;

// Получение всех событий пользователя
export const getUserEvents = async () => {
  try {
    const token = getToken();
    const response = await fetch(`${API_URL}/events`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch events');
    }

    return await response.json();
  } catch (error) {
    console.error('Error fetching events:', error);
    throw error;
  }
};

// Добавление нового события
export const addEvent = async (year: number, week: number, description: string) => {
  try {
    const token = getToken();
    const response = await fetch(`${API_URL}/events`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify({ year, week, description }),
    });

    if (!response.ok) {
      throw new Error('Failed to add event');
    }

    return await response.json();
  } catch (error) {
    console.error('Error adding event:', error);
    throw error;
  }
};
