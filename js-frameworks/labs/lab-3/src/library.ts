import { IBook, IUser } from './models';

export class Library<T extends { id: string }> {
    private items: T[] = [];

    constructor(initialItems: T[] = []) {
        this.items = initialItems;
    }

    add(item: T): void {
        this.items.push(item);
    }

    remove(id: string): void {
        this.items = this.items.filter((item) => item.id !== id);
    }

    find(id: string): T | undefined {
        return this.items.find((item) => item.id === id);
    }

    getAll(): T[] {
        return this.items;
    }

    clear(): void {
        this.items = [];
    }
}

export class LibraryManager {
    private bookLibrary: Library<IBook>;
    private userLibrary: Library<IUser>;

    constructor(books: IBook[], users: IUser[]) {
        this.bookLibrary = new Library(books);
        this.userLibrary = new Library(users);
    }

    borrowBook(
        bookId: string,
        userId: string
    ): { success: boolean; message: string; book?: IBook; user?: IUser } {
        const book = this.bookLibrary.find(bookId);
        if (!book) return { success: false, message: 'Книгу не знайдено.' };

        const user = this.userLibrary.find(userId);
        if (!user)
            return { success: false, message: 'Користувача не знайдено.' };

        if (user.borrowedBooks >= 3) {
            return {
                success: false,
                message: `Користувач ${user.name} вже має 3 книги. Неможливо позичити більше.`,
            };
        }

        if (book.borrowedBy)
            return { success: false, message: 'Книга вже позичена.' };

        book.borrowedBy = user.id;
        user.borrowedBooks += 1;

        return {
            success: true,
            message: 'Книгу успішно позичено!',
            book,
            user,
        };
    }

    returnBook(bookId: string): {
        success: boolean;
        message: string;
        book?: IBook;
    } {
        const book = this.bookLibrary.find(bookId);
        if (!book) return { success: false, message: 'Книгу не знайдено.' };
        if (!book.borrowedBy)
            return { success: false, message: 'Книга не була позичена.' };

        const user = this.userLibrary.find(book.borrowedBy);
        if (user) {
            user.borrowedBooks = Math.max(0, user.borrowedBooks - 1);
        }

        book.borrowedBy = null;

        return { success: true, message: 'Книгу успішно повернуто!', book };
    }

    clearAll(): void {
        this.bookLibrary.clear();
        this.userLibrary.clear();
    }

    getBooks(): IBook[] {
        return this.bookLibrary.getAll();
    }
    getUsers(): IUser[] {
        return this.userLibrary.getAll();
    }
    addBook(book: IBook) {
        this.bookLibrary.add(book);
    }
    addUser(user: IUser) {
        this.userLibrary.add(user);
    }
    removeBook(id: string) {
        this.bookLibrary.remove(id);
    }
    removeUser(id: string) {
        this.userLibrary.remove(id);
    }
}
