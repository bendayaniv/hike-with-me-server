const firebase = require('./firebase.js');

async function getRecommendationsByRouteFromDB(routeName) {
  const snapshot = await firebase.database
    .ref('recommendations/' + routeName)
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
  getRecommendationsByRouteFromDB,
  addRecommendation,
};
