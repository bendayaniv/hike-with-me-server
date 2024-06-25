const express = require('express');
const {
  getAllActiveUsers,
  getUserById,
  addUser,
} = require('../bll/users-logic.js');
const User = require('../models/user.js');

const router = express.Router();

router.get('/getAllActiveUsers/:userId', getAllActiveUsers);

router.get('/:id', getUserById);

router.post('/addUser', addUser);

router.put('/', async (req, res) => {
  const { id, name, email, password, phoneNumber, hometown, active, location } =
    req.body;
  const user = new User(
    id,
    name,
    email,
    password,
    phoneNumber,
    hometown,
    active,
    location,
  );

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

router.get('/validateUser', async (req, res) => {
  const { name, email, password, phoneNumber } = req.body;

  if (!name || !email || !password || !phoneNumber) {
    res.status(400).send('All fields are required');
    return;
  }

  const emailValidation = usersLogic.checkingEmail(email);
  const passwordValidation = usersLogic.checkingPassword(password);
  const phoneNumberValidation = usersLogic.checkingPhoneNumber(phoneNumber);

  try {
    if (!emailValidation) {
      res.status(400);
      res.send('Invalid email');
      return;
    }

    if (!passwordValidation) {
      res.status(400);
      res.send('Invalid password');
      return;
    }

    if (!phoneNumberValidation) {
      res.status(400);
      res.send('Invalid phone number');
      return;
    }

    const allUsers = await usersLogic.getAllUsers();

    const user = Object.values(allUsers).find(
      (item) => item.email === email || item.phoneNumber === phoneNumber,
    );

    if (user) {
      res.status(400);
      res.send(
        'User already exist with this email and password, or phone number',
      );
      return;
    }

    res.status(200).send('User validated successfully');
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
