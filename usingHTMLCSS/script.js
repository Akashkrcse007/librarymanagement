// let books = [];

// function addBook() {
//     const title = document.getElementById('title').value;
//     const author = document.getElementById('author').value;
//     const isbn = document.getElementById('isbn').value;

//     if (title && author && isbn) {
//         books.push({ title, author, isbn });
//         document.getElementById('title').value = '';
//         document.getElementById('author').value = '';
//         document.getElementById('isbn').value = '';
//         displayBooks();
//         alert('Book added successfully!');
//     } else {
//         alert('Please fill out all fields.');
//     }
// }

// function displayBooks() {
//     const bookList = document.getElementById('book-list');
//     bookList.innerHTML = '';
//     books.forEach((book, index) => {
//         const li = document.createElement('li');
//         li.innerHTML = `<strong>${book.title}</strong> by ${book.author} (ISBN: ${book.isbn})`;
//         bookList.appendChild(li);
//     });
// }

// function searchBook() {
//     const isbn = document.getElementById('search-isbn').value;
//     const book = books.find(book => book.isbn === isbn);

//     if (book) {
//         alert(`Book found: ${book.title} by ${book.author}`);
//     } else {
//         alert('Book not found.');
//     }
// }

// function removeBook() {
//     const isbn = document.getElementById('search-isbn').value;
//     const initialLength = books.length;
//     books = books.filter(book => book.isbn !== isbn);

//     if (books.length < initialLength) {
//         displayBooks();
//         alert('Book removed successfully!');
//     } else {
//         alert('Book not found.');
//     }
// }





function addBook() {
    const title = document.getElementById('title').value;
    const author = document.getElementById('author').value;
    const isbn = document.getElementById('isbn').value;

    if (title && author && isbn) {
        // Send a POST request to the backend API
        fetch('http://localhost:3000/api/books', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ title, author, isbn })
        })
        .then(response => response.json())
        .then(data => {
            console.log('Book added:', data);
            document.getElementById('title').value = '';
            document.getElementById('author').value = '';
            document.getElementById('isbn').value = '';
            displayBooks();
            alert('Book added successfully!');
        })
        .catch(error => {
            console.error('Error adding book:', error);
            alert('Failed to add book.');
        });
    } else {
        alert('Please fill out all fields.');
    }
}

function displayBooks() {
    fetch('http://localhost:3000/api/books')
        .then(response => response.json())
        .then(data => {
            const bookList = document.getElementById('book-list');
            bookList.innerHTML = '';
            data.forEach(book => {
                const li = document.createElement('li');
                li.innerHTML = `<strong>${book.title}</strong> by ${book.author} (ISBN: ${book.isbn})`;
                bookList.appendChild(li);
            });
        })
        .catch(error => {
            console.error('Error fetching books:', error);
            alert('Failed to fetch books.');
        });
}

function searchBook() {
    const isbn = document.getElementById('search-isbn').value;
    fetch(`http://localhost:3000/api/books/${isbn}`)
        .then(response => response.json())
        .then(data => {
            if (data) {
                alert(`Book found: ${data.title} by ${data.author}`);
            } else {
                alert('Book not found.');
            }
        })
        .catch(error => {
            console.error('Error searching book:', error);
            alert('Failed to search book.');
        });
}

function removeBook() {
    const isbn = document.getElementById('search-isbn').value;
    fetch(`http://localhost:3000/api/books/${isbn}`, {
        method: 'DELETE'
    })
    .then(response => response.json())
    .then(data => {
        if (data.message === 'Book removed successfully') {
            displayBooks();
            alert('Book removed successfully!');
        } else {
            alert('Book not found.');
        }
    })
    .catch(error => {
        console.error('Error removing book:', error);
        alert('Failed to remove book.');
    });
}
