const db = require('../dal/realtimeDB.js');

async function getAllUsers() {
  const snapshot = await db.database.ref('users').once('value');
  return snapshot.val();
}

async function getUserById(id) {
  const snapshot = await db.database.ref('users/' + id).once('value');
  return snapshot.val();
}

async function addUser(user) {
  await db.database.ref('users/' + user.id).set(user);
}

async function updateUser(user) {
  await db.database.ref('users/' + user.id).update(user);
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
