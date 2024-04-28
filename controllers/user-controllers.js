const express = require('express');
const usersLogic = require('../bll/users-logic.js');
const User = require('../models/user.js');

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const users = await usersLogic.getAllUsers();
    const dataArray = Object.values(users).map(
      (item) =>
        new User(
          item.id,
          item.name,
          item.email,
          item.password,
          item.phoneNumber,
        ),
    );
    console.log(dataArray);
    res.status(200).send(dataArray);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const user = await usersLogic.getUserById(id);
    res.status(200).send(user);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post('/addUser', async (req, res) => {
  const { id, name, email, password, phoneNumber } = req.body;

  const user = new User(id, name, email, password, phoneNumber);

  try {
    await usersLogic.addUser(user);
    res.status(200).send(user);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.put('/', async (req, res) => {
  const { id, name, email, password, phoneNumber } = req.body;
  const user = new User(id, name, email, password, phoneNumber);

  try {
    await usersLogic.updateUser(user);
    res.status(200).send(user);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.delete('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    await usersLogic.deleteUser(id);
    res.status(200).send('User deleted');
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
