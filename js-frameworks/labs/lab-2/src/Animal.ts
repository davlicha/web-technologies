interface Animal {
    name: string;
    age: number;
    canFly?: boolean;

    move(): string;
}

class Cat implements Animal {
    name: string;
    age: number;

    constructor(name: string, age: number) {
        this.name = name;
        this.age = age;
    }

    move(): string {
        return `${this.name} is running.`;
    }
}

class Bird implements Animal {
    name: string;
    age: number;
    canFly: boolean;

    constructor(name: string, age: number) {
        this.name = name;
        this.age = age;
        this.canFly = true;
    }

    move(): string {
        return `${this.name} is flying.`;
    }
}

class Fish implements Animal {
    name: string;
    age: number;

    constructor(name: string, age: number) {
        this.name = name;
        this.age = age;
    }

    move(): string {
        return `${this.name} is swimming.`;
    }
}

const myCat = new Cat("Murka", 5);
const myBird = new Bird("Sparrow", 2);
const myFish = new Fish("Nemo", 1);

console.log(myCat.move());
console.log(myBird.move());
console.log(myFish.move());