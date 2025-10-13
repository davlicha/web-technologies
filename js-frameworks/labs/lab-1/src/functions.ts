function greet(name: string, age: number = 18): string {
    return `Привіт, ${name}! Вам ${age} років.`;
}

console.log(greet("Олена", 22));

console.log(greet("Андрій"));

console.log(greet("Марія", 25));
console.log(greet("Петро"));