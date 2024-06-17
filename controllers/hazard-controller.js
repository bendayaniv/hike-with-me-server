const express = require('express');
const {
  getAllHazards,
  getAllHazardsByRoute,
  addHazard,
} = require('../bll/hazards-logic.js');

const router = express.Router();

router.get('/', getAllHazards);

router.get('/:routeName', getAllHazardsByRoute);

router.post('/addHazard', addHazard);

module.exports = router;
