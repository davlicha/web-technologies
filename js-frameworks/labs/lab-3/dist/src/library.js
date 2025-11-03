var Library = (function () {
    function Library(initialItems) {
        if (initialItems === void 0) { initialItems = []; }
        this.items = [];
        this.items = initialItems;
    }
    Library.prototype.add = function (item) {
        this.items.push(item);
    };
    Library.prototype.remove = function (id) {
        this.items = this.items.filter(function (item) { return item.id !== id; });
    };
    Library.prototype.find = function (id) {
        return this.items.find(function (item) { return item.id === id; });
    };
    Library.prototype.getAll = function () {
        return this.items;
    };
    Library.prototype.clear = function () {
        this.items = [];
    };
    return Library;
}());
export { Library };
var LibraryManager = (function () {
    function LibraryManager(books, users) {
        this.bookLibrary = new Library(books);
        this.userLibrary = new Library(users);
    }
    LibraryManager.prototype.borrowBook = function (bookId, userId) {
        var book = this.bookLibrary.find(bookId);
        if (!book)
            return { success: false, message: 'Книгу не знайдено.' };
        var user = this.userLibrary.find(userId);
        if (!user)
            return { success: false, message: 'Користувача не знайдено.' };
        if (user.borrowedBooks >= 3) {
            return {
                success: false,
                message: "\u041A\u043E\u0440\u0438\u0441\u0442\u0443\u0432\u0430\u0447 ".concat(user.name, " \u0432\u0436\u0435 \u043C\u0430\u0454 3 \u043A\u043D\u0438\u0433\u0438. \u041D\u0435\u043C\u043E\u0436\u043B\u0438\u0432\u043E \u043F\u043E\u0437\u0438\u0447\u0438\u0442\u0438 \u0431\u0456\u043B\u044C\u0448\u0435."),
            };
        }
        if (book.borrowedBy)
            return { success: false, message: 'Книга вже позичена.' };
        book.borrowedBy = user.id;
        user.borrowedBooks += 1;
        return {
            success: true,
            message: 'Книгу успішно позичено!',
            book: book,
            user: user,
        };
    };
    LibraryManager.prototype.returnBook = function (bookId) {
        var book = this.bookLibrary.find(bookId);
        if (!book)
            return { success: false, message: 'Книгу не знайдено.' };
        if (!book.borrowedBy)
            return { success: false, message: 'Книга не була позичена.' };
        var user = this.userLibrary.find(book.borrowedBy);
        if (user) {
            user.borrowedBooks = Math.max(0, user.borrowedBooks - 1);
        }
        book.borrowedBy = null;
        return { success: true, message: 'Книгу успішно повернуто!', book: book };
    };
    LibraryManager.prototype.clearAll = function () {
        this.bookLibrary.clear();
        this.userLibrary.clear();
    };
    LibraryManager.prototype.getBooks = function () {
        return this.bookLibrary.getAll();
    };
    LibraryManager.prototype.getUsers = function () {
        return this.userLibrary.getAll();
    };
    LibraryManager.prototype.addBook = function (book) {
        this.bookLibrary.add(book);
    };
    LibraryManager.prototype.addUser = function (user) {
        this.userLibrary.add(user);
    };
    LibraryManager.prototype.removeBook = function (id) {
        this.bookLibrary.remove(id);
    };
    LibraryManager.prototype.removeUser = function (id) {
        this.userLibrary.remove(id);
    };
    return LibraryManager;
}());
export { LibraryManager };
//# sourceMappingURL=library.js.map