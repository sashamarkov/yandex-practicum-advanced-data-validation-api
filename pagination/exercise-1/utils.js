const loader = document.querySelector("#loader");
const errorDiv = document.querySelector("#error");
const usersList = document.querySelector("#usersList");
const pagination = document.querySelector("#pagination");
const usersCount = document.querySelector("#usersCount");

const userTemplate = document.querySelector("#userTemplate");

// Вспомогательные функции
export function showLoader() {
  loader.style.display = "block";
  errorDiv.style.display = "none";
  pagination.classList.add("loading");
}

export function hideLoader() {
  loader.style.display = "none";
  pagination.classList.remove("loading");
}

export function showError(message) {
  errorDiv.textContent = message;
  errorDiv.style.display = "block";
  hideLoader();
}

function clearUsersList() {
  usersList.replaceChildren();
}

function formatDate(dateString) {
  const date = new Date(dateString);
  return date.toLocaleDateString("ru-RU", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

// Функция отрисовки пользователей
export function renderUsers(users) {
  clearUsersList();

  users.forEach((user) => {
    const userElement = userTemplate.content.cloneNode(true);

    userElement.querySelector(".user-name").textContent = user.name;
    userElement.querySelector(".user-email").textContent = user.email;
    userElement.querySelector(
      ".user-date"
    ).textContent = `Регистрация: ${formatDate(user.createdAt)}`;

    usersList.appendChild(userElement);
  });
}

// Функция отрисовки информации о пагинации
export function renderPaginationInfo(paginationData) {
  const { startIndex, endIndex, totalUsers } = paginationData;
  usersCount.textContent = `Показано ${startIndex}-${endIndex} из ${totalUsers} пользователей`;
}

// Функция отрисовки навигации по страницам
export function renderPagination(paginationData, loadPage) {
  pagination.replaceChildren();

  const {
    currentPage,
    totalPages,
    hasPrevPage,
    hasNextPage,
    prevPage,
    nextPage,
  } = paginationData;

  // Кнопка "Предыдущая"
  const prevButton = document.createElement("button");
  prevButton.textContent = "←";
  prevButton.className = "nav-button";
  prevButton.disabled = !hasPrevPage;
  if (hasPrevPage) {
    prevButton.addEventListener("click", () => loadPage(prevPage));
  }
  pagination.appendChild(prevButton);

  // Кнопки с номерами страниц
  for (let i = 1; i <= totalPages; i++) {
    const pageButton = document.createElement("button");
    pageButton.textContent = i;

    if (i === currentPage) {
      pageButton.className = "active";
    }

    pageButton.addEventListener("click", () => {
      if (i !== currentPage) {
        loadPage(i);
      }
    });

    pagination.appendChild(pageButton);
  }

  // Кнопка "Следующая"
  const nextButton = document.createElement("button");
  nextButton.textContent = "→";
  nextButton.className = "nav-button";
  nextButton.title = hasNextPage ? "Следующая страница" : "Последняя страница";
  nextButton.disabled = !hasNextPage;
  if (hasNextPage) {
    nextButton.addEventListener("click", () => loadPage(nextPage));
  }
  pagination.appendChild(nextButton);
}