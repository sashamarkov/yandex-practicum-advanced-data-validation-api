import { deleteUser } from "./api.js";
import { initializeApp, showError, updateUsersAfterDelete } from "./utils.js";

const refreshButton = document.querySelector("#refreshButton");

const deleteModal = document.querySelector("#deleteModal");
const closeModal = document.querySelector("#closeModal");
const cancelDelete = document.querySelector("#cancelDelete");
const confirmDelete = document.querySelector("#confirmDelete");
const userNameToDelete = document.querySelector("#userNameToDelete");

let userIdToDelete = null; // ID пользователя для удаления

// Функции модального окна
// Функции модального окна - нужно реализовать!
export function showDeleteModal(userId, userName) {
  // Сохранить ID пользователя для удаления
  userIdToDelete = userId;
  // Показать имя пользователя в модальном окне
  userNameToDelete.textContent = userName;
  // Открыть модальное окно
  deleteModal.classList.add("show");
}

function hideDeleteModal() {
  // Закрыть модальное окно
  deleteModal.classList.remove("show");
  // Сбросить ID пользователя для удаления
  userIdToDelete = null;
}

// Обработчик подтверждения удаления - нужно реализовать!
confirmDelete.addEventListener("click", async () => {
  // Проверить, что есть пользователь для удаления
  if(!userIdToDelete) {
    showError("Не выбран пользователь для удаления");
    return;
  }
  
  try{
      // Попробовать удалить пользователя через API
      await deleteUser(userIdToDelete);
      // В случае успеха - обновить список пользователей
      updateUsersAfterDelete(userIdToDelete);
      // Закрыть модальное окно
      hideDeleteModal();
  } catch(error) {
    // Обработать ошибки
    showError(`Ошибка при удалении пользователя: ${error.message}`);
  }
});

closeModal.addEventListener("click", hideDeleteModal);
cancelDelete.addEventListener("click", hideDeleteModal);

deleteModal.addEventListener("click", (event) => {
  if (event.target === deleteModal) {
    hideDeleteModal();
  }
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && deleteModal.classList.contains("show")) {
    hideDeleteModal();
  }
});

refreshButton.addEventListener("click", initializeApp);

initializeApp();