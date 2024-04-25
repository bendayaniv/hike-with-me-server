const db = require('../dal/firebase.js');

async function getAllHazardsByRoute(route) {
  const snapshot = await db.database.ref('hazards/' + route).once('value');
  return snapshot.val();
}

async function addHazard(hazard) {
  await db.database
    .ref('hazards/' + hazard.route.name + '/' + hazard.id)
    .set(hazard);
}

module.exports = {
  getAllHazardsByRoute,
  addHazard,
};
