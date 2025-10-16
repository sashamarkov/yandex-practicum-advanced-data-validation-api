// Настройки API
const BASE_URL = "https://webinars.webdev.education-services.ru/train/7-sprint";

export async function fetchUsers() {
  const response = await fetch(`${BASE_URL}/users`);

  if (!response.ok) {
    throw new Error(`Ошибка загрузки пользователей: ${response.status}`);
  }

  return await response.json();
}

export async function fetchTasks() {
  const response = await fetch(`${BASE_URL}/tasks`);

  if (!response.ok) {
    throw new Error(`Ошибка загрузки задач: ${response.status}`);
  }

  return await response.json();
}

export async function fetchNews() {
  const response = await fetch(`${BASE_URL}/news`);

  if (!response.ok) {
    throw new Error(`Ошибка загрузки новостей: ${response.status}`);
  }

  return await response.json();
}