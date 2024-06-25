const express = require('express');
const {
  getRecommendationsByRoute,
  createRecommendation,
} = require('../bll/recommendations-logic.js');

const router = express.Router();

router.get('/:routeName', getRecommendationsByRoute);

router.post('/addRecommendation', createRecommendation);

module.exports = router;
