import { fetchUsers, fetchTasks, fetchNews } from "./api.js";
import {
  renderUsers,
  renderTasks,
  renderNews,
  showLoader,
  hideLoader,
  showError,
  hideError,
} from "./utils.js";

const refreshButton = document.querySelector("#refreshButton");

// Функция инициализации дашборда - нужно реализовать!
async function initializeDashboard() {
  // Показать индикатор загрузки
  showLoader();
  // Скрыть ошибки
  hideError();
  try {
    // Загрузить все данные параллельно с помощью Promise.allSettled()
    // Вызвать соответствующие рендер-функции для полученных данных (лежат в res.value.data)
    const results = await Promise.allSettled([fetchUsers(), fetchTasks(), fetchNews()]);
    results.forEach((result, index) => {
      if(result.status === 'fulfilled') {
        const data = result.value.data;
        switch(index) {
          case 0:
            renderUsers(data);
            break;
          case 1:
            renderTasks(data);
            break;
          case 2:
            renderNews(data);
            break;
        }
        console.log("Дашборд инициализирован успешно");
      } else{
        const sourceNames =  ['пользователей', 'задач', 'уведомлений'];
        console.error(`Ошибка загрузки ${sourceNames[index]}:`, result.reason);
        showError(`Ошибка загрузки ${sourceNames[index]}:`, result.reason);
      }
    })
  } catch (err) {
    // Показать ошибку пользователю
    showError("Произошла ошибка при загрузке данных");
    console.error("Ошибка инициализации:", err);
  } finally {
    // Скрыть индикатор загрузки
    hideLoader();
  }
}

refreshButton.addEventListener("click", initializeDashboard);
document.addEventListener("DOMContentLoaded", initializeDashboard);