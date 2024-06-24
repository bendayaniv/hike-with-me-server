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

module.exports = {
  getAllActiveUsers,
  getUserById,
};
