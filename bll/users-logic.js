const db = require('../firebase.js');

async function getAllUsers() {
  const snapshot = await db.database.ref('users').once('value');
  return snapshot.val();
}

async function getUserById(id) {
  const snapshot = await db.database.ref('users/' + id).once('value');
  return snapshot.val();
}

async function addUser(user) {
  const directory = (user.email + user.password).replace(/[.]/g, '');
  await db.database.ref('users/' + directory).set(user);
}

async function updateUser(id, user) {
  await db.database.ref('users/' + id).update(user);
}

async function deleteUser(id) {
  await db.database.ref('users/' + id).remove();
}

module.exports = {
  getAllUsers,
  getUserById,
  addUser,
  updateUser,
  deleteUser,
};
