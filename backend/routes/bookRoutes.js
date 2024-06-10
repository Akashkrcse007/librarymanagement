const express = require('express');
const router = express.Router();
const bookController = require('../controllers/bookControllers');

// Add a book
router.post('/books', bookController.addBook);

// Get all books
router.get('/books', bookController.getBooks);

// Search a book by ISBN
router.get('/books/:isbn', bookController.searchBook);

// Remove a book by ISBN
router.delete('/books/:isbn', bookController.removeBook);

module.exports = router;
