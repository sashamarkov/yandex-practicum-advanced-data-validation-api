let field = [
    [' ', ' ', ' ', ' ', ' ', ],
    [' ', ' ', ' ', ' ', ' ', ],
    [' ', ' ', ' ', ' ', ' ', ],
    [' ', ' ', ' ', ' ', ' ', ],
    [' ', ' ', ' ', ' ', ' ', ],
];

let lines = document.querySelectorAll(".line")

function drawField() {
    lines.forEach((line, index) => {
        let row = field[index]
        line.textContent = row.join("\t")
    })
    requestAnimationFrame(() => drawField())
}

let chars = ['0️⃣','1️⃣','2️⃣','3️⃣','4️⃣','5️⃣','6️⃣','7️⃣','8️⃣','9️⃣','🅰','🅱','🅲','🅳','🅴','🅵',
    '🅶','🅷','🅸','🅹','🅺','🅻','🅼','🅽','🅾','🅿','🆀','🆁','🆂','🆃','🆄','🆅','🆆','🆇','🆈','🆉']

function putRandomDot(){
    return new Promise((resolve, reject) => {
        let rowIdx = Math.round((field.length - 1) * Math.random());
        let colIdx = Math.round((field[rowIdx].length - 1) * Math.random());
        let charIdx = Math.round((chars.length - 1) * Math.random())
        setTimeout(() => {
            let oldChar = field[rowIdx][colIdx]
            let newChar = chars[charIdx];
            if(oldChar == " "){
                field[rowIdx][colIdx] = newChar
                resolve({newChar, rowIdx, colIdx})
            } else if (oldChar == newChar) {
                resolve({newChar, rowIdx, colIdx})
            } else {
                reject({err: `${rowIdx}:${colIdx} already taken`})
            }
        }, Math.random() * 5000)
    })
}

document.addEventListener("DOMContentLoaded", () => {
    let dotPromises = [];
    for(let i = 0; i < 128; i++){
        dotPromises.push(putRandomDot());
    }
    Promise.allSettled(dotPromises).then(dotResult => {
        let dotRejected = dotResult.filter(dot => dot.status === 'rejected');
        let dotResolved = dotResult.filter(dot => dot.status === 'fulfilled').map(dot => dot.value.newChar);

        console.log(`resolved ${dotResolved.length}, rejected ${dotRejected.length}`)
        console.log(`secret code: ${dotResolved.join('')}`)
    })
    
    drawField();
})