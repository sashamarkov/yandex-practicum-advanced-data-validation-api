document.addEventListener('DOMContentLoaded', async () => {
    document.getElementById('fioForm').addEventListener('submit', function(event) {
        event.preventDefault(); // Отключаем стандартную отправку формы

        const formData = new FormData(event.target);
        const params = new URLSearchParams();

        for (const [key, value] of formData) {
            //добавьте в params ключ и значение с формы
            params.append(key, value);
        }

        let url = 'https://webinars.webdev.education-services.ru/train/7/2/7/submit';
        url =  url + '?' + params.toString(); //присоединяем параметры к основной ссылке
        console.log(url);

        fetch(url)
            .then(response => response.json()) //получить ответный JSON
            .then(data => console.log(data)) //выводим его в консоль
            .catch(error => console.error('Error:', error)); //если что-то случилось, выводим ошибку
    })
})