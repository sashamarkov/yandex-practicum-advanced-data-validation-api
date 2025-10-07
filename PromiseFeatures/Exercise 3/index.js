let callLines = []
document.querySelectorAll(".line").forEach(elem => callLines.push(elem))
let resultLine = document.querySelector(".result")

function getCandidates(count){
    let ret = [];
    for(let i = 0; i < count; i++){
        let phone = "+7"
        for (let n = 0; n < 10; n++) {
            phone += Math.round(9 * Math.random()).toString()
        }
        ret.push(phone)
    }
    return ret
}

document.addEventListener('DOMContentLoaded', () => {
    
    let doCall = (callLine, candidate) => new Promise((resolve, reject) => {
        callLine.textContent = candidate
        let delayTimer = setTimeout(() => {
            clearTimeout(callTimer)
            callLine.textContent += "❌"
            setTimeout(() => reject(), 1000)
        }, 5 * 1000)

        let callTimer = setTimeout(() => {
            clearTimeout(delayTimer)
            let answer = Math.random();
            let decline = Math.random();
            if(answer > decline) {
                callLine.textContent += "✔"
                setTimeout(() => resolve(candidate), 1000)
            } else {
                callLine.textContent += "❌"
                setTimeout(() => reject(), 1000)
            }
        }, 10 * 1000 * Math.random())
    })

    let doCalls = (candidates) => new Promise((resolve, reject) => {
        
        callLines.forEach(callLine => callLine.textContent = "")

        if(candidates.length == 0){
            resultLine.textContent = "Никто не победил...";
            reject(); //верните неудачный результат главного промиса
        } else if (candidates.length == 1){
            resultLine.textContent = `Победитель ${candidates[0]}`;
            resolve(candidates[0]); //верните номер победителя в главный промис
        } else {
            let callPromises = callLines.map(callLine => {
                let nextCandidate = candidates.shift(); //достаньте первый номер из списка, список сократится
                if(nextCandidate && candidates.length > 0){ //номера ещё остались
                    return doCall(callLine, nextCandidate); // сделайте вызов 
                } else if (nextCandidate && candidates.length == 0){ // победитель
                    return Promise.resolve(nextCandidate); //сразу верните выполненный промис
                } else {
                    return Promise.reject(); //сразу верните отменённый промис
                }
            })
            Promise.any(callPromises).then(candidate => { //здесь надо дождаться первого кто ответит (то есть выполнит промис)
                candidates.push(candidate);
            }).catch(() => {
                console.log("no candidates now");
            })
            Promise.allSettled(callPromises).then(() => { //а здесь надо дождаться выполнения  всех промисов
                doCalls(candidates).then(resolve, reject); //это способ продолжить выполнение главного промиса в следующей итерации
            })
        }
    })
    
    doCalls(getCandidates(16))
})