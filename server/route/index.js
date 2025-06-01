const express = require('express');
const router = express.Router();
const bookController = require('../controller/controler');
const userController = require('../controller/usercontr');
const passport = require('passport');

// Auth middleware using Passport's built-in method
function isAuthenticated(req, res, next) {
  console.log('Auth check - isAuthenticated:', req.isAuthenticated());
  if (req.isAuthenticated()) {
    return next();
  }
  return res.status(401).json({ message: 'Unauthorized - Please log in first' });
}

// Public routes
router.get('/doc-link', (req, res) => {
  res.json({ documentation: 'https://bookstore-api-docs.herokuapp.com/api-docs/' });
});

// Auth routes
router.get('/login', passport.authenticate('github'));

router.get('/logout', (req, res, next) => {
  req.logout((err) => {
    if (err) {
      console.error('Logout error:', err);
      return next(err);
    }
    req.session.destroy();
    console.log('User logged out successfully');
    res.redirect('/');
  });
});

// Protected Book Routes
router.get('/books', isAuthenticated, bookController.getAllBooks);
router.post('/books', isAuthenticated, bookController.addBooks);
router.get('/books/:id', isAuthenticated, bookController.getBookById);
router.put('/books/:id', isAuthenticated, bookController.updateBook);
router.delete('/books/:id', isAuthenticated, bookController.deleteBook);

// Protected User Routes
router.get('/users', isAuthenticated, userController.getAllUsers);
router.get('/users/:id', isAuthenticated, userController.getUserById);
router.post('/users', isAuthenticated, userController.addUser);
router.put('/users/:id', isAuthenticated, userController.updateUser);
router.delete('/users/:id', isAuthenticated, userController.deleteUser);

module.exports = router;