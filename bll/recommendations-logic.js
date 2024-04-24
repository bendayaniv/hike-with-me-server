const db = require('../dal/firebase.js');

async function getRecommendationsByRoute(route) {
  const snapshot = await db.database
    .ref('recommendations/' + route)
    .once('value');
  return snapshot.val();
}

async function addRecommendation(recommendation) {
  await db.database
    .ref('recommendations/' + recommendation.route + '/' + recommendation.id)
    .set(recommendation);
}

module.exports = {
  getRecommendationsByRoute,
  addRecommendation,
};
