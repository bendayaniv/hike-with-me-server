const express = require('express');
const routesLogic = require('../bll/routes-logic.js');
const Route = require('../models/route.js');
const Location = require('../models/location.js');

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const routes = await routesLogic.getAllRoutes();

    const dataArray = [];
    for (const item of routes) {
      const description = await routesLogic.getPlaceDescription(item.name);

      const location = await routesLogic.getPlaceCoordinates(item.name);

      const fullLocation = new Location(location.lat, location.lng, null);

      const route = new Route(
        item.id,
        item.name,
        description.description,
        item.difficultyLevel,
        item.length,
        fullLocation,
        description.image,
      );

      dataArray.push(route);
    }

    res.status(200).send(dataArray);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/:name', async (req, res) => {
  const { name } = req.params;
  try {
    const route = await routesLogic.getRouteByName(name);
    res.status(200).send(route);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
