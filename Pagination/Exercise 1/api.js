// Настройки API
const BASE_URL = "https://webinars.webdev.education-services.ru/train/7-sprint";

// Функция для загрузки страницы пользователей с пагинацией
export async function fetchUsersPage(page, limit = 6) {
  const response = await fetch(
    `${BASE_URL}/users/pagination?limit=${limit}&page=${page}`
  );

  if (!response.ok) {
    throw new Error(`Ошибка загрузки пользователей: ${response.status}`);
  }

  const result = await response.json();
  return result;
}