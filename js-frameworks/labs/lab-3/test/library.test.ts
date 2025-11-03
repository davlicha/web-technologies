import { expect } from 'chai';
import { LibraryManager } from '../src/library.js';
import { Book, User } from '../src/models.js';
import { describe, it } from 'mocha';


describe('LibraryManager', () => {
    let manager: LibraryManager;
    let book1: Book;
    let user1: User;

    beforeEach(() => {
        book1 = new Book('Test Book', 'Test Author', 2024);
        user1 = new User('Test User', 'test@example.com');
        manager = new LibraryManager([book1], [user1]);
    });

    it('повинен дозволяти користувачу позичити книгу', () => {
        const result = manager.borrowBook(book1.id, user1.id);

        expect(result.success).to.be.true;
        expect(book1.borrowedBy).to.equal(user1.id);
        expect(user1.borrowedBooks).to.equal(1);
    });

    it('повинен дозволяти користувачу повернути книгу', () => {
        manager.borrowBook(book1.id, user1.id);

        const result = manager.returnBook(book1.id);

        expect(result.success).to.be.true;
        expect(book1.borrowedBy).to.be.null;
        expect(user1.borrowedBooks).to.equal(0);
    });

    it('не повинен дозволяти користувачу позичити більше 3-х книг', () => {
        const book2 = new Book('Book 2', 'Author', 2000);
        const book3 = new Book('Book 3', 'Author', 2000);
        const book4 = new Book('Book 4', 'Author', 2000);

        manager.addBook(book2);
        manager.addBook(book3);
        manager.addBook(book4);

        manager.borrowBook(book1.id, user1.id);
        manager.borrowBook(book2.id, user1.id);
        manager.borrowBook(book3.id, user1.id);

        const result = manager.borrowBook(book4.id, user1.id);

        expect(result.success).to.be.false;
        expect(result.message).to.include('вже має 3 книги');
        expect(user1.borrowedBooks).to.equal(3);
    });
});