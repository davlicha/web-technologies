interface Shape {
    getArea(): number;
    getPerimeter(): number;
    scale(factor: number): void;
}

class Circle implements Shape {
    private radius: number;

    constructor(radius: number) {
        this.radius = radius;
    }

    getArea(): number {
        return Math.PI * this.radius ** 2;
    }

    getPerimeter(): number {
        return 2 * Math.PI * this.radius;
    }

    scale(factor: number): void {
        this.radius *= factor;
    }
}

class Rectangle implements Shape {
    private width: number;
    private height: number;

    constructor(width: number, height: number) {
        this.width = width;
        this.height = height;
    }

    getArea(): number {
        return this.width * this.height;
    }

    getPerimeter(): number {
        return 2 * (this.width + this.height);
    }

    scale(factor: number): void {
        this.width *= factor;
        this.height *= factor;
    }
}

class Triangle implements Shape {
    private side: number;

    constructor(side: number) {
        this.side = side;
    }

    getArea(): number {
        return (Math.sqrt(3) / 4) * this.side ** 2;
    }

    getPerimeter(): number {
        return 3 * this.side;
    }

    scale(factor: number): void {
        this.side *= factor;
    }
}

const shapes: Shape[] = [
    new Circle(10),
    new Rectangle(5, 10),
    new Triangle(7),
];

let totalArea = 0;
let totalPerimeter = 0;

shapes.forEach(shape => {
    totalArea += shape.getArea();
    totalPerimeter += shape.getPerimeter();
});

console.log(`Total Area: ${totalArea.toFixed(2)}`);
console.log(`Total Perimeter: ${totalPerimeter.toFixed(2)}`);

const circle = new Circle(5);
console.log(`Original circle perimeter: ${circle.getPerimeter().toFixed(2)}`);
circle.scale(2); // Збільшуємо вдвічі
console.log(`Scaled circle perimeter: ${circle.getPerimeter().toFixed(2)}`);