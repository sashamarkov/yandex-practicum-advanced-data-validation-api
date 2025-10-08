let quoteRes = await fetch('https://api.kanye.rest'); // запросите очередную цитату с ресурса 'https://api.kanye.rest'

let quoteData = await quoteRes.text(); // прочитайте полученные данные с помощью функции .text(), потому что Канье - мастер текстов

let quoteObj = JSON.parse(quoteData); //превратите json-строку в объект

console.log(`${quoteObj.quote}`); //здесь мы выводим цитату в консоль, формат объекта должен совпадать

localStorage.setItem("ye!", JSON.stringify(quoteObj)); //цитата настолько хороша, что мы сохраним её навсегда в вашем браузере, только нужно сохранить её обратно в текстовый вид