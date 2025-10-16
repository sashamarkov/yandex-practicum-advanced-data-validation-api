import { fetchUsersPage } from "./api.js";
import {
  renderUsers,
  renderPaginationInfo,
  renderPagination,
  hideLoader,
  showLoader,
  showError,
} from "./utils.js";

const refreshButton = document.querySelector("#refreshButton");

const ITEMS_PER_PAGE = 6;
let currentPage = 1;
let totalPages = 1;
let totalUsers = 0;

// Функция загрузки страницы - нужно реализовать!
async function loadPage(page) {
  // Показать загрузчик
  showLoader();
  try{
    // Загрузить данные с сервера
    const response = await fetchUsersPage(page, ITEMS_PER_PAGE);
    // Обновить глобальные переменные (currentPage, totalPages, totalUsers)
    currentPage = response.pagination.currentPage;
    totalPages = response.pagination.totalPages;
    totalUsers = response.pagination.totalUsers;
    // Отрисовать пользователей
    renderUsers(response.data);
    // Отрисовать информацию о пагинации
    const paginationInfo = {
      startIndex: (currentPage - 1) * ITEMS_PER_PAGE + 1,
      endIndex: Math.min(currentPage * ITEMS_PER_PAGE, totalUsers),
      totalUsers: totalUsers
    };
    renderPaginationInfo(paginationInfo);
    // Отрисовать навигацию
    renderPagination(response.pagination, loadPage);
    // Скрыть загрузчик
    hideLoader();
  } catch(error) {
    // Обработать ошибки
    showError(`Ошибка при загрузке страницы: ${error.message}`);
  }
  
}

// Функция инициализации
async function initializeApp() {
  await loadPage(1);
}

refreshButton.addEventListener("click", () => {
  loadPage(currentPage);
});

initializeApp();