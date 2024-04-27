const express = require('express');
const recommendationLogic = require('../bll/recommendations-logic.js');

const router = express.Router();

router.get('/:routeName', async (req, res) => {
  const { routeName } = req.params;
  try {
    const recommendation =
      await recommendationLogic.getRecommendationsByRoute(routeName);
    const dataArray = Object.values(recommendation).map((item) => ({
      id: item.id,
      rate: item.rate,
      description: item.description,
      reporterName: item.reporterName,
      routeName: item.routeName,
    }));
    res.status(200).send(dataArray);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post('/addRecommendation', async (req, res) => {
  const { id, rate, description, reporterName, routeName } = req.body;

  const recommendation = {
    id,
    rate,
    description,
    reporterName,
    routeName,
  };

  try {
    await recommendationLogic.addRecommendation(recommendation);
    res.status(200).send(recommendation);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
