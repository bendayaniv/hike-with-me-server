const express = require('express');
const recommendationLogic = require('../bll/recommendations-logic.js');
const Recommendation = require('../models/recommendation.js');

const router = express.Router();

router.get('/:routeName', async (req, res) => {
  const { routeName } = req.params;
  try {
    const recommendation =
      await recommendationLogic.getRecommendationsByRoute(routeName);
    const dataArray = Object.values(recommendation).map(
      (item) =>
        new Recommendation(
          item.id,
          item.rate,
          item.description,
          item.reporterName,
          item.routeName,
        ),
    );
    res.status(200).send(dataArray);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post('/addRecommendation', recommendationLogic.createReccomendation);

module.exports = router;
