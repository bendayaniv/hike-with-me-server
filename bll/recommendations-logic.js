const firebase = require('../dal/firebase.js');

async function getRecommendationsByRoute(route) {
  const snapshot = await firebase.database
    .ref('recommendations/' + route)
    .once('value');
  return snapshot.val();
}

async function addRecommendation(recommendation) {
  await firebase.database
    .ref(
      'recommendations/' + recommendation.routeName + '/' + recommendation.id,
    )
    .set(recommendation);
}

module.exports = {
  getRecommendationsByRoute,
  addRecommendation,
};
