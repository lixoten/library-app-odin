const myLibrary = [];
let idCounter = 0;
let currentBookId;

const myDialog = document.getElementById("myDialog");
const bookAreaElement = document.querySelector(".book-area");
const myForm = document.getElementById("my-form");

const popupButton = document.getElementById("popup-button");
popupButton.addEventListener("click", () => {
    console.log(123)
    myDialog.showModal();
})

const loadTestDataButtonElement = document.getElementById("load-test-data-button");
loadTestDataButtonElement.addEventListener("click", () =>{
    loadTestData();
    loadTestDataButtonElement.remove()
})

const addDialogButtonElement = document.getElementById("add-dialog-btn");
addDialogButtonElement.addEventListener("click", (event) => {
    event.preventDefault();
    if (!myForm.checkValidity()) {
        myForm.reportValidity();
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
    //const readYes = yesIndicatorElement;
    //const readNo = noIndicatorElement;

    let readIndicator = false;
    if (yesIndicatorElement.checked) {
        readIndicator = true
    }


    // Find the book in the myLibrary array
    const book = myLibrary.find(book => book.id === currentBookId);
    // Update the book details
    if (book) {
        book.title = title;
        book.author = author;
        book.cover = cover;
        book.pages = totalPages;
        book.read = readIndicator;

        // Update the displayed book details
        const bookElement = document.getElementById(book.id);
        bookElement.querySelector(".title").textContent = book.title;
        bookElement.querySelector(".author").textContent = book.author;
        bookElement.querySelector(".total-pages").textContent = `Total pages: ${book.pages}`;
        bookElement.querySelector(".cover").src = book.cover;

        //bookElement.querySelector(".read-status").textContent = book.read ? "Read" : "Unread";
        //bookElement.querySelector(".text-read-status").textContent = book.read ? "Read" : "Unread";

        const textStatusIconElement =  bookElement.querySelector(".text-read-status")
        const statusIconElement =  bookElement.querySelector(".status")
        if (book.read) {
            //bookElement.querySelector(".text-read-status").textContent = "Read";
            textStatusIconElement.classList.add("text-read-status",  "read")
            textStatusIconElement.textContent = "Read";

            statusIconElement.classList.add("status",  "read")
            statusIconElement.setAttribute("src", "./assets/icons/toggle-switch-outline-custom.png")
        } else {
            //bookElement.querySelector(".text-read-status").textContent = "Unread";
            textStatusIconElement.classList.add("text-read-status",  "unread")
            textStatusIconElement.textContent = "Unread";

            statusIconElement.classList.add("status",  "unread")
            statusIconElement.setAttribute("src", "./assets/icons/toggle-switch-off-outline-custom.png")
        }

    } else {
        const newBook = new Book(title, author, totalPages, readIndicator, cover)
        myLibrary.push(newBook)
        displayBook(newBook);
    }

    clearForm()
    myDialog.close();
});


const clearDialogButtonElement = document.getElementById("clear-dialog-btn");
clearDialogButtonElement.addEventListener("click", (event) => {
    event.preventDefault();
    clearForm()
});

const closeDialogButtonElement = document.getElementById("close-dialog");

closeDialogButtonElement.addEventListener("click", (event) => {
    event.preventDefault();
    clearForm()
    myDialog.close();
});


function clearForm() {
    document.getElementById("book-title").value = "";
    document.getElementById("book-author").value = "";
    document.getElementById("book-total-pages").value = "";
    document.getElementById("book-cover").value = "";
    document.getElementById("no-indicator").checked = true;
}


function Book(title, author, pages, read, cover) {
    this.id = idCounter++;
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
    this.cover = cover;
}

function loadTestData(){
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
    tempLibrary[i++] = new Book("The Silence of the Lambs", "Thomas Harris", 338,false, "./assets/covers/silenceoflambs.jpg");
    for (const book of tempLibrary) {
        myLibrary.push(book)
        displayBook(book);
    }
}

function displayBook(book) {
    const bookId = book.id;

    const bookElement = document.createElement("div")
    bookElement.id = book.id;
    bookElement.className = "book"
    bookAreaElement.appendChild(bookElement)

    const bookCoverElement = document.createElement("img")
    bookCoverElement.className = "cover"
    if (book.cover === "") {
        bookCoverElement.setAttribute("src", './assets/icons/book-cover.png')
    } else {
        bookCoverElement.setAttribute("src", book.cover)
    }
    bookCoverElement.onerror = function() {
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

    const readStatusElement = document.createElement("p")
    let stat = `Status: `;
    bookElement.classList.add("book")
    if (book.read) {
        stat += '<span class="text-read-status read">Read</span>';
    } else {
        stat += '<span class="text-read-status unread">Unread</span>';
    }
    readStatusElement.innerHTML = stat;
    bookElement.appendChild(readStatusElement)

    const actionAreaElement = document.createElement("div")
    actionAreaElement.classList.add("book-action-area")
    bookElement.appendChild(actionAreaElement)

    const statusIconElement = document.createElement("img")
    if (book.read) {
        statusIconElement.classList.add("status",  "read")
        statusIconElement.setAttribute("src", "./assets/icons/toggle-switch-outline-custom.png")
    } else {
        statusIconElement.classList.add("status",  "unread")
        statusIconElement.setAttribute("src", "./assets/icons/toggle-switch-off-outline-custom.png")
    }
    actionAreaElement.appendChild(statusIconElement)

    statusIconElement.addEventListener("click", () => {
        // const book = myLibrary.find(book => book.id === bookId);
        const book = myLibrary.find(book => book.id === bookId);
        book.read = !book.read;

        bookElement.classList.add("book")
        if (book.read) {
            statusIconElement.classList.add("status",  "read")
            statusIconElement.setAttribute("src", "./assets/icons/toggle-switch-outline-custom.png");
        } else {
            statusIconElement.classList.add("status",  "unread")
            statusIconElement.setAttribute("src", "./assets/icons/toggle-switch-off-outline-custom.png");
        }
        if (book.read) {
            readStatusElement.innerHTML = `Status: <span class="read">Read</span>`;
        } else {
            readStatusElement.innerHTML = `Status: <span class="unread">Unread</span>`;
        }
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

        myDialog.showModal();
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