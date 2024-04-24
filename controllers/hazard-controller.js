const express = require('express');
const hazardsLogic = require('../bll/hazards-logic.js');

const router = express.Router();

router.get('/:route', async (req, res) => {
  const { route } = req.params;
  try {
    const hazards = await hazardsLogic.getAllHazardsByRoute(route);
    const dataArray = Object.values(hazards).map((item) => ({
      id: item.id,
      description: item.description,
      reporter: item.reporter,
      route: item.route,
    }));
    res.status(200).send(dataArray);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post('/', async (req, res) => {
  const hazard = req.body;

  try {
    await hazardsLogic.addHazard(hazard);
    res.status(200).send(hazard);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
