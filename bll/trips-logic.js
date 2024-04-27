const db = require('../dal/realtimeDB.js');

async function getTripsByUser(userId) {
  const snapshot = await db.database.ref('trips/' + userId).once('value');
  return snapshot.val();
}

async function createTrip(trip) {
  await db.database.ref('trips/' + trip.userId + '/' + trip.id).set(trip);
}

async function updateTrip(trip, userId) {
  await db.database.ref('trips/' + userId + '/' + trip.id).update(trip);
}

async function deleteTrip(userId, tripId) {
  await db.database.ref('trips/' + userId + '/' + tripId).remove();
}

module.exports = {
  getTripsByUser,
  createTrip,
  updateTrip,
  deleteTrip,
};
