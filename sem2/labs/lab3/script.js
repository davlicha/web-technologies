// 1. Сума перших 10 чисел Фібоначчі (цикл while)
function fibonacciSum() {
    let a = 0, b = 1, sum = 0, count = 0;
    while (count < 10) {
        sum += a;
        let temp = a + b;
        a = b;
        b = temp;
        count++;
    }
    console.log("Завдання 1: Сума перших 10 чисел Фібоначчі =", sum);
}
fibonacciSum();

// 2. Сума всіх простих чисел від 1 до 1000 (цикл for)
function isPrime(n) {
    if (n < 2) return false;
    for (let i = 2; i <= Math.sqrt(n); i++) {
        if (n % i === 0) return false;
    }
    return true;
}

function sumPrimes() {
    let sum = 0;
    for (let i = 1; i <= 1000; i++) {
        if (isPrime(i)) sum += i;
    }
    console.log("Завдання 2: Сума всіх простих чисел від 1 до 1000 =", sum);
}
sumPrimes();

// 3. Вивід дня тижня за введеним числом (switch)
function getDayOfWeek(number) {
    switch (number) {
        case 1: console.log("Завдання 3: Понеділок"); break;
        case 2: console.log("Завдання 3: Вівторок"); break;
        case 3: console.log("Завдання 3: Середа"); break;
        case 4: console.log("Завдання 3: Четвер"); break;
        case 5: console.log("Завдання 3: П’ятниця"); break;
        case 6: console.log("Завдання 3: Субота"); break;
        case 7: console.log("Завдання 3: Неділя"); break;
        default: console.log("Завдання 3: Неправильний ввід. Введіть число від 1 до 7.");
    }
}
let userInput = parseInt(prompt("Введіть число від 1 до 7:"));
getDayOfWeek(userInput);

// 4. Фільтрація масиву за непарною довжиною рядків
function filterOddLengthStrings(strings) {
    return strings.filter(str => str.length % 2 !== 0);
}
console.log("Завдання 4:", filterOddLengthStrings(["hello", "world", "JS", "odd", "length"]));

// 5. Стрілкова функція для збільшення кожного числа на 1
const incrementArray = numbers => numbers.map(num => num + 1);
console.log("Завдання 5:", incrementArray([1, 2, 3, 4, 5]));

// 6. Функція, яка перевіряє, чи сума або різниця двох чисел дорівнює 10
function checkSumOrDifference(a, b) {
    return (a + b === 10 || Math.abs(a - b) === 10);
}
console.log("Завдання 6:", checkSumOrDifference(7, 3));
console.log("Завдання 6:", checkSumOrDifference(20, 10));
console.log("Завдання 6:", checkSumOrDifference(5, 4));
