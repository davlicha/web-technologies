"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Employee {
    name;
    age;
    salary;
    constructor(name, age, salary) {
        this.name = name;
        this.age = age;
        this.salary = salary;
    }
}
class Developer extends Employee {
    getAnnualBonus() {
        return this.salary * 0.10;
    }
    pay() {
        console.log(`Paying ${this.name} (Developer) a salary of ${this.salary}.`);
    }
}
class Manager extends Employee {
    getAnnualBonus() {
        return this.salary * 0.20;
    }
    pay() {
        console.log(`Paying ${this.name} (Manager) a salary of ${this.salary}.`);
    }
}
const employees = [
    new Developer("Ivan", 30, 50000),
    new Manager("Maria", 45, 80000),
    new Developer("Petro", 25, 45000),
];
let totalBonuses = 0;
employees.forEach(emp => {
    totalBonuses += emp.getAnnualBonus();
    if ('pay' in emp) {
        emp.pay();
    }
});
console.log(`Total annual bonuses for all employees: ${totalBonuses}`);
