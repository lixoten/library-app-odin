const myLibrary = [];
let idCounter = 0;
let currentBookId;

const elements = {
    bookDialog: document.getElementById("book-dialog"),
    bookAreaElement: document.querySelector(".book-area"),
    bookForm: document.getElementById("book-form"),
    loadTestDataButton: document.getElementById("load-test-data-button"),
    clearDialogButton: document.getElementById("clear-dialog-btn"),
    closeDialogButton: document.getElementById("close-dialog"),
    showDialogButton: document.getElementById("popup-button"),
}

elements.showDialogButton.addEventListener("click", handleShowDialog);
elements.closeDialogButton.addEventListener("click", handleCloseDialog);
elements.clearDialogButton.addEventListener("click", handleClearDialog);
elements.loadTestDataButton.addEventListener("click", handleLoadTestData);

class Book {
    constructor(title, author, pages, read, cover) {
        this.id = idCounter++;
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.read = read;
        this.cover = cover;
    }
}

function displayBookCard(book) {
    const bookId = book.id;

    const bookElement = document.createElement("div")
    bookElement.id = book.id;
    bookElement.className = "book"
    elements.bookAreaElement.appendChild(bookElement)

    const bookCoverElement = document.createElement("img")
    bookCoverElement.className = "cover"
    if (book.cover === "") {
        bookCoverElement.setAttribute("src", './assets/icons/book-cover.png')
    } else {
        bookCoverElement.setAttribute("src", book.cover)
    }
    bookCoverElement.onerror = function () {
        //console.warn('Failed to load book cover image. Falling back to default image.');
        this.onerror = null;
        this.src = './assets/icons/book-cover.png';
    }
    bookElement.appendChild(bookCoverElement)

    const bookTitleElement = document.createElement("h2")
    bookTitleElement.className = "title"
    bookTitleElement.textContent = book.title;
    bookElement.appendChild(bookTitleElement)

    const bookAuthorElement = document.createElement("p")
    bookAuthorElement.className = "author"
    bookAuthorElement.textContent = book.author;
    bookElement.appendChild(bookAuthorElement)

    const totalPagesElement = document.createElement("p")
    totalPagesElement.className = "total-pages"
    totalPagesElement.textContent = `Total pages: ${book.pages}`;
    bookElement.appendChild(totalPagesElement)

    const actionAreaElement = document.createElement("div")
    actionAreaElement.classList.add("book-action-area")
    bookElement.appendChild(actionAreaElement)

    const swBoxElement = document.createElement("div")
    const circleElement = document.createElement("div")
    const txtStatus = document.createElement("div")
    txtStatus.classList.add("sw-span")

    swBoxElement.classList.add("sw-box")
    if (book.read) {
        swBoxElement.classList.add("sw-box", "readx")
        circleElement.classList.add("circle", "read-circle")
        txtStatus.textContent = 'Read';
    } else {
        swBoxElement.classList.add("sw-box", "unreadx")
        circleElement.classList.add("circle", "unread-circle")
        txtStatus.textContent = 'Unread';
    }
    actionAreaElement.appendChild(swBoxElement)
    swBoxElement.appendChild(circleElement)
    swBoxElement.appendChild(txtStatus)
    swBoxElement.addEventListener("click", () => {
        //const book = myLibrary.find(book => book.id === bookId);
        book.read = !book.read;

        toggleBookReadStatus(book, circleElement, swBoxElement, txtStatus);
    })

    const editIconElement = document.createElement("img")
    editIconElement.className = "edit-book"
    editIconElement.setAttribute("src", "./assets/icons/pencil-outline-custom.png")
    actionAreaElement.appendChild(editIconElement)

    editIconElement.addEventListener("click", () => {
        const book = myLibrary.find(book => book.id === bookId);
        currentBookId = bookId;

        document.getElementById("dialog-head").textContent = "Edit Book";
        document.getElementById("add-dialog-btn").textContent = "Edit";

        const bookTitleElement = document.getElementById("book-title");
        const bookAuthorElement = document.getElementById("book-author");
        const bookCoverElement = document.getElementById("book-cover");
        const totalPagesElement = document.getElementById("book-total-pages");
        const yesIndicatorElement = document.getElementById("yes-indicator");
        const noIndicatorElement = document.getElementById("no-indicator");

        // Set the form fields with the book details on here....
        bookTitleElement.value = book.title;
        bookAuthorElement.value = book.author;
        bookCoverElement.value = book.cover;
        totalPagesElement.value = book.pages;
        if (book.read) {
            yesIndicatorElement.checked = true;
        } else {
            noIndicatorElement.checked = true;
        }

        elements.bookDialog.showModal();
    })


    const deleteIconElement = document.createElement("img")
    deleteIconElement.className = "delete-book"
    deleteIconElement.setAttribute("src", "./assets/icons/trash-can-outline-custom.png")
    actionAreaElement.appendChild(deleteIconElement)

    deleteIconElement.addEventListener("click", () => {
        console.table(myLibrary);
        const index = myLibrary.findIndex(book => book.id === bookId);
        myLibrary.splice(index, 1);
        console.table(myLibrary);
        bookElement.remove();
    })
}

