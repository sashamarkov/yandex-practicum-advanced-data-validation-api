const loader = document.querySelector("#loader");
const error = document.querySelector("#error");
const usersList = document.querySelector("#usersList");
const tasksList = document.querySelector("#tasksList");
const newsList = document.querySelector("#newsList");

const userTemplate = document.querySelector("#userTemplate");
const taskTemplate = document.querySelector("#taskTemplate");
const newsTemplate = document.querySelector("#newsTemplate");

// Вспомогательная функция для очистки контейнера
function clearContainer(container) {
  container.replaceChildren();
}

// Рендер функции (уже готовые)
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