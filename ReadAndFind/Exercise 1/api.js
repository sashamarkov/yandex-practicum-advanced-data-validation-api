// Настройки API
const BASE_URL = "https://webinars.webdev.education-services.ru/train/7-sprint";

// API функция для загрузки пользователей
export async function fetchUsers() {
  const response = await fetch(`${BASE_URL}/users`);

  if (!response.ok) {
    throw new Error(`Ошибка загрузки пользователей: ${response.status}`);
  }

  const result = await response.json();
  return result.data;
}