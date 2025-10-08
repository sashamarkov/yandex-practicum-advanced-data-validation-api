const url = 'https://webinars.webdev.education-services.ru/train/7/2/3/count';

let countRes = await fetch(url);
let countValue = await countRes.text();
console.log(`GET result ${countValue}`);

countValue++; //увеличим счётчик для проверки

console.log(`POST update ${countValue}`);
let updateRes = await fetch(url, {
    method: 'POST' , //выполнить POST запрос
    body: countValue.toString() //с телом countValue
})
let updateValue = await updateRes.text();//прочесть тело ответа
console.log(`POST result ${updateValue}`);