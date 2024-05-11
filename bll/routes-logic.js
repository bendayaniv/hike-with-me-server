const routes = require('../dal/routes.json');

async function getAllRoutes() {
  return routes;
}

async function getRouteByName(name) {
  const route = routes.find((route) => route.name === name);
  return route;
}

module.exports = {
  getAllRoutes,
  getRouteByName,
};
