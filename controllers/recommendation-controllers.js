const express = require('express');
const {
  getRecommendationsByRoute,
  createReccomendation,
} = require('../bll/recommendations-logic.js');

const router = express.Router();

router.get('/:routeName', getRecommendationsByRoute);

router.post('/addRecommendation', createReccomendation);

module.exports = router;
