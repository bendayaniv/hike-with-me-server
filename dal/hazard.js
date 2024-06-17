const firebase = require('./firebase.js');

async function getAllHazardsDB() {
  const snapshot = await firebase.database.ref('hazards').once('value');
  return snapshot.val();
}

async function getAllHazardsByRouteDB(routeName) {
  const snapshot = await firebase.database
    .ref('hazards/' + routeName)
    .once('value');
  return snapshot.val();
}

async function addHazardDB(hazard) {
  await firebase.database
    .ref('hazards/' + hazard.getRouteName() + '/' + hazard.getId())
    .set(hazard);
}

module.exports = {
  getAllHazardsDB,
  getAllHazardsByRouteDB,
  addHazardDB,
};
