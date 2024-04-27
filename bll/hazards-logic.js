const db = require('../dal/realtimeDB.js');

async function getAllHazardsByRoute(routeName) {
  const snapshot = await db.database.ref('hazards/' + routeName).once('value');
  return snapshot.val();
}

async function addHazard(hazard) {
  await db.database
    .ref('hazards/' + hazard.routeName + '/' + hazard.id)
    .set(hazard);
}

module.exports = {
  getAllHazardsByRoute,
  addHazard,
};
