const orderLine = document.querySelector(".order")
const cookLine = document.querySelector(".cook")
const deliveryLine = document.querySelector(".delivery")
const eatLine = document.querySelector(".eat")

const food = ['🍕','🍔','🍟','🌭','🥪','🌮','🍖','🍗','🥩','🍩','🥛','🥤','☕']

let orderList = []
let cookList = []
let deliveryList = []
let eatList = []

let orderId = 0;

function addOrder() {
    let nextFood = food[Math.round((food.length - 1) * Math.random())]
    let nextOrderId = ++orderId;
    let readyAfter = Math.round(Date.now() + (5000 * Math.random()))
    orderList.push({food: nextFood, orderId: nextOrderId, readyAfter})
}

function drawLines() {
    let lines = [
        [orderLine, orderList], 
        [cookLine, cookList], 
        [deliveryLine, deliveryList], 
        [eatLine, eatList]
    ]
    lines.forEach(([line, list]) => {
        line.textContent = list.map(it => it.food).join(" ")
    })
    requestAnimationFrame(() => drawLines())
}

document.addEventListener("DOMContentLoaded", () => {
    document.querySelector(".order-line").addEventListener('click', () => addOrder())

    let checkList = (list, nextList) => new Promise((resolve, reject) => {
        let now = Date.now();
        let orderReady = list.find(order => order.readyAfter <= now)
        if(orderReady){
            resolve([orderReady, list, nextList]) //выполните промис с успешным результатом
        } else {
            reject() //промис неуспешный
        }
    })

    let checkLists = () => {
        Promise.any([ //нужна подходящая функция, чтобы выбрать заказ из любой очереди
            checkList(orderList, cookList),
            checkList(cookList, deliveryList),
            checkList(deliveryList, eatList),
            checkList(eatList)
        ]).then(([order, list, nextList]) => {
            if(order){
                let orderPos = list.findIndex(it => it.orderId == order.orderId)
                list.splice(orderPos, 1)
                if(nextList){
                    nextList.push(order)
                    order.readyAfter = Date.now() + (5000 * Math.random())
                }
            }
            setTimeout(() => checkLists(), 333)
        }).catch(() => setTimeout(() => checkLists(), 666))
    }

    let checkOrders = () => {
        let alertTimer
        let checkTimer
        //здесь таймеры соревнуются друг с другом, если одно из условий выполняется, то один из таймеров отменяет другой
        let alertPromise = new Promise((resolve) => {
            alertTimer = setTimeout(() => {
                alert("Свободная касса!")
                clearTimeout(checkTimer)
                resolve()
            }, 10 * 1000)
        })
        let checkPromise = new Promise((resolve) => {
            let checkFn = () => {
                if(orderList.length > 0){
                    clearTimeout(alertTimer)
                    resolve()
                } else {
                    checkTimer = setTimeout(() => checkFn(), 500)
                }
            }
            checkFn()
        })
        Promise.race([alertPromise, checkPromise]).then(() => setTimeout(() => checkOrders(), 1000)); //нужна функция, чтобы срабатывал самый первый выполненный промис
    }

    checkOrders()
    checkLists()
    drawLines()
})