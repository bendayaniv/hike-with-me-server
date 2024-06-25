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

function haversineDistance(coords1, coords2) {
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

function checkingEmail(email) {
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return emailRegex.test(email);
}

function checkingPassword(password) {
  //   const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
  //   return passwordRegex.test(password);
  return password.length >= 6;
}

function checkingPhoneNumber(phoneNumber) {
  const phoneRegex = /^\d{10}$/;
  return phoneRegex.test(phoneNumber) && phoneNumber.length === 10;
}

module.exports = {
  getAllUsersDB,
  getUserByIdDB,
  addUserDB,
  updateUserDB,
  deleteUserDB,
  haversineDistance,
  checkingEmail,
  checkingPassword,
  checkingPhoneNumber,
};
