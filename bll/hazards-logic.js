const {
  getAllHazardsDB,
  getAllHazardsByRouteDB,
  addHazardDB,
} = require('../dal/hazard.js');

const { getUserByIdDB, haversineDistance } = require('../dal/user.js');

const Hazard = require('../models/hazard.js');

async function getAllHazards(req, res) {
  try {
    const hazards = await getAllHazardsDB();

    if (!hazards || hazards.length === 0) {
      res.status(404);
      res.send('No hazards found');
      return;
    }

    res.status(200);
    res.send(hazards);
  } catch (err) {
    res.status(500);
    res.json(err);
  }
}

async function getAllHazardsByRoute(req, res) {
  const { routeName } = req.params;

  if (!routeName) {
    res.status(401);
    res.send('Please provide route name');
    return;
  }

  try {
    const hazards = await getAllHazardsByRouteDB(routeName);

    if (!hazards) {
      res.status(404);
      res.send('No hazards found');
      return;
    }

    const dataArray = Object.values(hazards).map(
      (item) =>
        new Hazard(
          item._location,
          item._type,
          item._id,
          item._hazardType,
          item._description,
          item._severity,
          item._reporterName,
          item._routeName,
        ),
    );

    res.status(200);
    res.send(dataArray);
  } catch (err) {
    res.status(500);
    res.json(err);
  }
}

async function getNearHazards(req, res) {
  const { userId } = req.params;

  if (!userId) {
    res.status(401);
    res.send('Please provide user ID');
    return;
  }

  try {
    const hazards = await getAllHazardsDB();

    if (!hazards || Object.keys(hazards).length === 0) {
      res.status(404);
      res.send('No hazards found');
      return;
    }

    const hazardsArray = Object.values(hazards).flatMap((item) =>
      Object.values(item).map(
        (innerItem) =>
          new Hazard(
            innerItem._location,
            innerItem._type,
            innerItem._id,
            innerItem._hazardType,
            innerItem._description,
            innerItem._severity,
            innerItem._reporterName,
            innerItem._routeName,
          ),
      ),
    );

    const user = await getUserByIdDB(userId);

    if (!user) {
      res.status(404);
      res.send('User not found');
      return;
    }

    const userLocation = user.location;

    const userCoords = {
      lat: parseFloat(userLocation.latitude),
      lon: parseFloat(userLocation.longitude),
    };

    const dataArray = hazardsArray.filter((item) => {
      const hazardCoords = {
        lat: parseFloat(item._location.latitude),
        lon: parseFloat(item._location.longitude),
      };

      const distance = haversineDistance(userCoords, hazardCoords);

      return distance < 0.5;
    });

    res.status(200);
    res.send(dataArray);
  } catch (err) {
    res.status(500);
    res.json(err);
  }
}

async function addHazard(req, res) {
  const {
    _location,
    _type,
    _id,
    _hazardType,
    _description,
    _severity,
    _reporterName,
    _routeName,
  } = req.body;

  if (!_location.latitude || !_location.longitude) {
    res.status(401);
    res.send('Please provide latitude and longitude');
    return;
  }

  if (!_hazardType) {
    res.status(401);
    res.send('Please provide hazard type');
    return;
  }

  if (!_id) {
    res.status(401);
    res.send('Please provide id');
    return;
  }

  if (!_description) {
    res.status(401);
    res.send('Please provide description');
    return;
  }

  if (!_severity) {
    res.status(401);
    res.send('Please provide severity');
    return;
  }

  if (!_reporterName) {
    res.status(401);
    res.send('Please provide reporter name');
    return;
  }

  if (!_routeName) {
    res.status(401);
    res.send('Please provide route name');
    return;
  }

  const hazard = new Hazard(
    _location,
    _type,
    _id,
    _hazardType,
    _description,
    _severity,
    _reporterName,
    _routeName,
  );

  try {
    await addHazardDB(hazard);
    res.status(200);
    res.send(hazard);
  } catch (err) {
    res.status(500);
    res.json(err);
  }
}

module.exports = {
  getAllHazards,
  getAllHazardsByRoute,
  getNearHazards,
  addHazard,
};
