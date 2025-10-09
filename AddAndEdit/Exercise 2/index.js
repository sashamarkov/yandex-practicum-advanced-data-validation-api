import { updateTask, createTask } from "./api.js";
import {
  clearContainer,
  closeModalWindow,
  hideError,
  hideLoader,
  initializeDashboard,
  openModal,
  showError,
  showLoader,
} from "./utils.js";

const tasksList = document.querySelector("#tasksList");
const taskTemplate = document.querySelector("#taskTemplate");
const taskIdInput = document.querySelector("#taskId");

let loadedTasks = [];

export function renderTasks(tasks) {
  loadedTasks = tasks;
  clearContainer(tasksList);
  tasks.forEach((task) => {
    const taskElement = createTaskElement(task);
    tasksList.appendChild(taskElement);
  });
}

export function createTaskElement(taskData) {
  const taskElement = taskTemplate.content.cloneNode(true);
  const taskItem = taskElement.querySelector(".task-item");

  taskItem.setAttribute("data-task-id", taskData.id);

  taskItem.querySelector(".task-title").textContent = taskData.title;
  taskItem.querySelector(
    ".task-priority"
  ).textContent = `Приоритет: ${taskData.priority}`;
  taskItem.querySelector(".task-deadline").textContent = `Дедлайн: ${new Date(
    taskData.deadline
  ).toLocaleDateString()}`;

  // Добавление обработчика клика на задачу - нужно реализовать!
  // При клике должна открываться модалка для редактирования
  taskItem.addEventListener('click', (evt) => {
    const clickedTaskId = taskItem.getAttribute('data-task-id');
    const taskDataToChange = loadedTasks.find(({id}) => id === clickedTaskId);

    openEditModal(taskDataToChange);
  });

  return taskItem;
}

function replaceTaskInList(taskData) {
  const existingTaskElement = tasksList.querySelector(
    `[data-task-id="${taskData.id}"]`
  );

  if (existingTaskElement) {
    const newTaskElement = createTaskElement(taskData);
    existingTaskElement.replaceWith(newTaskElement);

    const taskIndex = loadedTasks.findIndex((t) => t.id == taskData.id);
    if (taskIndex !== -1) {
      loadedTasks[taskIndex] = taskData;

      taskIdInput.value = null;
    }
  }
}

function openCreateModal() {
  taskForm.reset();
  taskIdInput.value = "";
  modalTitle.textContent = "Добавить новую задачу";
  submitButton.textContent = "Создать задачу";
  openModal();
}

// Функция открытия модального окна для редактирования - нужно реализовать!
function openEditModal(task) {
  // Заполнить форму данными задачи
  document.getElementById('taskTitle').value = task.title;
  document.getElementById('taskText').value = task.text;
  document.getElementById('taskDeadline').value = task.deadline;
  document.getElementById('taskPriority').value = task.priority;
  document.getElementById('taskCategory').value = task.category;
  document.getElementById('taskStatus').value = task.status;

  // Изменить заголовок модального окна на "Редактировать задачу"
  document.getElementById('modalTitle').textContent = 'Редактировать задачу';

  // Изменить текст кнопки на "Сохранить изменения"
  document.getElementById('submitButton').textContent = 'Сохранить изменения';

  // Сохранить ID задачи в скрытое поле
  taskIdInput.value = task.id;

  // Открыть модальное окно
  openModal();
}

async function handleTaskSubmit(event) {
  event.preventDefault();

  showLoader();
  hideError();

  const formData = new FormData(taskForm);
  const taskData = {
    title: formData.get("title"),
    deadline: formData.get("deadline"),
    priority: formData.get("priority"),
    id: Number(formData.get("id")),
  };

  try {
    const taskId = Number(taskIdInput.value);

    if (taskId) {
      // Режим редактирования - нужно реализовать!
      // Вызвать updateTask с taskId и taskData
      await updateTask(taskId, taskData);

      // Найти существующий элемент в списке и заменить его
      replaceTaskInList(taskData);
      closeModalWindow();
    } else {
      // Режим создания
      const newTask = await createTask(taskData);
      loadedTasks.push(newTask.data);
      const newTaskElement = createTaskElement(newTask.data);
      tasksList.appendChild(newTaskElement);

      closeModalWindow();

      console.log("Задача успешно создана:", newTask);
    }
  } catch (err) {
    showError(err.message);
    console.error("Ошибка создания задачи:", err);
  } finally {
    hideLoader();
  }
}

refreshButton.addEventListener("click", initializeDashboard);
addTaskButton.addEventListener("click", openCreateModal);
closeModal.addEventListener("click", closeModalWindow);
cancelButton.addEventListener("click", closeModalWindow);
taskForm.addEventListener("submit", handleTaskSubmit);

modal.addEventListener("click", (event) => {
  if (event.target === modal) {
    closeModalWindow();
  }
});

document.addEventListener("DOMContentLoaded", initializeDashboard);