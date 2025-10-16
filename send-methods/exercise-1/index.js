document.addEventListener('DOMContentLoaded', async () => {
    let fileToSend = document.querySelector("#file-to-send")
    document.querySelector("#send-button").onclick = () => fileToSend.click();

    fileToSend.onchange = async (event) => {
        let files = event.target.files
        if(files.length == 0){
            return;
        }
        let formData = new FormData(); //новая форма для отправки
        formData.append('comment', 'Send some files'); //добавим комментарий к файлу на форме
        formData.append('file', files[0]); //добавим файл к форме
        try {
            let sendRes = await fetch('https://webinars.webdev.education-services.ru/train/7/2/7/upload', {
                method: 'POST', //примените нужный метод для отправки файла
                body: formData // задайте поле для отправки
            })
            if(sendRes.ok){
                alert("Файл отправлен")
            }
        } catch (e) {
            console.error("Ошибка загрузки файла", e)
        }
    }
})