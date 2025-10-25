"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function greet(name, age = 18) {
    return `Привіт, ${name}! Вам ${age} років.`;
}
console.log(greet("Олена", 22));
console.log(greet("Андрій"));
console.log(greet("Марія", 25));
console.log(greet("Петро"));
