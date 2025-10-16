import { fetchUsers } from "./api.js";
import { showDeleteModal } from "./index.js";

// DOM элементы
const loader = document.querySelector("#loader");
const errorDiv = document.querySelector("#error");
const usersList = document.querySelector("#usersList");
const userTemplate = document.querySelector("#userTemplate");

// Глобальные переменные
let allUsers = [];

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
    const userCard = userElement.querySelector(".user-card");

    userCard.setAttribute("data-user-id", user.id);

    userElement.querySelector(".user-name").textContent = user.name;
    userElement.querySelector(".user-email").textContent = user.email;
    userElement.querySelector(".user-phone").textContent =
      user.phone || "Не указан";

    const deleteButton = userElement.querySelector(".delete-user-button");
    deleteButton.addEventListener("click", () => {
      showDeleteModal(user.id, user.name);
    });

    usersList.appendChild(userElement);
  });
}

// Функция удаления пользователя из списка
export function removeUserFromList(userId) {
  const userElement = usersList.querySelector(`[data-user-id="${userId}"]`);
  if (userElement) {
    userElement.remove();
  }

  // Обновляем локальный массив
  allUsers = allUsers.filter((user) => user.id !== userId);
}

// Функция инициализации (уже изученная в предыдущих уроках)
export async function initializeApp() {
  showLoader();

  try {
    const users = await fetchUsers();
    allUsers = users;
    renderUsers(allUsers);
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

// Функция обновления списка пользователей после удаления
export function updateUsersAfterDelete(deletedUserId) {
  allUsers = allUsers.filter((user) => user.id !== deletedUserId);
  renderUsers(allUsers);
}