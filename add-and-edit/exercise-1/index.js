import { createTask } from "./api.js";
import {
  renderTask,
  showLoader,
  hideLoader,
  showError,
  hideError,
  openModal,
  closeModalWindow,
  initializeDashboard,
} from "./utils.js";

const refreshButton = document.querySelector("#refreshButton");
const addTaskButton = document.querySelector("#addTaskButton");
const closeModal = document.querySelector("#closeModal");
const cancelButton = document.querySelector("#cancelButton");
const taskForm = document.querySelector("#taskForm");
const modal = document.querySelector("#modal");

// Обработчик отправки формы - нужно реализовать!
async function handleTaskSubmit(event) {
  // Предотвратить стандартное поведение формы
  event.preventDefault();
  // Показать индикатор загрузки
  showLoader();
  // Скрыть ошибки
  hideError();
  const formData = new FormData(taskForm);

  try {
    // Создать задачу через API, передав formData
    const newTask = await createTask(formData);
    // Добавить новую задачу в список, передав formData
    renderTask(formData);
    // Закрыть модальное окно
    closeModalWindow();
    taskForm.reset();
    console.log("Задача успешно создана");
  } catch (err) {
    // Показать ошибку
    showError(err.message || "Ошибка при создании задачи");
    console.error("Ошибка создания задачи:", err);
  } finally {
    // Скрыть индикатор загрузки
    hideLoader();
  }
}

refreshButton.addEventListener("click", initializeDashboard);
addTaskButton.addEventListener("click", openModal);
closeModal.addEventListener("click", closeModalWindow);
cancelButton.addEventListener("click", closeModalWindow);
taskForm.addEventListener("submit", handleTaskSubmit);

// Закрытие модального окна по клику на фон
modal.addEventListener("click", (event) => {
  if (event.target === modal) {
    closeModalWindow();
  }
});

document.addEventListener("DOMContentLoaded", initializeDashboard);