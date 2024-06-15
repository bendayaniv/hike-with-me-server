const firebase = require('../dal/firebase.js');
const fireBaseReccomendation = require('../dal/reccomendation.js');
const Recommendation = require('../models/recommendation.js');

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

async function createReccomendation(req, res) {
  const { id, rate, description, reporterName, routeName } = req.body;

  if (!rate || isNaN(rate)) {
    res.status(400);
    res.send('Please provide rate');
    return;
  }

  if (!description) {
    res.status(400);
    res.send('Please provide description');
    return;
  }

  if (!routeName) {
    res.status(400);
    res.send('Please provide routeName');
    return;
  }

  const recommendation = new Recommendation(
    id,
    rate,
    description,
    reporterName,
    routeName,
  );

  try {
    await fireBaseReccomendation.addRecommendation(recommendation);
    res.status(200);
    res.send(recommendation);
  } catch (err) {
    res.status(500);
    res.json(err);
  }
}

module.exports = {
  getRecommendationsByRoute,
  addRecommendation,
  createReccomendation,
};