//== Begin addEventListener Handle functions===============================================//
function handleShowDialog() {
    elements.bookDialog.showModal();
}
function handleCloseDialog(event) {
    event.preventDefault();
    clearForm()
    elements.bookDialog.close();
}
function handleClearDialog(event) {
    event.preventDefault();
    clearForm()
}
function handleLoadTestData() {
    loadTestData();
    elements.loadTestDataButton.remove()
}
//== End addEventListener Handle functions===============================================//


// The main reason for this function is that I did not want duplicated code. Called from 2 places
// --- From Click Toggle on Book Status on main page
// --- From Save on edit in Dialog
function toggleBookReadStatus(book, circleElement, swBoxElement, txtStatus) {
    if (book.read) {
        circleElement.classList.toggle("read-circle")
        swBoxElement.classList.toggle("readx")
        txtStatus.textContent = 'Read';
    } else {//txt-status
        circleElement.classList.toggle("read-circle")
        swBoxElement.classList.toggle("readx")
        txtStatus.textContent = 'Unread';
    }
}

//=Begin Dialog==============================================================================//
//=Begin Dialog==============================================================================//
const addDialogButtonElement = document.getElementById("add-dialog-btn");
addDialogButtonElement.addEventListener("click", (event) => {
    event.preventDefault();
    if (!elements.bookForm.checkValidity()) {
        elements.bookForm.reportValidity();
        return;
    }
    document.getElementById("dialog-head").textContent = "Add Book";
    document.getElementById("add-dialog-btn").textContent = "Add";

    const bookTitleElement = document.getElementById("book-title")
    const bookAuthorElement = document.getElementById("book-author")
    const totalPagesElement = document.getElementById("book-total-pages")
    const bookCoverElement = document.getElementById("book-cover")
    const yesIndicatorElement = document.getElementById("yes-indicator");
    //const noIndicatorElement = document.getElementById("no-indicator");

    const title = bookTitleElement.value;
    const author = bookAuthorElement.value;
    const cover = bookCoverElement.value;
    const totalPages = totalPagesElement.value;

    let readIndicator = false;
    if (yesIndicatorElement.checked) {
        readIndicator = true
    }

    // Find the book in the myLibrary array
    const book = myLibrary.find(book => book.id === currentBookId);
    // Update the book details
    if (book) {
        updateBookCard(book, title, author, totalPages, readIndicator, cover);
    } else {
        addNewBookCard(title, author, totalPages, readIndicator, cover);
    }

    clearForm()
    elements.bookDialog.close();
});

function updateBookCard(book, title, author, totalPages, readIndicator, cover) {
    book.title = title;
    book.author = author;
    book.cover = cover;
    book.pages = totalPages;
    book.read = readIndicator;

    // Update an existing book displayed details
    const bookElement = document.getElementById(book.id);
    bookElement.querySelector(".title").textContent = book.title;
    bookElement.querySelector(".author").textContent = book.author;
    bookElement.querySelector(".total-pages").textContent = `Total pages: ${book.pages}`;
    bookElement.querySelector(".cover").src = book.cover;

    const swBoxElement = bookElement.querySelector(".sw-box")
    const circleElement = bookElement.querySelector(".circle")
    const txtStatus = bookElement.querySelector(".sw-span")
    toggleBookReadStatus(book, circleElement, swBoxElement, txtStatus);
}

function addNewBookCard(title, author, totalPages, readIndicator, cover) {
    const newBook = new Book(title, author, totalPages, readIndicator, cover)
    myLibrary.push(newBook)
    displayBookCard(newBook);
}

function clearForm() {
    document.getElementById("book-title").value = "";
    document.getElementById("book-author").value = "";
    document.getElementById("book-total-pages").value = "";
    document.getElementById("book-cover").value = "";
    document.getElementById("no-indicator").checked = true;
}

//=End Dialog--==============================================================================//
//=End Dialog--==============================================================================//

function loadTestData() {
    const tempLibrary = [];
    let i = 0;
    tempLibrary[i++] = new Book("It", "Stephen King", 1138, true, "https://m.media-amazon.com/images/I/71-Hcgk9ErL._SL1200_.jpg");
    tempLibrary[i++] = new Book("The Shining", "Stephen King", 659, true, "./assets/covers/theshining.jpg");
    tempLibrary[i++] = new Book("Dracula", "Bram Stoker", 418, false, "./assets/covers/dracula.jpg");
    tempLibrary[i++] = new Book("Frankenstein", "Mary Shelley", 280, false, "./assets/covers/frankenstein.jpg");
    tempLibrary[i++] = new Book("The Amityville Horror", "Jay Anson", 256, false, "./assets/covers/amityville.jpg");
    tempLibrary[i++] = new Book("The Haunting of Hill House", "Shirley Jackson", 246, false, "./assets/covers/haunting.jpg");
    tempLibrary[i++] = new Book("Psycho", "Robert Bloch", 176, false, "./assets/covers/psycho.jpg");
    tempLibrary[i++] = new Book("The Exorcist", "William Peter Blatty", 400, false, "./assets/covers/exorcist.jpg");
    tempLibrary[i++] = new Book("Rosemary's Baby", "Ira Levin", 245, false, "./assets/covers/rosemary.jpg");
    tempLibrary[i++] = new Book("The Silence of the Lambs", "Thomas Harris", 338, false, "./assets/covers/silenceoflambs.jpg");
    for (const book of tempLibrary) {
        myLibrary.push(book)
        displayBookCard(book);
    }
}
//281 275 277