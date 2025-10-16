const container = document.querySelector(".container")

async function addDiv(x, y) {
    if(container.childNodes.length > 128){
        throw "too many cats";
    }
    const newDiv = document.createElement('div');
    newDiv.classList.add('inner-div');

    newDiv.style.left = `${x}px`;
    newDiv.style.top = `${y}px`;

    return newDiv;
}

container.onclick = async (ev) => {
    try {
        const divElem = await addDiv(ev.x, ev.y);
        divElem.textContent = "🐱";
        divElem.setAttribute("dx", (10 * Math.random() - 5));
        divElem.setAttribute("dy", (10 * Math.random() - 5));
        container.appendChild(divElem);
    } catch (err) {
        console.error("cant add cat", err);
    }
}

async function calculateNodePosition(node, dt, containerRect) {
    let dx = parseFloat(node.getAttribute('dx'));
    let dy = parseFloat(node.getAttribute('dy'));
    node.style.left = `${parseFloat(node.style.left) + 10 * (dx * dt / 1000)}px`;
    node.style.top = `${parseFloat(node.style.top) + 10 * (dy * dt / 1000)}px`;

    let nodeRect = node.getBoundingClientRect();
    if(nodeRect.left > containerRect.right 
        || nodeRect.right < containerRect.left
        || nodeRect.bottom < containerRect.top
        || nodeRect.top > containerRect.bottom) {
        throw {err: "cat run away", node};
    }
    
    return {node};
}

async function drawFrame(prevDate){
    let now = Date.now();
    let dt = Math.max(1, now - prevDate);
    let containerRect = container.getBoundingClientRect();
    
    let calcPromises = [];
    
    for (let node of container.childNodes) {
        if(node instanceof Element && node.classList.contains("inner-div")){
            calcPromises.push(calculateNodePosition(node, dt, containerRect));
        }
    }
    
    try {
        const results = await Promise.allSettled(calcPromises);
        for (let nodeRes of results) {
            if (nodeRes.status === 'rejected') {
                container.removeChild(nodeRes.reason.node);
            }
        }
    } catch (err) {
        console.error("Error in drawFrame:", err);
    }
    
    requestAnimationFrame(() => drawFrame(now));
}

document.addEventListener('DOMContentLoaded', () => {
    drawFrame(Date.now());
});