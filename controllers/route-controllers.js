const express = require('express');
const routesLogic = require('../bll/routes-logic.js');
const Route = require('../models/route.js');
const { PointsType } = require('../dal/constans.js');

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const routes = await routesLogic.getAllRoutes();

    const dataArray = [];
    for (const item of routes) {
      const description = await routesLogic.getRouteDescription(item.name);

      const point = await routesLogic.getRouteCoordinates(item.name);

      point.type = PointsType.ROUTE;

      const route = new Route(
        point.lat,
        point.lng,
        point.date,
        point.type,
        item.id,
        item.name,
        description.description,
        item.difficultyLevel,
        item.length,
        description.image,
      );

      dataArray.push(route);
    }

    res.status(200).send(dataArray);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/allNames/:userPhoneNumber/:userEmail', async (req, res) => {
  try {
    const routes = await routesLogic.getAllRoutes();
    const names = routes.map((route) => route.name);
    res.status(200).send(names);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
