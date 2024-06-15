const express = require('express');
const usersLogic = require('../bll/users-logic.js');
const User = require('../models/user.js');

const router = express.Router();

router.get('/getAllActiveUsers/:userId', async (req, res) => {
  const { userId } = req.params;
  try {
    const users = await usersLogic.getAllUsers();

    const usersArray = Object.values(users).map(
      (item) =>
        new User(
          item.id,
          item.name,
          item.email,
          item.password,
          item.phoneNumber,
          item.hometown,
          item.active,
          item.location,
        ),
    );

    const currentUser = await usersLogic.getUserById(userId);

    const coords1 = {
      lat: parseFloat(currentUser.location.latitude),
      lon: parseFloat(currentUser.location.longitude),
    };

    const dataArray = usersArray.reduce((acc, item) => {
      const user = new User(
        item.id,
        item.name,
        item.email,
        item.password,
        item.phoneNumber,
        item.hometown,
        item.active,
        item.location,
      );
      if (user.id !== userId && user.active === true) {
        const coords2 = {
          lat: parseFloat(user.getLocation().latitude),
          lon: parseFloat(user.getLocation().longitude),
        };

        const distance = usersLogic
          .haversineDistance(coords1, coords2)
          .toFixed(2);

        acc.push({ user, distance });
      }
      return acc;
    }, []);

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
  const { id, name, email, password, phoneNumber, hometown, active, location } =
    req.body;

  if (!name || !email || !password || !phoneNumber || !hometown) {
    res.status(400).send('All fields are required');
    return;
  }

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
    await usersLogic.addUser(user);
    res.status(200).send(user);
  } catch (err) {
    res.status(500).json(err);
  }
});

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
  const { email, password, phoneNumber } = req.body;

  if (!email || !password || !phoneNumber) {
    res.status(400).send('All fields are required');
    return;
  }

  const emailValidation = usersLogic.checkingEmail(email);
  const passwordValidation = usersLogic.checkingPassword(password);
  const phoneNumberValidation = usersLogic.checkingPhoneNumber(phoneNumber);

  try {
    if (!emailValidation) {
      return res.status(400).send('Invalid email');
    }

    if (!passwordValidation) {
      return res.status(400).send('Invalid password');
    }

    if (!phoneNumberValidation) {
      return res.status(400).send('Invalid phone number');
    }

    const allUsers = await usersLogic.getAllUsers();

    const user = Object.values(allUsers).find(
      (item) =>
        (item.email === email && item.password === password) ||
        item.phoneNumber === phoneNumber,
    );

    if (user) {
      return res
        .status(400)
        .send(
          'User already exist with this email and password, or phone number',
        );
    }

    res.status(200).send('User validated successfully');
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
