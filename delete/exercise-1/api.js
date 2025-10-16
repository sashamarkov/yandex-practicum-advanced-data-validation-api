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

// API функция удаления пользователя
export async function deleteUser(userId) {
  const response = await fetch(`${BASE_URL}/users/${userId}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    throw new Error(`Ошибка удаления пользователя: ${response.status}`);
  }

  return response.json();
}