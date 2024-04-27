const express = require('express');
const hazardsLogic = require('../bll/hazards-logic.js');

const router = express.Router();

router.get('/:routeName', async (req, res) => {
  const { routeName } = req.params;
  try {
    const hazards = await hazardsLogic.getAllHazardsByRoute(routeName);
    const dataArray = Object.values(hazards).map((item) => ({
      id: item.id,
      description: item.description,
      reporterName: item.reporterName,
      routeName: item.routeName,
      date: item.date,
    }));
    res.status(200).send(dataArray);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post('/addHazard', async (req, res) => {
  const { id, type, description, severity, reporterName, routeName, date } = req.body;

  const hazard = {
    id,
    type,
    description,
    severity,
    reporterName,
    routeName,
    date,
  };

  try {
    await hazardsLogic.addHazard(hazard);
    res.status(200).send(hazard);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
