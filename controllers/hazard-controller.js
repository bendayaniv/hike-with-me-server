const express = require('express');
const hazardsLogic = require('../bll/hazards-logic.js');
const Hazard = require('../models/hazard.js');

const router = express.Router();

router.get('/', (req, res) => {
  try {
    const hazards = hazardsLogic.getAllHazards();
    res.status(200).send(hazards);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/:routeName', async (req, res) => {
  const { routeName } = req.params;
  try {
    const hazards = await hazardsLogic.getAllHazardsByRoute(routeName);
    const dataArray = Object.values(hazards).map(
      (item) =>
        new Hazard(
          item._latitude,
          item._longitude,
          item._date,
          item._type,
          item._id,
          item._description,
          item._severity,
          item._reporterName,
          item._routeName,
        ),
    );
    res.status(200).send(dataArray);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post('/addHazard', async (req, res) => {
  const {
    latitude,
    longitude,
    date,
    type,
    id,
    description,
    severity,
    reporterName,
    routeName,
  } = req.body;

  const hazard = new Hazard(
    latitude,
    longitude,
    date,
    type,
    id,
    description,
    severity,
    reporterName,
    routeName,
  );

  try {
    await hazardsLogic.addHazard(hazard);
    res.status(200).send(hazard);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
