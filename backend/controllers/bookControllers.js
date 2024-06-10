const Book = require('../models/bookModel');

// Add a book
exports.addBook = async (req, res) => {
    try {
        const { title, author, isbn } = req.body;
        console.log('Received data:', req.body);  // Debugging log

        // Validate input data
        if (!title || !author || !isbn) {
            return res.status(400).json({ message: 'All fields are required.' });
        }

        const book = new Book({ title, author, isbn });
        await book.save();
        console.log('Book saved:', book);  // Debugging log
        res.status(201).json(book);
    } catch (err) {
        console.error('Error saving book:', err);  // Debugging log
        res.status(500).json({ error: err.message });
    }
};

// Get all books
exports.getBooks = async (req, res) => {
    try {
        const books = await Book.find();
        res.status(200).json(books);
    } catch (err) {
        console.error('Error fetching books:', err);  // Debugging log
        res.status(500).json({ error: err.message });
    }
};

// Search a book by ISBN
exports.searchBook = async (req, res) => {
    try {
        const { isbn } = req.params;
        const book = await Book.findOne({ isbn });
        if (book) {
            res.status(200).json(book);
        } else {
            res.status(404).json({ message: 'Book not found' });
        }
    } catch (err) {
        console.error('Error searching book:', err);  // Debugging log
        res.status(500).json({ error: err.message });
    }
};

// Remove a book by ISBN
exports.removeBook = async (req, res) => {
    try {
        const { isbn } = req.params;
        const book = await Book.findOneAndDelete({ isbn });
        if (book) {
            res.status(200).json({ message: 'Book removed successfully' });
        } else {
            res.status(404).json({ message: 'Book not found' });
        }
    } catch (err) {
        console.error('Error removing book:', err);  // Debugging log
        res.status(500).json({ error: err.message });
    }
};
