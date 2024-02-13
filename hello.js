
let library = [];

// Check if there is any data stored in local storage when the page loads
window.onload = function() {
    if (localStorage.getItem('library')) {
        library = JSON.parse(localStorage.getItem('library'));
        displayBooks();
    }
};

function Book(id, title, author) {
    this.id = id;
    this.title = title;
    this.author = author;
    this.isBorrowed = false;
}

function addBook() {
    const bookId = document.getElementById('book-id').value.trim();
    const bookTitle = document.getElementById('book-title').value.trim();
    const authorName = document.getElementById('author-name').value.trim();

    if (!bookId || !bookTitle || !authorName) {
        document.getElementById('add-feedback').textContent = "Please fill all fields.";
        return;
    }

    const existingBook = library.find(book => book.id === bookId);
    if (existingBook) {
        document.getElementById('add-feedback').textContent = "Book ID already exists.";
        return;
    }

    const newBook = new Book(bookId, bookTitle, authorName);
    library.push(newBook);
    saveToLocalStorage();
    displayBooks();
    document.getElementById('add-feedback').textContent = "Book added successfully.";
}

function removeBook(id) {
    const index = library.findIndex(book => book.id === id);
    if (index !== -1) {
        library.splice(index, 1);
        saveToLocalStorage();
        displayBooks();
    }
}

function toggleBorrow(book) {
    book.isBorrowed = !book.isBorrowed;
    saveToLocalStorage();
    displayBooks();
}

function saveToLocalStorage() {
    localStorage.setItem('library', JSON.stringify(library));
}

function displayBooks() {
    const bookDisplay = document.getElementById('book-display');
    bookDisplay.innerHTML = '';

    library.forEach(book => {
        const li = document.createElement('li');
        li.textContent = `ID: ${book.id}, Title: ${book.title}, Author: ${book.author}, Status: ${book.isBorrowed ? 'Borrowed' : 'Available'}`;

        const borrowButton = document.createElement('button');
        borrowButton.textContent = book.isBorrowed ? 'Return' : 'Borrow';
        borrowButton.onclick = () => toggleBorrow(book);

        const removeButton = document.createElement('button');
        removeButton.textContent = 'Remove';
        removeButton.onclick = () => removeBook(book.id);

        li.appendChild(borrowButton);
        li.appendChild(removeButton);
        bookDisplay.appendChild(li);
    });
}

function searchBook() {
    const searchTitle = document.getElementById('search-title').value.trim().toLowerCase();
    const foundBooks = library.filter(book => book.title.toLowerCase().includes(searchTitle));

    if (foundBooks.length === 0) {
        document.getElementById('search-feedback').textContent = "No books found.";
        return;
    }

    const bookDisplay = document.getElementById('book-display');
    bookDisplay.innerHTML = '';

    foundBooks.forEach(book => {
        const li = document.createElement('li');
        li.textContent = `ID: ${book.id}, Title: ${book.title}, Author: ${book.author}, Status: ${book.isBorrowed ? 'Borrowed' : 'Available'}`;

        const borrowButton = document.createElement('button');
        borrowButton.textContent = book.isBorrowed ? 'Return' : 'Borrow';
        borrowButton.onclick = () => toggleBorrow(book);

        const removeButton = document.createElement('button');
        removeButton.textContent = 'Remove';
        removeButton.onclick = () => removeBook(book.id);

        li.appendChild(borrowButton);
        li.appendChild(removeButton);
        bookDisplay.appendChild(li);
    });

    document.getElementById('search-feedback').textContent = "";
}
