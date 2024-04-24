const db = require('../dal/firebase.js');

async function getAllRoutes() {
  const snapshot = await db.database.ref('routes').once('value');
  return snapshot.val();
}

async function getRouteByName(name) {
  const snapshot = await db.database.ref('routes/' + name).once('value');
  return snapshot.val();
}

async function addRoute(route) {
  await db.database.ref('routes/' + route.name).set(route);
}

module.exports = {
  getAllRoutes,
  getRouteByName,
  addRoute,
};
