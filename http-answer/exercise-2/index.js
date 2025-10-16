document.addEventListener('DOMContentLoaded', async () => {
    let usersElem = document.querySelector('.json-place');
    let userRes = await fetch("https://webinars.webdev.education-services.ru/train/7/2/4/users"); //получить данные о пользователях по ссылке "https://webinars.webdev.education-services.ru/train/7/2/4/users"

    let userNames = Array.from(await userRes.json()) //преобразование в json
        .map(user => `${user.username} <${user.email}>`) //выбрать только данные username <email>
        .join("\n")
    usersElem.textContent = userNames;
})