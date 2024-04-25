const db = require('../dal/firebase.js');

async function getTripsByUser(id) {
  const snapshot = await db.database.ref('trips/' + id).once('value');
  return snapshot.val();
}

async function createTrip(trip) {
  await db.database
    .ref(
      'trips/' +
        (trip.user.email + trip.user.password).replace(/[.]/g, '') +
        '/' +
        trip.id,
    )
    .set(trip);
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
