const express = require('express');
const router = express.Router();
const bookController = require('../controller/controler');
const userController = require('../controller/usercontr');
const passport = require('passport');

// Auth middleware
function isAuthenticated(req, res, next) {
  if (req.session.user === undefined) {
    return res.status(401).send('Unauthorized: No session available');
  }
  next();
}

// Public doc route
router.get('/doc-link', (req, res) => {
  res.send({ documentation: 'https://bookstore-api-docs.herokuapp.com/api-docs/' });
});

// // GitHub login route
// router.get('/auth/github', passport.authenticate('github', { scope: ['user:email'] }));

// Login status check
router.get('/login', passport.authenticate('github'), (req, res) => {})

router.get('/logout', (req, res, next) => {
  req.logout(function(err) {
    if (err) { return next(err); }
    res.redirect('/'); // Redirect to home after logout
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
