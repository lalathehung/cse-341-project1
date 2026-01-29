const router = require('express').Router();
const usersController = require('../controllers/users');

// GET all users
router.get('/', usersController.getAll);

// GET single user by id
router.get('/:id', usersController.getSingle);

// POST create new user
router.post('/', usersController.createUser);

// PUT update user by id
router.put('/:id', usersController.updateUser);

// DELETE user by id
router.delete('/:id', usersController.deleteUser);

module.exports = router;