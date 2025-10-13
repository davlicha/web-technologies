abstract class Employee {
    constructor(
        public name: string,
        public age: number,
        public salary: number
    ) {}

    abstract getAnnualBonus(): number;
}

interface Payable {
    pay(): void;
}

class Developer extends Employee implements Payable {
    getAnnualBonus(): number {
        return this.salary * 0.10;
    }

    pay(): void {
        console.log(`Paying ${this.name} (Developer) a salary of ${this.salary}.`);
    }
}

class Manager extends Employee implements Payable {
    getAnnualBonus(): number {
        return this.salary * 0.20;
    }

    pay(): void {
        console.log(`Paying ${this.name} (Manager) a salary of ${this.salary}.`);
    }
}

const employees: Employee[] = [
    new Developer("Ivan", 30, 50000),
    new Manager("Maria", 45, 80000),
    new Developer("Petro", 25, 45000),
];

let totalBonuses = 0;
employees.forEach(emp => {
    totalBonuses += emp.getAnnualBonus();
    if ('pay' in emp) {
        (emp as Payable).pay();
    }
});

console.log(`Total annual bonuses for all employees: ${totalBonuses}`);