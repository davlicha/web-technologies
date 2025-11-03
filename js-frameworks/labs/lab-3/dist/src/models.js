var Book = (function () {
    function Book(title, author, year) {
        this.title = title;
        this.author = author;
        this.year = year;
        this.borrowedBy = null;
        this.id = "book_".concat(new Date().getTime() + Math.floor(Math.random() * 1000000000));
    }
    Book.prototype.getFullInfo = function () {
        return "".concat(this.title, " by ").concat(this.author, " (").concat(this.year, ")");
    };
    return Book;
}());
export { Book };
var User = (function () {
    function User(name, email) {
        this.name = name;
        this.email = email;
        this.borrowedBooks = 0;
        this.id = "".concat(Math.floor(Math.random() * 9000000000) + 1000000000);
    }
    User.prototype.getFullInfo = function () {
        return "".concat(this.id, " ").concat(this.name, " (").concat(this.email, ")");
    };
    return User;
}());
export { User };
//# sourceMappingURL=models.js.map