document.addEventListener("DOMContentLoaded", () => {
    let container = document.querySelector(".container")
    setInterval(async () => {
        let quoteRes = await fetch('https://webinars.webdev.education-services.ru/train/7/2/5/kanye'); // запросите данные с цитатой через промежуточный сервер 'https://webinars.webdev.education-services.ru/train/7/2/5/kanye'
        let quoteData = await quoteRes.json(); //ответ будет в формате json
        let quote = JSON.parse(quoteData.data); //особенность промежуточного сервера в том, что он формирует свой ответ со строкой JSON полученной от другого сервера
        container.textContent = quote.quote;//выведите исходную цитату
    }, 5 * 1000)
})