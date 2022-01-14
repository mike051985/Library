// Book Class: Represents a Book
class Book {
    constructor(title, author,pages, isbn, status) {
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.isbn = isbn;
        this.status = status;
    }
}

// UI Class: Handle UI Tasks
class UI {
    static displayBooks() {
        const books = Store.getBooks();
        books.forEach((book) => UI.addBookToList(book));
    }

    static addBookToList(book) {
        const list = document.querySelector("#book-list");
        const row = document.createElement("tr");

        row.innerHTML = `
         <td>${book.title}</td>
         <td>${book.author}</td>
         <td>${book.pages}</td>
         <td>${book.isbn}</td>
         <td>${book.status}</td>
         <td><a href="#" class="btn btn-danger btn-sm delete">X</a></td>
        `;

        list.appendChild(row);
    }

    static clearFields() {
        document.querySelector("#title").value = "";
        document.querySelector("#author").value = "";
        document.querySelector("#pages").value = "";
        document.querySelector("#isbn").value = "";
        document.querySelector("#status").value = "";
    }

    static deleteBook(el) {
        if (el.classList.contains("delete")) {
            el.parentElement.parentElement.remove();
        }
    }
}

//Store Class: Handles storage
class Store {
    static getBooks(){
        let books;
        if(localStorage.getItem("books") === null) {
            books = [];
        } else {
            books = JSON.parse(localStorage.getItem("books"));
        }

        return books;

    }

    static addBook(book) {
        const books = Store.getBooks();
        books.push(book);
        localStorage.setItem("books", JSON.stringify(books));
    }

    static removeBook(isbn) {
        const books = Store.getBooks();
        books.forEach((book, index) => {
            if(book.isbn === isbn) {
                books.splice(index, 1);
            }
        });
        localStorage.setItem("books", JSON.stringify(books));
        window.localStorage.clear();
    }
}

// Display Book
document.addEventListener("DOMContentLoaded", UI.displayBooks);

// Add a Book
document.querySelector("#book-form").addEventListener("submit", (e) => {
    e.preventDefault();

    // Get form values
    const title = document.querySelector("#title").value;
    const author = document.querySelector("#author").value;
    const pages = document.querySelector("#pages").value;
    const isbn = document.querySelector("#isbn").value;
    const status = document.querySelector("#status").value;


    //Validate
    if (title === "" || author === "" || pages === "" || isbn === "") {
        alert("Please fill in all fields");
    } else {
        // Instantiate book
        const book = new Book(title, author, pages, isbn, [(status !== "")? "Already read" : "Not yet read"]);

        //Add book
        UI.addBookToList(book);
        Store.addBook(book);
        UI.clearFields();
    }


});

//Event: Remove a Book
document.querySelector("#book-list").addEventListener("click", (e) =>{
    e.preventDefault();
    UI.deleteBook(e.target);
    Store.removeBook(e.target.parentElement.previousElementSibling.textContent);
});
