const Tiger = require("./animal/Tiger");
const Wolf = require("./animal/Wolf");

const fighting = (tiger, wolf) => {
    if (tiger.strength > wolf.strength) {
        return tiger.growl();
    }

    if (tiger.strength < wolf.strength) {
        return wolf.howl();
    }

    console.log("Tiger and wolf have a same strength");
}

const tiger = new Tiger();
const wolf = new Wolf();

fighting(tiger, wolf);