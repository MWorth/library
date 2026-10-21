const myLibrary = [];

const sectionCenter = document.querySelector(".section-center");

const addDialog = document.querySelector("dialog");
const addForm = document.getElementById("add-book-form");
const addBtn = addForm.querySelector("#addBtn");

addBtn.addEventListener("click", (event) => {
    event.preventDefault();
    const formTitle = addForm.querySelector("#title").value;
    const formAuthor = addForm.querySelector("#author").value;
    const formPages = addForm.querySelector("#pages").value;
    const formRead = addForm.querySelector("#read").value;

    addBookToLibrary(formTitle, formAuthor, formPages, formRead);

    addForm.querySelector("#title").value = "";
    addForm.querySelector("#author").value = "";
    addForm.querySelector("#pages").value = "";
    addForm.querySelector("#read").value = "";

    displayLibraryItems(myLibrary);

    addDialog.close();
});

sectionCenter.addEventListener("click", (event) => {
    if (event.target.id === "delBtn") {
        event.preventDefault();

        for (let index = 0; index < myLibrary.length; ++index) {
            if (myLibrary[index].id === event.target.dataset.id) {
                myLibrary.splice(index, 1);
            }
        }

        const delBook = document.querySelector(`article[id="${event.target.dataset.id}"]`);
        delBook.remove();
    }
    if (event.target.id === "togRead") {
        event.preventDefault();

        myLibrary.forEach(bookElement => {
            if (bookElement.id === event.target.dataset.id) {
                if (bookElement.read === 'Not Read Yet') {
                    bookElement.read = 'Read';
                }
                else {
                    bookElement.read = 'Not Read Yet';
                }
            }
        })
        displayLibraryItems(myLibrary);
    }
});

window.addEventListener("DOMContentLoaded", function () {
    displayLibraryItems(myLibrary);
});

function Book(id, title, author, pageNum, read) {
    // the constructor...
    if (!new.target) {
        throw Error("You must use the 'new' operator to call the constructor");
    }
    this.id = id;
    this.title = title;
    this.author = author;
    this.pageNum = pageNum;
    this.read = read;
}

function addBookToLibrary(title, author, pageNum, read) {
    // take params, create a book then store it in the array
    let id = crypto.randomUUID();
    let newBook = new Book(id, title, author, pageNum, read);

    myLibrary.push(newBook);
}

addBookToLibrary("The Hobbit", "J.R.R. Tolkien", "295", "Not Read Yet")
addBookToLibrary("The DaVinci Code", "Dan Brown", "487", "Read")



function displayLibraryItems(library) {
    let displayLibrary = library.map(function (item) {
        return `<article class="library-item" id="${item.id}">
                    <div class="item-info">
                        <header>
                            <h4>${item.title}</h4>
                            <h4 class="author">By ${item.author}</h4>
                        </header>
                        <p class="item-page">${item.pageNum} pages</p>
                        <p class="item-read">${item.read}</p>
                    </div>
                    <button id="togRead" data-id="${item.id}">Toggle Read</button>
                    <button id="delBtn" data-id="${item.id}">Delete</button>
                </article>`;

    });
    displayLibrary = displayLibrary.join("");
    sectionCenter.innerHTML = displayLibrary;
}
