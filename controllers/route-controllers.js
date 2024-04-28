const express = require('express');
const routesLogic = require('../bll/routes-logic.js');
const Route = require('../models/route.js');

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const routes = await routesLogic.getAllRoutes();
    const dataArray = Object.values(routes).map(
      (item) =>
        new Route(
          item.id,
          item.name,
          item.description,
          item.difficultyLevel,
          item.length,
          item.location,
        ),
    );
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

router.post('/addRoute', async (req, res) => {
  const { id, name, description, difficultyLevel, length, location } = req.body;
  const route = new Route(
    id,
    name,
    description,
    difficultyLevel,
    length,
    location,
  );
  try {
    await routesLogic.addRoute(route);
    res.status(200).send(route);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
