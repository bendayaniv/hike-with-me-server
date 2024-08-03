const firebase = require('../dal/firebase.js');

async function getAllUsersDB() {
  const snapshot = await firebase.database.ref('users').once('value');
  return snapshot.val();
}

async function getUserByIdDB(id) {
  const snapshot = await firebase.database.ref('users/' + id).once('value');
  return snapshot.val();
}

async function addUserDB(user) {
  await firebase.database.ref('users/' + user.id).set(user);
}

async function updateUserDB(user) {
  await firebase.database.ref('users/' + user.id).update(user);
}

async function deleteUserDB(id) {
  await firebase.database.ref('users/' + id).remove();
}

function distanceMeasurement(coords1, coords2) {
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
  getAllUsersDB,
  getUserByIdDB,
  addUserDB,
  updateUserDB,
  deleteUserDB,
  distanceMeasurement,
};
