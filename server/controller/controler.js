const Book = require('../schema/books');

// Get all books
const getAllBooks = async (req, res) => {
  try {
    const books = await Book.find();
    console.log('Books retrieved successfully');
    res.send(books);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get book by ID
const getBookById = async (req, res) => {
  const { id } = req.params;
  try {
    const bookData = await Book.findById(id);
    if (!bookData) {
      return res.status(404).json({ message: 'Book not found' });
    }
    console.log('Book retrieved successfully');
    res.send(bookData);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Add a new book with validation
const addBooks = async (req, res) => {
  const {
    title,
    author,
    isbn,
    publisher,
    publicationDate,
    genre,
    pageCount,
  } = req.body;

  if (
    !title ||
    !author ||
    !isbn ||
    !publisher ||
    !publicationDate ||
    !genre ||
    !pageCount
  ) {
    return res.status(400).send({ message: 'All fields are required.' });
  }

  try {
    const newBook = new Book(req.body);
    const savedBook = await newBook.save();
    res.status(201).send(savedBook);
    console.log('book added successfully');
  } catch (error) {
    console.error('Error adding book:', error);
    res.status(400).send({ message: error.message });
  }
};

// Update book with validation
const updateBook = async (req, res) => {
  const { id } = req.params;

  if (!req.body || Object.keys(req.body).length === 0) {
    return res.status(400).send({ message: 'Update data is required.' });
  
  }
  try {
    const updatedBook = await Book.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });
    console.log('Book updated successfully');
    if (!updatedBook) {
      return res.status(404).send({ message: 'Book not found' });
    }
    res.status(200).send(updatedBook);
  } catch (error) {
      res.status(500).send({ message: error.message });
  }
};

// Delete a book
const deleteBook = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedBook = await Book.findByIdAndDelete(id);
    if (!deletedBook) {
      return res.status(404).json({ message: 'Book not found' });
    }
    res.status(200).send({ message: 'Book deleted successfully' });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

// Export all handlers
module.exports = {
  getAllBooks,
  getBookById,
  addBooks,
  updateBook,
  deleteBook,
};
