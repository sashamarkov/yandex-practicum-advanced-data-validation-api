const maxSteps = 102;

function startRunning(elem, speed){
    return new Promise((resolve, reject) => {
        let startTime = Date.now();

        let doStep = (step) => {
            if(step <= maxSteps){
                if(step == Math.round(maxSteps / 2)){ //второе дыхание
                    speed = Math.max(0.1, Math.min(1.0, speed + (Math.random() - 0.5)))
                }
                setTimeout(() => doStep(step + 1), speed * 500)
            } else {
                let endTime = Date.now();
                resolve(endTime - startTime);
            }
            elem.textContent = " " + elem.textContent;
        }

        doStep(0)
    })
}

document.addEventListener('DOMContentLoaded', () => {
    
    let runItems = [];

    document.querySelectorAll(".line").forEach(lineElem => {
        let lineSpeed = Math.max(0.1, Math.random());
        let runPromise = startRunning(lineElem, lineSpeed)
            .then(deltaTime => {
                lineElem.textContent += ` успел за ${deltaTime / 1000} сек.`
                return {lineElem, deltaTime}
            });
        runItems.push(runPromise);
    })

    Promise.all(runItems).then(runs => {
        let sortedRuns = runs.toSorted((a, b) => a.deltaTime - b.deltaTime);
        sortedRuns[0].lineElem.textContent += " 🥇 Первое место!"
        sortedRuns[1].lineElem.textContent += " 🥈 Второе место!"
        sortedRuns[2].lineElem.textContent += " 🥉 Третье место!"
    })
})