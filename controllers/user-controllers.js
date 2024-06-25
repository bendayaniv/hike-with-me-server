const express = require('express');
const {
  getAllActiveUsers,
  getUserById,
  addUser,
  updateUser,
  deleteUser,
} = require('../bll/users-logic.js');

const router = express.Router();

router.get('/getAllActiveUsers/:userId', getAllActiveUsers);

router.get('/:id', getUserById);

router.post('/addUser', addUser);

router.put('/', updateUser);

router.delete('/:id', deleteUser);

module.exports = router;
