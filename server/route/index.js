const express = require('express');
const router = express.Router();
const bookController = require('../controller/controler');
const userController = require('../controller/usercontr');

router.get('/doc-link', (req, res) => {
  let docData = {
    documentation: 'https://bookstore-api-docs.herokuapp.com/api-docs/',
  };
  res.send(docData);
});

// Books routes
router.get('/', bookController.getAllBooks);
router.post('/', bookController.addBooks);
router.get('/:id', bookController.getBookById);
router.put('/:id', bookController.updateBook);
router.delete('/:id', bookController.deleteBook);

// Users routes
router.get('/users', userController.getAllUsers);
router.get('/users/:id', userController.getUserById);
router.post('/users', userController.addUser);
router.put('/users/:id', userController.updateUser);
router.delete('/users/:id', userController.deleteUser);

module.exports = router;
