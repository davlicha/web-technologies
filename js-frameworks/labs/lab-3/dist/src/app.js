import './../libs/bootstrap.css';
import { Book, User } from './models';
import { StorageService, NotificationService } from './services';
import { LibraryManager } from './library';
import * as Validator from './validation';
var App = (function () {
    function App() {
        this.notificationService = new NotificationService();
        this.bookStorage = new StorageService('books');
        this.userStorage = new StorageService('users');
        var books = this.bookStorage
            .load()
            .map(function (b) { return Object.assign(new Book(b.title, b.author, b.year), b); });
        var users = this.userStorage
            .load()
            .map(function (u) { return Object.assign(new User(u.name, u.email), u); });
        this.libraryManager = new LibraryManager(books, users);
        this.bookForm = document.getElementById('addBookForm');
        this.userForm = document.getElementById('addUserForm');
        this.bookList = document.getElementById('bookList');
        this.userList = document.getElementById('userList');
        this.clearStorageButton = document.getElementById('clearStorageBtn');
        this.init();
    }
    App.prototype.init = function () {
        this.bookForm.addEventListener('submit', this.handleAddBook.bind(this));
        this.userForm.addEventListener('submit', this.handleAddUser.bind(this));
        this.clearStorageButton.addEventListener('click', this.handleClearStorage.bind(this));
        this.bookList.addEventListener('click', this.handleBookListClick.bind(this));
        this.userList.addEventListener('click', this.handleUserListClick.bind(this));
        this.renderBooks();
        this.renderUsers();
    };
    App.prototype.handleAddBook = function (e) {
        e.preventDefault();
        this.clearFormErrors(this.bookForm);
        var formData = new FormData(this.bookForm);
        var data = {
            title: formData.get('title'),
            author: formData.get('author'),
            year: formData.get('year'),
        };
        var validationConfig = {
            title: { required: true },
            author: { required: true },
            year: { required: true, isYear: true },
        };
        var validationResult = Validator.validate(data, validationConfig);
        if (!validationResult.isValid) {
            this.showFormErrors(this.bookForm, validationResult.errors);
            return;
        }
        var newBook = new Book(data.title, data.author, parseInt(data.year, 10));
        this.libraryManager.addBook(newBook);
        this.saveAll();
        this.notificationService.showToast('Книгу успішно додано!', 'success');
        this.bookForm.reset();
        this.renderBooks();
    };
    App.prototype.handleAddUser = function (e) {
        e.preventDefault();
        this.clearFormErrors(this.userForm);
        var formData = new FormData(this.userForm);
        var data = {
            name: formData.get('name'),
            email: formData.get('email'),
        };
        var validationConfig = {
            name: { required: true },
            email: { required: true, isEmail: true },
        };
        var validationResult = Validator.validate(data, validationConfig);
        if (!validationResult.isValid) {
            this.showFormErrors(this.userForm, validationResult.errors);
            return;
        }
        var newUser = new User(data.name, data.email);
        this.libraryManager.addUser(newUser);
        this.saveAll();
        this.notificationService.showToast('Користувача успішно додано!', 'success');
        this.userForm.reset();
        this.renderUsers();
    };
    App.prototype.handleBookListClick = function (e) {
        var target = e.target;
        var action = target.dataset.action;
        var id = target.dataset.id;
        if (!action || !id)
            return;
        if (action === 'borrow')
            this.handleBorrow(id);
        if (action === 'return')
            this.handleReturn(id);
        if (action === 'delete')
            this.handleDeleteBook(id);
    };
    App.prototype.handleUserListClick = function (e) {
        var target = e.target;
        var action = target.dataset.action;
        var id = target.dataset.id;
        if (action === 'delete' && id) {
            this.handleDeleteUser(id);
        }
    };
    App.prototype.handleBorrow = function (bookId) {
        var _this = this;
        this.notificationService.showBorrowModal(function (userId) {
            var result = _this.libraryManager.borrowBook(bookId, userId);
            if (result.success) {
                _this.saveAll();
                _this.renderBooks();
                _this.renderUsers();
                _this.notificationService.showInfoModal('Книгу Позичено!', "".concat(result.book.getFullInfo(), " has been borrowed by ").concat(result.user.getFullInfo(), "."));
            }
            else {
                _this.notificationService.showToast(result.message, 'danger');
            }
        });
    };
    App.prototype.handleReturn = function (bookId) {
        var result = this.libraryManager.returnBook(bookId);
        if (result.success) {
            this.saveAll();
            this.renderBooks();
            this.renderUsers();
            this.notificationService.showInfoModal('Книгу Повернуто!', "".concat(result.book.getFullInfo(), " has been returned."));
        }
        else {
            this.notificationService.showToast(result.message, 'danger');
        }
    };
    App.prototype.handleDeleteBook = function (bookId) {
        this.libraryManager.removeBook(bookId);
        this.saveAll();
        this.renderBooks();
        this.notificationService.showToast('Книгу видалено', 'warning');
    };
    App.prototype.handleDeleteUser = function (userId) {
        this.libraryManager.removeUser(userId);
        this.saveAll();
        this.renderUsers();
        this.notificationService.showToast('Користувача видалено', 'warning');
    };
    App.prototype.handleClearStorage = function () {
        this.bookStorage.clear();
        this.userStorage.clear();
        this.libraryManager.clearAll();
        this.renderBooks();
        this.renderUsers();
        this.notificationService.showToast('Local Storage успішно очищено!', 'warning');
    };
    App.prototype.renderBooks = function () {
        var _this = this;
        this.bookList.innerHTML = '';
        var books = this.libraryManager.getBooks();
        if (books.length === 0) {
            this.bookList.innerHTML =
                '<li class="list-group-item d-flex justify-content-between align-items-center">Книг поки немає.</li>';
            return;
        }
        books.forEach(function (book) {
            var isBorrowed = !!book.borrowedBy;
            var li = document.createElement('li');
            li.className =
                'list-group-item d-flex justify-content-between align-items-center';
            li.innerHTML = "\n        <span>\n          ".concat(book.getFullInfo(), "\n          ").concat(isBorrowed ? "<br><small class=\"text-warning\">\u041F\u043E\u0437\u0438\u0447\u0435\u043D\u043E (ID: ".concat(book.borrowedBy, ")</small>") : '', "\n        </span>\n        <div class=\"btn-group\">\n          ").concat(isBorrowed
                ? "<button class=\"btn btn-warning btn-sm\" data-action=\"return\" data-id=\"".concat(book.id, "\">\u041F\u043E\u0432\u0435\u0440\u043D\u0443\u0442\u0438</button>")
                : "<button class=\"btn btn-success btn-sm\" data-action=\"borrow\" data-id=\"".concat(book.id, "\">\u041F\u043E\u0437\u0438\u0447\u0438\u0442\u0438</button>"), "\n          <button class=\"btn btn-danger btn-sm\" data-action=\"delete\" data-id=\"").concat(book.id, "\">\u0412\u0438\u0434\u0430\u043B\u0438\u0442\u0438</button>\n        </div>\n      ");
            _this.bookList.appendChild(li);
        });
    };
    App.prototype.renderUsers = function () {
        var _this = this;
        this.userList.innerHTML = '';
        var users = this.libraryManager.getUsers();
        if (users.length === 0) {
            this.userList.innerHTML =
                '<li class="list-group-item d-flex justify-content-between align-items-center">Користувачів поки немає.</li>';
            return;
        }
        users.forEach(function (user) {
            var li = document.createElement('li');
            li.className =
                'list-group-item d-flex justify-content-between align-items-center';
            li.innerHTML = "\n        <span>\n          ".concat(user.getFullInfo(), "\n          <br><small class=\"text-info\">\u041A\u043D\u0438\u0433 \u043D\u0430 \u0440\u0443\u043A\u0430\u0445: ").concat(user.borrowedBooks, "</small>\n        </span>\n        <button class=\"btn btn-danger btn-sm\" data-action=\"delete\" data-id=\"").concat(user.id, "\">\u0412\u0438\u0434\u0430\u043B\u0438\u0442\u0438</button>\n      ");
            _this.userList.appendChild(li);
        });
    };
    App.prototype.saveAll = function () {
        this.bookStorage.save(this.libraryManager.getBooks());
        this.userStorage.save(this.libraryManager.getUsers());
    };
    App.prototype.showFormErrors = function (form, errors) {
        for (var key in errors) {
            var input = form.querySelector("[name=\"".concat(key, "\"]"));
            var errorDiv = form.querySelector("#".concat(key, "Error"));
            if (input)
                input.classList.add('is-invalid');
            if (errorDiv)
                errorDiv.textContent = errors[key];
        }
    };
    App.prototype.clearFormErrors = function (form) {
        form.querySelectorAll('.is-invalid').forEach(function (el) {
            return el.classList.remove('is-invalid');
        });
        form.querySelectorAll('.invalid-feedback').forEach(function (el) { return (el.textContent = ''); });
    };
    return App;
}());
document.addEventListener('DOMContentLoaded', function () {
    new App();
});
//# sourceMappingURL=app.js.map