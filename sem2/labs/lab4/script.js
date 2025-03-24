function task1() {
    console.log("TASK 1");

    let fruits = ["banana", "apple", "plum", "raspberry", "blackberry"];
    console.log(fruits);

    console.log("Deleting last element...");
    fruits.pop();
    console.log(fruits);

    console.log("Inserting `pineapple` to array...");
    fruits.push("pineapple");
    console.log(fruits);

    console.log("Reverse sorting...");
    fruits.sort().reverse();
    console.log(fruits);

    console.log("Looking for `apple`...");
    let apple = fruits.indexOf("apple");
    console.log(`Index of apple is ${apple}!`);
}

function task2() {
    console.log("\n\n\nTASK 2");

    let colors = ["red", "green", "blue", "pink", "light-blue", "dark-blue", "yellow"];
    console.log(colors);

    let max = colors[0];
    let min = colors[0];
    for (i = 0; i < colors.length; i++) {
        if (colors[i].length < min.length) {
            min = colors[i]
        }
        if (colors[i].length > max.length) {
            max  = colors[i]
        }
    }
    console.log(`Longest: ${max}\tShortest: ${min}`);

    console.log("Looking for blue colors...");
    for (i = colors.length-1; i >= 0; i--) {
        if (!(colors[i].includes("blue"))) {
            colors.splice(i, 1);
        }
    }
    console.log(colors);

    console.log("Concatenating...");
    let blues = colors.join(", ");
    console.log(blues)
}

function task3() {
    console.log("\n\n\nTASK 3");


    let empl = [
        {'name': 'Bob', 'age': 20, 'position': 'Developer'},
        {'name': 'Ann', 'age': 50, 'position': 'HR'},
        {'name': 'Katty', 'age': 10, 'position': 'Trainee'},
        {'name': 'John', 'age': 27, 'position': 'Developer'},
        {'name': 'Garry', 'age': 31, 'position': 'Project Manager'},
        {'name': 'David', 'age': 26, 'position': 'Teamlead'},
    ];
    console.log(empl);

    console.log("Sorting be name...");
    empl.sort((a, b) => a.name.localeCompare(b.name));
    console.log(empl);

    console.log("Looking for developers...");
    let devs = empl.filter((a) => a.position=="Developer");
    console.log(devs);

    console.log("Delete where (age > 30)...");
    empl = empl.filter((a) => a.age<30);
    console.log(empl);

    console.log("Adding newbie...");
    empl.push({'name': "Patrick", 'age': 90, 'position': 'SEO'});
    console.log(empl);
}

function task4() {
    console.log("\n\n\nTASK 4");


    let students = [
        {'name': 'Alex', 'age': 20, 'year': 3},
        {'name': 'Sophie', 'age': 19, 'year': 2},
        {'name': 'Nick', 'age': 22, 'year': 5},
        {'name': 'Dmytro', 'age': 18, 'year': 1},
        {'name': 'Luckas', 'age': 20, 'year': 3},
    ];
    console.log(students);

    console.log("Deleting Alex...");
    students = students.filter((a) => a.name!="Alex");
    console.log(students);

    console.log("Adding new bro...");
    students.push({'name': 'Andrew', 'age': 21, 'year': 4});
    console.log(students);

    console.log("Sorting by age...");
    students.sort((a, b) => b.age - a.age);
    console.log(students);

    console.log("Looking for 3rd year students...");
    let thirdYear = students.filter((a) => a.year==3);
    console.log(thirdYear);
}

function task5() {
    console.log("\n\n\nTASK 5");


    let nums = [0, 4, 7, 11, 3];
    console.log(nums);

    console.log("Squaring numbers...");
    let squares = nums.map((a) => a*a);
    console.log(squares);

    console.log("Looking for even numbers...");
    let evens = nums.filter((a) => a%2==0);
    console.log(evens);

    console.log("Calculating sum...");
    let sum = nums.reduce((a, b) => a+b);
    console.log(sum);

    console.log("Concatenating arrays...");
    let nums2 = [8, 15, 6, 6, 10];
    nums = nums.concat(nums2);
    console.log(nums);

    console.log("Slicing array...");
    nums.splice(0, 3);
    console.log(nums);
}



function libraryManagment(){
    function addBook(title, author, genre, pages) {
        const newBook = {
            title: title,
            author: author,
            genre: genre,
            pages: pages,
            isAvailable: true
        };
        books.push(newBook);
    }
    function removeBook(title) {
        books = books.filter((a) => a.title!=title)
    }
    function findBooksByAuthor(author) {
        return books.find((a) => a.author==author)
    }
    function toggleBookAvailability(title) {
        books.forEach((a) => {
            if (a.title === title) {
                a.isAvailable = !a.isAvailable;
            }
        });
    }
    function sortBooksByPages() {
        books.sort((a, b) => a.pages - b.pages);
    }
    function getBooksStatistics() {
        const totalBooks = books.length;
        const availableBooks = books.filter((book) => book.isAvailable).length;
        const borrowedBooks = totalBooks - availableBooks;
        const averagePages = books.reduce((acc, book) => acc + book.pages, 0) / totalBooks;

        return {
            totalBooks,
            availableBooks,
            borrowedBooks,
            averagePages
        };
    }



    let books = [
        {
            title: "To Kill a Mockingbird",
            author: "Harper Lee",
            genre: "Fiction",
            pages: 281,
            isAvailable: true
        },
        {
            title: "1984",
            author: "George Orwell",
            genre: "Dystopian",
            pages: 328,
            isAvailable: false
        },
        {
            title: "The Great Gatsby",
            author: "F. Scott Fitzgerald",
            genre: "Classic",
            pages: 180,
            isAvailable: true
        },
        {
            title: "Moby Dick",
            author: "Herman Melville",
            genre: "Adventure",
            pages: 635,
            isAvailable: false
        },
        {
            title: "Pride and Prejudice",
            author: "Jane Austen",
            genre: "Romance",
            pages: 279,
            isAvailable: true
        }
    ];
    console.log("\n\n\nTASK 6")
    console.log(books);

    console.log("Adding new book...");
    addBook("The Catcher in the Rye", "J.D. Salinger", "Classic", 214);
    console.log(books);

    console.log("Deleting book...");
    removeBook("The Great Gatsby");
    console.log(books);

    console.log("Searching by author...");
    console.log(findBooksByAuthor("George Orwell"));

    console.log("Switching availability...");
    toggleBookAvailability("1984");
    console.log(books);

    console.log("Sorting by pages...");
    sortBooksByPages();
    console.log(books);

    console.log("Getting onveral info...");
    console.log(getBooksStatistics());
}
function task6() {
    libraryManagment();
}

function task7(){
    console.log("\n\n\nTASK7");

    let student = {
        name: "Jerry",
        age: 19,
        course: 2
    };
    console.log(student);

    console.log("Adding subjects...");
    student.subjects = ["Math", "Programming"];
    console.log(student);

    console.log("Deleting age...");
    delete student.age;
    console.log(student);
}


task1()
task2()
task3()
task4()
task5()
task6()
task7()