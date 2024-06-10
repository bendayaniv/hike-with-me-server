const express = require('express');
const usersLogic = require('../bll/users-logic.js');
const User = require('../models/user.js');

const router = express.Router();

router.get('/', async (req, res) => {
  const { userId } = req.body;
  try {
    const users = await usersLogic.getAllUsers();

    const dataArray = Object.values(users)
      .map(
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
      )
      .flat()
      .filter((user) => user.id !== userId && user.id !== null);

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

  if (
    !id ||
    !name ||
    !email ||
    !password ||
    !phoneNumber ||
    !hometown ||
    !location
  ) {
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

router.get('/:userPhoneNumber/:userEmail', async (req, res) => {
  const { location1, location2 } = req.body;

  if (
    !location1.latitude ||
    !location1.longitude ||
    !location2.latitude ||
    !location2.longitude
  ) {
    return res
      .status(400)
      .send('Missing required query parameters: lat1, lon1, lat2, lon2');
  }

  const coords1 = {
    lat: parseFloat(location1.latitude),
    lon: parseFloat(location1.longitude),
  };
  const coords2 = {
    lat: parseFloat(location2.latitude),
    lon: parseFloat(location2.longitude),
  };

  // Check if parsing was successful
  if (
    isNaN(coords1.lat) ||
    isNaN(coords1.lon) ||
    isNaN(coords2.lat) ||
    isNaN(coords2.lon)
  ) {
    return res.status(400).send('Invalid latitude or longitude values.');
  }

  try {
    const distance = await usersLogic.haversineDistance(coords1, coords2);

    console.log(distance);
    res.status(200).send(distance.toFixed(2));
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
