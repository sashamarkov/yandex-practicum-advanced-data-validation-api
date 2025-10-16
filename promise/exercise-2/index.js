import { getCalcData, isPrime } from "./data.js";

const fpsElement = document.querySelector(".fps-panel")
const containerElement = document.querySelector('.container')

let lastDate;
let lastFps;

function showFpsAndCount(count) {
    if(!lastDate){
        lastDate = Date.now();
    }
    let thisDate = Date.now();
    let dt = Math.max(1, thisDate - lastDate);
    let thisFps = 1000 / dt;
    if(!lastFps || Math.abs(thisFps - lastFps) >= 1){
        lastFps = thisFps;
        fpsElement.textContent = `Primes count: ${count}; ${Math.round(lastFps)} FPS`
    }
    lastDate = thisDate;
}

function runComputation(start, stop){
    let count = 0;
    for(let n = start; n < stop; n++){
        if(isPrime(n)){
            count++
        }
    }
    return count;
}

function runComputationAsync(start, stop){
    return getCalcData(start, stop) // получаем числа от start до stop в промисе
        .then(numbers => numbers.filter(isPrime)) // фильтруем простые числа
        .then(primes => primes.length); // возвращаем количество простых чисел
}

let primeCount = 0;
let lastNum = 0;
let step = 500_000;

function runFrameWatcher(){
    runComputationAsync(lastNum, lastNum + step) // заменить на вызов runComputationAsync
        .then(count => {
            primeCount += count; // обработать в then
            lastNum += step; // обработать в then
            showFpsAndCount(primeCount); //обработать в then
            setTimeout(() => runFrameWatcher(), 1000 / 60) //обработать в then
        });
}

document.addEventListener('DOMContentLoaded', () => {
    runFrameWatcher()
})