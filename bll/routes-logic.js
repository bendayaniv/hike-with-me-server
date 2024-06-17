const routesLogic = require('../bll/routes-logic.js');
const {
  getAllRoutesDB,
  getRouteDescriptionDB,
  getRouteCoordinatesDB,
} = require('../dal/route.js');
const Route = require('../models/route.js');
const { PointsType } = require('../dal/constans.js');

async function getAllRoutes(req, res) {
  try {
    const routes = await getAllRoutesDB();

    if (!routes || routes.length === 0) {
      res.status(404);
      res.send('No routes found');
      return;
    }

    const dataArray = [];

    for (const item of routes) {
      const description = await getRouteDescriptionDB(item.name);

      const location = await getRouteCoordinatesDB(item.name);

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

    res.status(200);
    res.send(dataArray);
  } catch (err) {
    res.status(500);
    res.json(err);
  }
}

async function getAllRotuesNames(req, res) {
  try {
    const routes = await getAllRoutesDB();

    if (!routes || routes.length === 0) {
      res.status(404);
      res.send('No routes found');
      return;
    }

    const names = routes.map((route) => route.name);
    res.status(200);
    res.send(names);
  } catch (err) {
    res.status(500);
    res.json(err);
  }
}

module.exports = {
  getAllRoutes,
  getAllRotuesNames,
};
