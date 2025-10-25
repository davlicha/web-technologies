export interface IBook {
    id: string;
    title: string;
    author: string;
    year: number;
    borrowedBy: string | null;

    getFullInfo(): string;
}

export class Book implements IBook {
    id: string;
    borrowedBy: string | null = null;

    constructor(public title: string, public author: string, public year: number) {
        this.id = `book_${new Date().getTime()}`;
    }

    getFullInfo(): string {
        return `${this.title} by ${this.author} (${this.year})`;
    }
}

export interface IUser {
    id: string;
    name: string;
    email: string;
    borrowedBooks: number;

    getFullInfo(): string;
}

export class User implements IUser {
    id: string;
    borrowedBooks: number = 0;

    constructor(public name: string, public email: string) {
        this.id = `${Math.floor(Math.random() * 9000000000) + 1000000000}`;
    }

    getFullInfo(): string {
        return `${this.id} ${this.name} (${this.email})`;
    }
}
