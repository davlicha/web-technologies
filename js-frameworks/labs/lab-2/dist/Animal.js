"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Cat {
    name;
    age;
    constructor(name, age) {
        this.name = name;
        this.age = age;
    }
    move() {
        return `${this.name} is running.`;
    }
}
class Bird {
    name;
    age;
    canFly;
    constructor(name, age) {
        this.name = name;
        this.age = age;
        this.canFly = true;
    }
    move() {
        return `${this.name} is flying.`;
    }
}
class Fish {
    name;
    age;
    constructor(name, age) {
        this.name = name;
        this.age = age;
    }
    move() {
        return `${this.name} is swimming.`;
    }
}
const myCat = new Cat("Murka", 5);
const myBird = new Bird("Sparrow", 2);
const myFish = new Fish("Nemo", 1);
console.log(myCat.move());
console.log(myBird.move());
console.log(myFish.move());
