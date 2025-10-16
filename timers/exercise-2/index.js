const movingDiv = document.querySelector('.moving-div');
const standingDiv = document.querySelector('.standing-div');
const container = document.querySelector('.container');
const containerWidth = 590; //всего пикселей по ширине
const containerHeight = 590; //всего пикселей по высоте
const amplitude = 295; //амплитуда волны
const frequency = 0.01;
const dx = containerWidth / (24 * 60); //количество пикселей в минуте
const y0 = - containerHeight / 2 // позиция для начала суток, снизу слева

let x; 

function animateMinute() {
    const y = containerHeight / 2 + amplitude * Math.sin(Math.PI / 2 + frequency * x);
    
    movingDiv.style.left = `${x}px`;
    movingDiv.style.top = `${y}px`;

    x += dx;

    if (x >= containerWidth) {
        x = 0;
    }
}

let m = 0;
let moons = ['🌑', '🌘', '🌗', '🌖', '🌕', '🌔', '🌓', '🌒'];

function animateSecond() {
    standingDiv.style.left = `${containerWidth / 2}px`
    standingDiv.style.top = `${containerHeight / 2}px`

    standingDiv.textContent = moons[m]

    m++;

    if(m >= moons.length){
        m = 0;
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const now = new Date();
    const hours = now.getHours();
    const minutes = now.getMinutes();
    
    x = dx * (hours * 60 + minutes) //выставляем x в соответствие текущему времени исходя из количества минут

    animateMinute(); //первый кадр сразу расставляет индикаторы по местам
    //запустите минутную анимацию animateMinute() с помощью интервала в 60 секунд (реальное время) или быстрее
    setInterval(animateMinute, 60 * 1000);

    animateSecond(); //первый кадр сразу расставляет индикаторы по местам
    //запустите секундную анимацию animateSecond() с помощью интервала в одну секунду или быстрее
    setInterval(animateSecond, 1000);
})