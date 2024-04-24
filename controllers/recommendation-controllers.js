const express = require('express');
const { database } = require('../dal/firebase.js');
const recommendationLogic = require('../bll/recommendation-logic.js');

const router = express.Router();

router.get('/:route', async (req, res) => {
  const { route } = req.params;
  try {
    const recommendation =
      await recommendationLogic.getRecommendationsByRoute(route);
    const dataArray = Object.values(recommendation).map((item) => ({
      id: item.id,
      rate: item.rate,
      description: item.description,
      reporter: item.reporter,
      route: item.route,
    }));
    res.status(200).send(dataArray);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post('/addRecommendation', async (req, res) => {
  const { id, rate, description, reporter, route } = req.body;

  const recommendation = {
    id,
    rate,
    description,
    reporter,
    route,
  };

  try {
    await recommendationLogic.addRecommendation(recommendation);
    res.status(200).send(recommendation);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
