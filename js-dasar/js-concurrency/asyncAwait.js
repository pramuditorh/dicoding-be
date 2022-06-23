const { checkAvailability, checkStock } = require('./index');

const getCoffee = () => {
    return new Promise((resolve, reject) => {
        const seeds = 100;
        setTimeout(() => {
            if (seeds >= 10) {
                resolve("Kopi didapatkan!");
            } else {
                reject("Biji kopi habis!");
            }
        }, 1000);
    })
}

/*
function makeCoffee() {
    const coffee = getCoffee(); // async process menggunakan promise
    console.log(coffee);
}
*/
 
async function makeCoffee() {
    // Biasakan menggunakan try-catch ketika menerima resolved value dari Promise ketika menggunakan async-await
    try {
        await checkAvailability();
        await checkStock();
        await Promise.all([boilWater(), grindCoffeeBeans()]);
        const coffee = await getCoffee();
        console.log(coffee);
    } catch(rejectedReason) {
        console.log(rejectedReason);
    }
}

makeCoffee();