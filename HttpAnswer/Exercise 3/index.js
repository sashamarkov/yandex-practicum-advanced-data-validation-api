function prepareImgElement(container){
    const reader = new FileReader();
    reader.onloadend = function () {
        // Create image element
        const imgElement = document.createElement('img');
        // Set the src attribute to the base64 string
        imgElement.src = reader.result;
        // Append the image to the body or any other container
        container.appendChild(imgElement);
    };
    return reader;
}

document.addEventListener('DOMContentLoaded', async () => {
    let containerElem = document.querySelector(".container");
    let userId = Math.round(1_000_000 * Math.random());
    
    let avatarRes = await fetch(`https://webinars.webdev.education-services.ru/train/7/2/4/users/${userId}/avatar.png`); //запросите изображение по ссылке с параметром `https://webinars.webdev.education-services.ru/train/7/2/4/users/здесь должен быть id пользователя/avatar.png`)
    let avatarData = await avatarRes.blob(); //преобразуйте ответ в бинарный формат с помощью .blob()

    let reader = prepareImgElement(containerElem); //эти функции добавляют элемент img к странице и рисунок к img
    reader.readAsDataURL(avatarData);
})