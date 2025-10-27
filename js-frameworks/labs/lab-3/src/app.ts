import './../libs/bootstrap.css';
import { Book, IBook, User, IUser } from './models';
import { StorageService, NotificationService } from './services';
import { LibraryManager } from './library';
import * as Validator from './validation';

class App {
    private libraryManager: LibraryManager;
    private bookStorage: StorageService<IBook>;
    private userStorage: StorageService<IUser>;
    private notificationService: NotificationService;

    private bookForm: HTMLFormElement;
    private userForm: HTMLFormElement;
    private bookList: HTMLElement;
    private userList: HTMLElement;
    private clearStorageButton: HTMLButtonElement;

    constructor() {
        this.notificationService = new NotificationService();
        this.bookStorage = new StorageService<IBook>('books');
        this.userStorage = new StorageService<IUser>('users');

        const books = this.bookStorage
            .load()
            .map((b) => Object.assign(new Book(b.title, b.author, b.year), b));
        const users = this.userStorage
            .load()
            .map((u) => Object.assign(new User(u.name, u.email), u));

        this.libraryManager = new LibraryManager(books, users);

        this.bookForm = document.getElementById(
            'addBookForm'
        ) as HTMLFormElement;
        this.userForm = document.getElementById(
            'addUserForm'
        ) as HTMLFormElement;
        this.bookList = document.getElementById('bookList') as HTMLElement;
        this.userList = document.getElementById('userList') as HTMLElement;
        this.clearStorageButton = document.getElementById(
            'clearStorageBtn'
        ) as HTMLButtonElement;

        this.init();
    }

    private init(): void {
        this.bookForm.addEventListener('submit', this.handleAddBook.bind(this));
        this.userForm.addEventListener('submit', this.handleAddUser.bind(this));
        this.clearStorageButton.addEventListener(
            'click',
            this.handleClearStorage.bind(this)
        );

        this.bookList.addEventListener(
            'click',
            this.handleBookListClick.bind(this)
        );
        this.userList.addEventListener(
            'click',
            this.handleUserListClick.bind(this)
        );

        this.renderBooks();
        this.renderUsers();
    }

    private handleAddBook(e: Event): void {
        e.preventDefault();
        this.clearFormErrors(this.bookForm);

        const formData = new FormData(this.bookForm);
        const data = {
            title: formData.get('title') as string,
            author: formData.get('author') as string,
            year: formData.get('year') as string,
        };

        const validationConfig: Validator.ValidationConfig = {
            title: { required: true },
            author: { required: true },
            year: { required: true, isYear: true },
        };

        const validationResult = Validator.validate(data, validationConfig);

        if (!validationResult.isValid) {
            this.showFormErrors(this.bookForm, validationResult.errors);
            return;
        }

        const newBook = new Book(
            data.title,
            data.author,
            parseInt(data.year, 10)
        );
        this.libraryManager.addBook(newBook);
        this.saveAll();

        this.notificationService.showToast('Книгу успішно додано!', 'success');
        this.bookForm.reset();
        this.renderBooks();
    }

    private handleAddUser(e: Event): void {
        e.preventDefault();
        this.clearFormErrors(this.userForm);

        const formData = new FormData(this.userForm);
        const data = {
            name: formData.get('name') as string,
            email: formData.get('email') as string,
        };

        const validationConfig: Validator.ValidationConfig = {
            name: { required: true },
            email: { required: true, isEmail: true },
        };

        const validationResult = Validator.validate(data, validationConfig);

        if (!validationResult.isValid) {
            this.showFormErrors(this.userForm, validationResult.errors);
            return;
        }

        const newUser = new User(data.name, data.email);
        this.libraryManager.addUser(newUser);
        this.saveAll();

        this.notificationService.showToast(
            'Користувача успішно додано!',
            'success'
        );
        this.userForm.reset();
        this.renderUsers();
    }

    private handleBookListClick(e: Event): void {
        const target = e.target as HTMLElement;
        const action = target.dataset.action;
        const id = target.dataset.id;

        if (!action || !id) return;

        if (action === 'borrow') this.handleBorrow(id);
        if (action === 'return') this.handleReturn(id);
        if (action === 'delete') this.handleDeleteBook(id);
    }

    private handleUserListClick(e: Event): void {
        const target = e.target as HTMLElement;
        const action = target.dataset.action;
        const id = target.dataset.id;

        if (action === 'delete' && id) {
            this.handleDeleteUser(id);
        }
    }

