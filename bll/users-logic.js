const firebase = require('../dal/firebase.js');

async function getAllUsers() {
  const snapshot = await firebase.database.ref('users').once('value');
  return snapshot.val();
}

async function getUserById(id) {
  const snapshot = await firebase.database.ref('users/' + id).once('value');
  return snapshot.val();
}

async function addUser(user) {
  await firebase.database.ref('users/' + user.id).set(user);
}

async function updateUser(user) {
  await firebase.database.ref('users/' + user.id).update(user);
}

async function deleteUser(id) {
  await firebase.database.ref('users/' + id).remove();
}

async function haversineDistance(coords1, coords2) {
  const R = 6371; // Radius of Earth in kilometers
  const lat1 = coords1.lat;
  const lon1 = coords1.lon;
  const lat2 = coords2.lat;
  const lon2 = coords2.lon;

  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;

  const sinDLat = Math.sin(dLat / 2);
  const sinDLon = Math.sin(dLon / 2);
  const cosLat1 = Math.cos((lat1 * Math.PI) / 180);
  const cosLat2 = Math.cos((lat2 * Math.PI) / 180);

  const a = sinDLat * sinDLat + cosLat1 * cosLat2 * sinDLon * sinDLon;

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = R * c;

  return distance;
}

module.exports = {
  getAllUsers,
  getUserById,
  addUser,
  updateUser,
  deleteUser,
  haversineDistance,
};
