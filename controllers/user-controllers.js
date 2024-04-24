const express = require('express');
const { database } = require('../dal/firebase.js');
const usersLogic = require('../bll/users-logic.js');

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    // database.ref('users').on('value', (snapshot) => {
    //   const data = snapshot.val();
    //   res.status(200).send(data);
    // });
    const users = await usersLogic.getAllUsers();
    const dataArray = Object.values(users).map((item) => ({
      id: item.id,
      name: item.name,
      email: item.email,
      password: item.password,
      phoneNumber: item.phoneNumber,
    }));
    res.status(200).send(dataArray);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    // const snapshot = await database.ref('users/' + id).once('value');
    // const data = snapshot.val();
    const user = await usersLogic.getUserById(id);
    res.status(200).send(user);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post('/addUser', async (req, res) => {
  const { name, email, password, phoneNumber } = req.body;

  const user = {
    id: (email + password).replace(/[.]/g, ''),
    name,
    password,
    email,
    phoneNumber,
  };

  try {
    // const directory = (email + password).replace(/[.]/g, '');
    // await database.ref('users/' + directory).set(user);
    await usersLogic.addUser(user);
    res.status(200).send(user);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const user = req.body;
  user.id = id;

  try {
    // await database.ref('users/' + id).update(user);
    await usersLogic.updateUser(id, user);
    res.status(200).send(user);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.delete('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    // await database.ref('users/' + id).remove();
    await usersLogic.deleteUser(id);
    res.status(200).send('User deleted');
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
