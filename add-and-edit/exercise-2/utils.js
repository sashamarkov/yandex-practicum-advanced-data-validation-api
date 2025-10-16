import { fetchNews, fetchTasks, fetchUsers } from "./api.js";
import { renderTasks } from "./index.js";

// DOM элементы
const loader = document.querySelector("#loader");
const error = document.querySelector("#error");
const usersList = document.querySelector("#usersList");
const newsList = document.querySelector("#newsList");
const modal = document.querySelector("#modal");
const taskForm = document.querySelector("#taskForm");

const userTemplate = document.querySelector("#userTemplate");
const newsTemplate = document.querySelector("#newsTemplate");

// Вспомогательная функция для очистки контейнера
export function clearContainer(container) {
  container.replaceChildren();
}

export function renderUsers(users) {
  clearContainer(usersList);
  users.forEach((user) => {
    const userElement = userTemplate.content.cloneNode(true);

    userElement.querySelector(".user-name").textContent = user.name;
    userElement.querySelector(".user-email").textContent = user.email;

    usersList.appendChild(userElement);
  });
}

export function renderNews(news) {
  clearContainer(newsList);
  news.forEach((item) => {
    const newsElement = newsTemplate.content.cloneNode(true);

    newsElement.querySelector(".news-title").textContent = item.title;
    newsElement.querySelector(".news-summary").textContent = item.summary;
    newsElement.querySelector(
      ".news-author"
    ).textContent = `Автор: ${item.author}`;

    newsList.appendChild(newsElement);
  });
}

export function showLoader() {
  loader.classList.add("visible");
}

export function hideLoader() {
  loader.classList.remove("visible");
}

export function showError(message) {
  error.textContent = message;
  error.classList.add("visible");
}

export function hideError() {
  error.classList.remove("visible");
}

export function openModal() {
  modal.classList.add("show");
}

export function closeModalWindow() {
  modal.classList.remove("show");
  taskForm.reset();
}

// Функция инициализации дашборда (уже изученная в предыдущем уроке)
export async function initializeDashboard() {
  showLoader();
  hideError();

  try {
    const results = await Promise.allSettled([
      fetchUsers(),
      fetchTasks(),
      fetchNews(),
    ]);

    const errors = [];

    if (results[0].status === "fulfilled") {
      renderUsers(results[0].value.data);
    } else {
      errors.push("Не удалось загрузить пользователей");
    }

    if (results[1].status === "fulfilled") {
      renderTasks(results[1].value.data);
    } else {
      errors.push("Не удалось загрузить задачи");
    }

    if (results[2].status === "fulfilled") {
      renderNews(results[2].value.data);
    } else {
      errors.push("Не удалось загрузить новости");
    }

    if (errors.length > 0) {
      showError(errors.join(", "));
    }

    console.log("Дашборд инициализирован успешно");
  } catch (err) {
    showError("Критическая ошибка при загрузке данных");
    console.error("Ошибка инициализации:", err);
  } finally {
    hideLoader();
  }
}