    private handleBorrow(bookId: string): void {
        this.notificationService.showBorrowModal((userId) => {
            const result = this.libraryManager.borrowBook(bookId, userId);

            if (result.success) {
                this.saveAll();
                this.renderBooks();
                this.renderUsers();
                this.notificationService.showInfoModal(
                    'Книгу Позичено!',
                    `${result.book!.getFullInfo()} has been borrowed by ${result.user!.getFullInfo()}.`
                );
            } else {
                this.notificationService.showToast(result.message, 'danger');
            }
        });
    }

    private handleReturn(bookId: string): void {
        const result = this.libraryManager.returnBook(bookId);

        if (result.success) {
            this.saveAll();
            this.renderBooks();
            this.renderUsers();
            this.notificationService.showInfoModal(
                'Книгу Повернуто!',
                `${result.book!.getFullInfo()} has been returned.`
            );
        } else {
            this.notificationService.showToast(result.message, 'danger');
        }
    }

    private handleDeleteBook(bookId: string): void {
        this.libraryManager.removeBook(bookId);
        this.saveAll();
        this.renderBooks();
        this.notificationService.showToast('Книгу видалено', 'warning');
    }

    private handleDeleteUser(userId: string): void {
        this.libraryManager.removeUser(userId);
        this.saveAll();
        this.renderUsers();
        this.notificationService.showToast('Користувача видалено', 'warning');
    }

    private handleClearStorage(): void {
        this.bookStorage.clear();
        this.userStorage.clear();
        this.libraryManager.clearAll();

        this.renderBooks();
        this.renderUsers();

        this.notificationService.showToast(
            'Local Storage успішно очищено!',
            'warning'
        );
    }

    private renderBooks(): void {
        this.bookList.innerHTML = '';
        const books = this.libraryManager.getBooks();

        if (books.length === 0) {
            this.bookList.innerHTML =
                '<li class="list-group-item d-flex justify-content-between align-items-center">Книг поки немає.</li>';
            return;
        }

        books.forEach((book) => {
            const isBorrowed = !!book.borrowedBy;
            const li = document.createElement('li');
            li.className =
                'list-group-item d-flex justify-content-between align-items-center';
            li.innerHTML = `
        <span>
          ${book.getFullInfo()}
          ${isBorrowed ? `<br><small class="text-warning">Позичено (ID: ${book.borrowedBy})</small>` : ''}
        </span>
        <div class="btn-group">
          ${
              isBorrowed
                  ? `<button class="btn btn-warning btn-sm" data-action="return" data-id="${book.id}">Повернути</button>`
                  : `<button class="btn btn-success btn-sm" data-action="borrow" data-id="${book.id}">Позичити</button>`
          }
          <button class="btn btn-danger btn-sm" data-action="delete" data-id="${book.id}">Видалити</button>
        </div>
      `;
            this.bookList.appendChild(li);
        });
    }

    private renderUsers(): void {
        this.userList.innerHTML = '';
        const users = this.libraryManager.getUsers();

        if (users.length === 0) {
            this.userList.innerHTML =
                '<li class="list-group-item d-flex justify-content-between align-items-center">Користувачів поки немає.</li>';
            return;
        }

        users.forEach((user) => {
            const li = document.createElement('li');
            li.className =
                'list-group-item d-flex justify-content-between align-items-center';
            li.innerHTML = `
        <span>
          ${user.getFullInfo()}
          <br><small class="text-info">Книг на руках: ${user.borrowedBooks}</small>
        </span>
        <button class="btn btn-danger btn-sm" data-action="delete" data-id="${user.id}">Видалити</button>
      `;
            this.userList.appendChild(li);
        });
    }

    private saveAll(): void {
        this.bookStorage.save(this.libraryManager.getBooks());
        this.userStorage.save(this.libraryManager.getUsers());
    }

    private showFormErrors(
        form: HTMLFormElement,
        errors: Validator.FormErrors
    ): void {
        for (const key in errors) {
            const input = form.querySelector(
                `[name="${key}"]`
            ) as HTMLInputElement;
            const errorDiv = form.querySelector(`#${key}Error`) as HTMLElement;

            if (input) input.classList.add('is-invalid');
            if (errorDiv) errorDiv.textContent = errors[key];
        }
    }

    private clearFormErrors(form: HTMLFormElement): void {
        form.querySelectorAll('.is-invalid').forEach((el) =>
            el.classList.remove('is-invalid')
        );
        form.querySelectorAll('.invalid-feedback').forEach(
            (el) => (el.textContent = '')
        );
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new App();
});
