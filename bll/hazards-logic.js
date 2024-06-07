const firebase = require('../dal/firebase.js');

async function getAllHazards() {
  const snapshot = await firebase.database.ref('hazards').once('value');
  return snapshot.val();
}

async function getAllHazardsByRoute(routeName) {
  const snapshot = await firebase.database
    .ref('hazards/' + routeName)
    .once('value');
  return snapshot.val();
}

async function addHazard(hazard) {
  await firebase.database
    .ref('hazards/' + hazard.routeName + '/' + hazard.id)
    .set(hazard);
}

module.exports = {
  getAllHazards,
  getAllHazardsByRoute,
  addHazard,
};
