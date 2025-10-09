import { fetchUsers, fetchTasks, fetchNews } from "./api.js";

// DOM элементы
const loader = document.querySelector("#loader");
const error = document.querySelector("#error");
const usersList = document.querySelector("#usersList");
const tasksList = document.querySelector("#tasksList");
const newsList = document.querySelector("#newsList");
const modal = document.querySelector("#modal");
const taskForm = document.querySelector("#taskForm");

const userTemplate = document.querySelector("#userTemplate");
const taskTemplate = document.querySelector("#taskTemplate");
const newsTemplate = document.querySelector("#newsTemplate");

// Вспомогательная функция для очистки контейнера
function clearContainer(container) {
  container.replaceChildren();
}

// Рендер функции
export function renderUsers(users) {
  clearContainer(usersList);
  users.forEach((user) => {
    const userElement = userTemplate.content.cloneNode(true);

    userElement.querySelector(".user-name").textContent = user.name;
    userElement.querySelector(".user-email").textContent = user.email;

    usersList.appendChild(userElement);
  });
}

export function renderTasks(tasks) {
  clearContainer(tasksList);
  tasks.forEach((task) => {
    const taskElement = taskTemplate.content.cloneNode(true);

    taskElement.querySelector(".task-title").textContent = task.title;
    taskElement.querySelector(
      ".task-priority"
    ).textContent = `Приоритет: ${task.priority}`;
    taskElement.querySelector(
      ".task-deadline"
    ).textContent = `Дедлайн: ${new Date(task.deadline).toLocaleDateString()}`;

    tasksList.appendChild(taskElement);
  });
}

// Функция для добавления одной задачи в список
export function renderTask(formData) {
  const taskData = {
    title: formData.get("title"),
    deadline: formData.get("deadline"),
    priority: formData.get("priority"),
  };
  const taskElement = taskTemplate.content.cloneNode(true);

  taskElement.querySelector(".task-title").textContent = taskData.title;
  taskElement.querySelector(
    ".task-priority"
  ).textContent = `Приоритет: ${taskData.priority}`;
  taskElement.querySelector(
    ".task-deadline"
  ).textContent = `Дедлайн: ${new Date(
    taskData.deadline
  ).toLocaleDateString()}`;

  tasksList.appendChild(taskElement);
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

// Вспомогательные функции для UI
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

// Функции управления модальным окном
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

    // Пользователи
    if (results[0].status === "fulfilled") {
      renderUsers(results[0].value.data);
    } else {
      errors.push("Не удалось загрузить пользователей");
    }

    // Задачи
    if (results[1].status === "fulfilled") {
      renderTasks(results[1].value.data);
    } else {
      errors.push("Не удалось загрузить задачи");
    }

    // Новости
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