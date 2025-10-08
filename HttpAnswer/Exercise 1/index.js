document.addEventListener('DOMContentLoaded', async () => {
    let textElem = document.querySelector(".text-place");
    let textData = await fetch("https://webinars.webdev.education-services.ru/train/7/2/4/lorem"); //запрос генератора текстов
    textElem.textContent = await textData.text(); //вывести текст для пользователя
})