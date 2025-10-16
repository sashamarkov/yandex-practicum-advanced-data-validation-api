export function getCalcData(start, stop) {
    return new Promise((resolve, reject) => {
        let ret = [];
        for(let n = start; n < stop; n++){
            ret.push(n);
        }
        resolve(ret);
    })
}

export function isPrime(number) {
    if (number <= 1) return false; 
    if (number === 2) return true; 
    if (number % 2 === 0) return false; 

    const sqrt = Math.sqrt(number);
    for (let i = 3; i <= sqrt; i += 2) {
        if (number % i === 0) {
            return false;
        }
    }
    return true;
}