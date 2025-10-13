interface LibraryItem {
    title: string;
    author: string;
    isBorrowed: boolean;
    borrow(): void;
}

class Book implements LibraryItem {
    isBorrowed: boolean = false;
    constructor(
        public title: string,
        public author: string,
        public pageCount: number
    ) {}

    borrow(): void {
        if (!this.isBorrowed) {
            this.isBorrowed = true;
            console.log(`Book "${this.title}" has been borrowed.`);
        } else {
            console.log(`Book "${this.title}" is already borrowed.`);
        }
    }
}

class Magazine implements LibraryItem {
    isBorrowed: boolean = false;
    constructor(
        public title: string,
        public author: string,
        public issueNumber: number
    ) {}

    borrow(): void {
        this.isBorrowed = true;
        console.log(`Magazine "${this.title}" has been borrowed.`);
    }
}

class DVD implements LibraryItem {
    isBorrowed: boolean = false;
    constructor(
        public title: string,
        public author: string,
        public duration: number // в хвилинах
    ) {}

    borrow(): void {
        this.isBorrowed = true;
        console.log(`DVD "${this.title}" has been borrowed.`);
    }
}

class Library {
    private items: LibraryItem[] = [];

    addItem(item: LibraryItem): void {
        this.items.push(item);
        console.log(`Added "${item.title}" to the library.`);
    }

    findItemByName(name: string): LibraryItem | undefined {
        return this.items.find(item => item.title === name);
    }

    listAvailableItems(): void {
        console.log("\n--- Available Library Items ---");
        const availableItems = this.items.filter(item => !item.isBorrowed);
        if (availableItems.length === 0) {
            console.log("No items available.");
        } else {
            availableItems.forEach(item => console.log(`- ${item.title} by ${item.author}`));
        }
        console.log("-----------------------------");
    }
}

const library = new Library();
const book1 = new Book("The Hobbit", "J.R.R. Tolkien", 310);
const magazine1 = new Magazine("National Geographic", "Various", 202310);
const dvd1 = new DVD("Inception", "Christopher Nolan", 148);

library.addItem(book1);
library.addItem(magazine1);
library.addItem(dvd1);

library.listAvailableItems();

book1.borrow();

library.listAvailableItems();

const foundItem = library.findItemByName("Inception");
if (foundItem) {
    console.log(`\nFound item: ${foundItem.title}`);
}