const express = require('express');
const routesLogic = require('../bll/routes-logic.js');

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const routes = await routesLogic.getAllRoutes();
    const dataArray = Object.values(routes).map((item) => ({
      name: item.name,
      description: item.description,
      difficulty: item.difficulty,
      length: item.length,
      location: item.location,
    }));
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
  const route = req.body;
  try {
    await routesLogic.addRoute(route);
    res.status(200).send(route);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
