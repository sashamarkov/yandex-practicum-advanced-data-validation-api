function wait(timeoutMs) { //аргумент - количество миллисекунд
    return new Promise((rs, rj) => {setTimeout(rs, timeoutMs)}); //вернуть промис, запустить таймер, разрешить промис.
}

document.addEventListener('DOMContentLoaded', () => {
    for(let i = 0; i <= 10; i++){ //проверим вашу функцию разными значениями
        wait(i * 1000).then(() => console.log(`Прошло ${i * 1000} мсес.`));
    }
})