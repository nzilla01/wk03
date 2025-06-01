const express = require('express');
const router = express.Router();
const bookController = require('../controller/controler');
const userController = require('../controller/usercontr');
const passport = require('passport');

// Auth middleware
function isAuthenticated(req, res, next) {
  if (req.isAuthenticated()) return next();
  res.status(401).send('Unauthorized: Please login with GitHub');
}

// Public doc route
router.get('/doc-link', (req, res) => {
  res.send({ documentation: 'https://bookstore-api-docs.herokuapp.com/api-docs/' });
});

// GitHub login route
router.get('/auth/github', passport.authenticate('github', { scope: ['user:email'] }));

// GitHub callback route
router.get('/github/callback',
  passport.authenticate('github', { failureRedirect: '/login' }),
  (req, res) => {
    res.send(`Welcome ${req.user.username}, you have successfully logged in via GitHub.`);
  }
);

// Login status check
router.get('/login', (req, res) => {
  if (req.isAuthenticated()) {
    return res.send(`Welcome back ${req.user.username}`);
  }
  res.send('<a href="/auth/github">Login with GitHub</a>');
});

// Logout route
router.get('/logout', (req, res, next) => {
  req.logout(err => {
    if (err) return next(err);
    res.send('You have been logged out.');
  });
});

// Debug route (optional)
router.get('/me', (req, res) => {
  res.send(req.user || 'Not logged in');
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
