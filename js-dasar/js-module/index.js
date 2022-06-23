import coffeeStock from "./state.js";

const makeCoffee = (type, milligrams) => {
    if(coffeeStock[type] >= milligrams) {
        console.log("Kopi berhasil dibuat!");
    } else {
        console.log("Biji kopi habis!");
    }
}

makeCoffee("robusta", 80);