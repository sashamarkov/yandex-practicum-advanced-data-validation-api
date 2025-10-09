import { fetchUsers } from "./api.js";

// DOM элементы
const loader = document.querySelector("#loader");
const errorDiv = document.querySelector("#error");
const usersList = document.querySelector("#usersList");
const searchInput = document.querySelector("#searchInput");

const userTemplate = document.querySelector("#userTemplate");

// Глобальные переменные
let allUsers = []; // Хранилище всех загруженных пользователей

// Вспомогательные функции
export function showLoader() {
  loader.style.display = "block";
  errorDiv.style.display = "none";
}

export function hideLoader() {
  loader.style.display = "none";
}

export function showError(message) {
  errorDiv.textContent = message;
  errorDiv.style.display = "block";
  hideLoader();
}

function clearUsersList() {
  usersList.replaceChildren();
}

// Функция отрисовки пользователей
export function renderUsers(users) {
  clearUsersList();

  users.forEach((user) => {
    const userElement = userTemplate.content.cloneNode(true);

    userElement.querySelector(".user-name").textContent = user.name;
    userElement.querySelector(".user-email").textContent = user.email;
    userElement.querySelector(".user-phone").textContent =
      user.phone || "Не указан";

    usersList.appendChild(userElement);
  });
}

// Функция инициализации (уже изученная в предыдущих уроках)
export async function initializeApp() {
  showLoader();

  try {
    const users = await fetchUsers();
    allUsers = users;
    renderUsers(allUsers);

    searchInput.value = "";

    hideLoader();
  } catch (error) {
    showError(`Ошибка при загрузке пользователей: ${error.message}`);
    console.error("Ошибка инициализации:", error);
  }
}

// Геттер для получения всех пользователей
export function getAllUsers() {
  return allUsers;
}