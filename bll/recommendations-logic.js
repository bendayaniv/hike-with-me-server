const {
  getRecommendationsByRouteFromDB,
  addRecommendation,
} = require('../dal/recommendation.js');
const Recommendation = require('../models/recommendation.js');

async function getRecommendationsByRoute(req, res) {
  const { routeName } = req.params;
  try {
    const recommendations = await getRecommendationsByRouteFromDB(routeName);

    if (!recommendations || recommendations.length === 0) {
      res.status(404);
      res.send('No recommendations found');
      return;
    }

    const dataArray = Object.values(recommendations).map(
      (item) =>
        new Recommendation(
          item.id,
          item.rate,
          item.description,
          item.reporterName,
          item.routeName,
        ),
    );
    res.status(200);
    res.send(dataArray);
  } catch (err) {
    res.status(500);
    res.json(err);
  }
}

async function createRecommendation(req, res) {
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
    await addRecommendation(recommendation);
    res.status(200);
    res.send(recommendation);
  } catch (err) {
    res.status(500);
    res.json(err);
  }
}

module.exports = {
  getRecommendationsByRoute,
  createRecommendation,
};
