document.addEventListener("DOMContentLoaded", () => {
    let container = document.querySelector(".container-quote")
    let thumbUp = document.querySelector(".thumb-up")
    let thumbDown = document.querySelector(".thumb-down")

    let sendThumb = async (quote, reaction) => {
        let reactRes = await fetch('https://webinars.webdev.education-services.ru/train/7/2/5/kanye', {
            method: 'POST' , //используйте метод для отправки данных
            headers: {
                'Content-Type': 'application/json' //используйте тип MIME, соответствующий формату JSON
            },
            body: JSON.stringify({ quote, reaction }) //отправьте объект с оценкой
        })
        console.dir(await reactRes.json()); //выводим результат, в нём сервер подтвердит оценку
    }

    thumbUp.onclick = async () => await sendThumb(container.textContent, 1)
    thumbDown.onclick = async () => await sendThumb(container.textContent, -1)

    setInterval(async () => {
        let quoteRes = await fetch('https://webinars.webdev.education-services.ru/train/7/2/5/kanye');
        let quoteData = await quoteRes.json();
        let quote = JSON.parse(quoteData.data)
        container.textContent = quote.quote
    }, 5 * 1000)
})