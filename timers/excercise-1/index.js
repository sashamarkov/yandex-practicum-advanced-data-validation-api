let brick = document.querySelector("#brick");
let msg = document.querySelector("#message")

let startTime;
let stopTimer;
let gameTimer; 

function doneInTime(){
    if (brick.classList.contains('brick-true')) { //верный цвет
        let endTime = Date.now();
        msg.textContent = `Отлично! Время реакции: ${endTime - startTime} мсек. Нажмите, чтобы начать заново.`
    } else if (brick.classList.contains('brick-false')) { //неверный цвет
        msg.textContent = `Ошибка! Красный цвет! Нажмите, чтобы начать заново.`
    } else { //фальстарт
        msg.textContent = 'Ошибка! Слишком рано! Нажмите, чтобы начать заново.'
        //остановить gameTimer
        clearTimeout(gameTimer);
        //остановить stopTimer
        clearTimeout(stopTimer);
    }
}

export function clickOnBrick(){
    if(brick.classList.contains('brick-done')){ //рестарт
        initializeGame()
        return
    }
    //остановить stopTimer
    brick.classList.add('brick-done');
    doneInTime()
}

function doneTooLate() {
    if(!brick.classList.contains('brick-done')){
        brick.classList.add('brick-done');
        if(brick.classList.contains('brick-false')){
            msg.textContent = 'Отлично! Вас не проведёшь! Нажмите, чтобы начать заново.'
        } else if (brick.classList.contains('brick-true')) {
            msg.textContent = 'Вы не успели! Нажмите, чтобы начать заново.'
        }
    }
}

function startGame() {
    let ok = Math.random() > 0.5;
    let nextClass = `brick-${ok}`
    
    brick.classList.add(nextClass);
    startTime = Date.now();
}

export function initializeGame(){
    brick.classList.remove('brick-true');
    brick.classList.remove('brick-false');
    brick.classList.remove('brick-done');
    msg.textContent = ''
    startTime = null;
    
     // Очищаем предыдущие таймеры
    clearTimeout(gameTimer);
    clearTimeout(stopTimer);

    //запустить игровую функцию startGame() по таймеру, с произвольной задержкой до 1 секунды
    let gameDelay = Math.random() * 1000;
    gameTimer = setTimeout(startGame, gameDelay);

    //запустить функцию принудительного прерывания doneTooLate() с ощутимой задержкой от 5 до 10 секунд.
    let stopDelay = 5000 + Math.random() * 1000;
    stopTimer = setTimeout(doneTooLate, stopDelay)

    console.log('ready to play!');
}

brick.addEventListener('mousedown', clickOnBrick)
document.addEventListener('DOMContentLoaded', initializeGame);