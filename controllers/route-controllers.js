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

      const location = await routesLogic.getRouteCoordinates(item.name);

      location.date = null;

      const route = new Route(
        location,
        PointsType.ROUTE,
        item.id,
        item.name,
        description.description,
        item.difficultyLevel,
        item.length,
        description.image,
      );

      dataArray.push(route);
    }

    // const trip = new Trip(
    //   1,
    //   'trip1',
    //   '2021-07-01',
    //   '2021-07-10',
    //   [dataArray[0]._location],
    //   'trip description',
    //   ['route1', 'route2'],
    //   1,
    // );

    // console.log(trip);

    res.status(200).send(dataArray);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/allNames', async (req, res) => {
  try {
    const routes = await routesLogic.getAllRoutes();
    const names = routes.map((route) => route.name);
    res.status(200).send(names);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
