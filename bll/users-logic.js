const {
  getAllUsersDB,
  getUserByIdDB,
  addUserDB,
  updateUserDB,
  deleteUserDB,
  haversineDistance,
  checkingEmail,
  checkingPassword,
  checkingPhoneNumber,
} = require('../dal/user.js');
const User = require('../models/user.js');

const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

const phoneRegex = /^\d{10}$/;

async function getAllActiveUsers(req, res) {
  const { userId } = req.params;

  if (!userId) {
    res.status(400);
    res.send('Please provide userId');
    return;
  }

  try {
    const users = await getAllUsersDB();

    if (!users || users.length === 0) {
      res.status(404);
      res.send('No users found');
      return;
    }

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

    const currentUser = await getUserByIdDB(userId);

    if (!currentUser) {
      res.status(404);
      res.send('No user found');
      return;
    }

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

        const distance = haversineDistance(coords1, coords2);

        acc.push({ user: user, distance: distance });
      }
      return acc;
    }, []);

    if (!dataArray || dataArray.length === 0) {
      res.status(404);
      res.send('No active users found');
      return;
    }

    dataArray.sort((a, b) => a.distance - b.distance);

    res.status(200);
    res.send(dataArray);
  } catch (err) {
    res.status(500);
    console.log('err: ', err);
    res.send(err);
  }
}

async function getUserById(req, res) {
  const { id } = req.params;

  if (!id) {
    res.status(400);
    res.send('Please provide userId');
    return;
  }

  try {
    const user = await getUserByIdDB(id);

    if (!user) {
      res.status(404);
      res.send('User not found');
      return;
    }

    res.status(200);
    res.send(user);
  } catch (err) {
    res.status(500).json(err);
  }
}

async function addUser(req, res) {
  const { id, name, email, password, phoneNumber, hometown, active, location } =
    req.body;

  if (!id) {
    res.status(400);
    res.send('Please provide id');
    return;
  }

  if (!name) {
    res.status(400);
    res.send('Please provide name');
    return;
  }

  if (!email) {
    res.status(400);
    res.send('Please provide email');
    return;
  }

  if (!emailRegex.test(email)) {
    res.status(400);
    res.send('Please provide correct email');
    return;
  }

  if (!password) {
    res.status(400);
    res.send('Please provide password');
    return;
  }

  if (!(password.length >= 6)) {
    res.status(400);
    res.send('Please provide correct password');
    return;
  }

  const allUsers = await getAllUsersDB();

  const user = Object.values(allUsers).find(
    (item) => item.email === email || item.password === password,
  );

  if (user) {
    res.status(400);
    res.send('User already exist with this email or password');
    return;
  }

  if (!phoneNumber) {
    res.status(400);
    res.send('Please provide phoneNumber');
    return;
  }

  if (!phoneRegex.test(phoneNumber) || phoneNumber.length !== 10) {
    res.status(400);
    res.send('Please provide correct phoneNumber');
    return;
  }

  if (!hometown) {
    res.status(400);
    res.send('Please provide hometown');
    return;
  }

  if (!location) {
    location = [];
  }

  const newUser = new User(
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
    await addUserDB(newUser);
    res.status(200);
    res.send(newUser);
  } catch (err) {
    res.status(500);
    res.json(err);
  }
}

async function updateUser(req, res) {
  const { id, name, email, password, phoneNumber, hometown, active, location } =
    req.body;

  if (!id) {
    res.status(400);
    res.send('Please provide id');
    return;
  }

  if (!name) {
    res.status(400);
    res.send('Please provide name');
    return;
  }

  if (!email) {
    res.status(400);
    res.send('Please provide email');
    return;
  }

  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  if (!emailRegex.test(email)) {
    res.status(400);
    res.send('Please provide correct email');
    return;
  }

  if (!password) {
    res.status(400);
    res.send('Please provide password');
    return;
  }

  if (!(password.length >= 6)) {
    res.status(400);
    res.send('Please provide correct password');
    return;
  }

  if (!phoneNumber) {
    res.status(400);
    res.send('Please provide phoneNumber');
    return;
  }

  if (!phoneRegex.test(phoneNumber) || phoneNumber.length !== 10) {
    res.status(400);
    res.send('Please provide correct phoneNumber');
    return;
  }

  if (!hometown) {
    res.status(400);
    res.send('Please provide hometown');
    return;
  }

  if (!location) {
    location = [];
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
    await updateUserDB(user);
    res.status(200).send(user);
  } catch (err) {
    res.status(500).json(err);
  }
}

async function deleteUser(req, res) {
  const { id } = req.params;

  if (!id) {
    res.status(400);
    res.send('Please provide userId');
    return;
  }

  try {
    const user = await getUserByIdDB(id);

    if (!user) {
      res.status(404);
      res.send('User not found');
      return;
    }

    await deleteUserDB(id);
    res.status(200).send('User deleted');
  } catch (err) {
    res.status(500).json(err);
  }
}

module.exports = {
  getAllActiveUsers,
  getUserById,
  addUser,
  updateUser,
  deleteUser,
};
