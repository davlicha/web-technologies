"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Circle {
    radius;
    constructor(radius) {
        this.radius = radius;
    }
    getArea() {
        return Math.PI * this.radius ** 2;
    }
    getPerimeter() {
        return 2 * Math.PI * this.radius;
    }
    scale(factor) {
        this.radius *= factor;
    }
}
class Rectangle {
    width;
    height;
    constructor(width, height) {
        this.width = width;
        this.height = height;
    }
    getArea() {
        return this.width * this.height;
    }
    getPerimeter() {
        return 2 * (this.width + this.height);
    }
    scale(factor) {
        this.width *= factor;
        this.height *= factor;
    }
}
class Triangle {
    side;
    constructor(side) {
        this.side = side;
    }
    getArea() {
        return (Math.sqrt(3) / 4) * this.side ** 2;
    }
    getPerimeter() {
        return 3 * this.side;
    }
    scale(factor) {
        this.side *= factor;
    }
}
const shapes = [
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
