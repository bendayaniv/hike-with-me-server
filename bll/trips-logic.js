const {
  getTripsByUserDB,
  createTripDB,
  updateTripDB,
  deleteTripDB,
  uploadImagesDB,
  getAllUserImagesByTripDB,
  removeImageFromTripDB,
} = require('../dal/trip.js');
const Trip = require('../models/trip.js');

async function getTripsByUser(req, res) {
  const { userId } = req.params;

  if (!userId) {
    res.status(400);
    res.send('Please provide userId');
    return;
  }

  try {
    const trips = await getTripsByUserDB(userId);

    if (!trips || trips.length === 0) {
      res.status(404);
      res.send('No trips found');
      return;
    }

    const dataArray = Object.values(trips).map(
      (item) =>
        new Trip(
          item.id,
          item.name,
          item.startDate,
          item.endDate,
          item.locations,
          item.description,
          item.routesNames,
          item.userId,
        ),
    );
    res.status(200);
    res.send(dataArray);
  } catch (err) {
    res.status(500).json(err);
  }
}

async function createTrip(req, res) {
  const {
    id,
    name,
    startDate,
    endDate,
    locations,
    description,
    routesNames,
    userId,
  } = req.body;

  if (!id) {
    res.status(400);
    res.send('Please provide id');
    return;
  }

  if (!name) {
    res.status(400);
    res.send('Please provide name');
    return;
  }

  if (!startDate) {
    res.status(400);
    res.send('Please provide startDate');
    return;
  }

  if (!endDate) {
    res.status(400);
    res.send('Please provide endDate');
    return;
  }

  if (!locations) {
    locations = [];
  }

  if (!description) {
    res.status(400);
    res.send('Please provide description');
    return;
  }

  if (!routesNames) {
    routesNames = [];
  }

  if (!userId) {
    res.status(400);
    res.send('Please provide userId');
    return;
  }

  const trip = new Trip(
    id,
    name,
    startDate,
    endDate,
    locations,
    description,
    routesNames,
    userId,
  );

  try {
    await createTripDB(trip);
    res.status(200);
    res.send(trip);
  } catch (err) {
    res.status(500);
    res.json(err);
  }
}

async function updateTrip(req, res) {
  const {
    id,
    name,
    startDate,
    endDate,
    locations,
    description,
    routesNames,
    userId,
  } = req.body;

  if (!id) {
    res.status(400);
    res.send('Please provide id');
    return;
  }

  if (!name) {
    res.status(400);
    res.send('Please provide name');
    return;
  }

  if (!startDate) {
    res.status(400);
    res.send('Please provide startDate');
    return;
  }

  if (!endDate) {
    res.status(400);
    res.send('Please provide endDate');
    return;
  }

  if (!locations) {
    locations = [];
  }

  if (!description) {
    res.status(400);
    res.send('Please provide description');
    return;
  }

  if (!routesNames) {
    routesNames = [];
  }

  if (!userId) {
    res.status(400);
    res.send('Please provide userId');
    return;
  }

  const trip = new Trip(
    id,
    name,
    startDate,
    endDate,
    locations,
    description,
    routesNames,
    userId,
  );

  try {
    await updateTripDB(trip);
    res.status(200);
    res.send(trip);
  } catch (err) {
    res.status(500);
    res.json(err);
  }
}

async function deleteTrip(req, res) {
  const { userId, tripId } = req.params;

  if (!userId) {
    res.status(400);
    res.send('Please provide userId');
    return;
  }

  if (!tripId) {
    res.status(400);
    res.send('Please provide tripId');
    return;
  }

  try {
    await deleteTripDB(userId, tripId);
    res.status(200);
    res.send('Trip deleted');
  } catch (err) {
    res.status(500);
    res.json(err);
  }
}

async function uploadImages(req, res) {
  try {
    const files = req.files;

    if (!files || files.length === 0) {
      res.status(400);
      res.send('Please provide images');
      return;
    }

    const { userName, tripName } = req.body;

    if (!userName) {
      res.status(400);
      res.send('Please provide userName');
      return;
    }

    if (!tripName) {
      res.status(400);
      res.send('Please provide tripName');
      return;
    }

    await uploadImagesDB(files, userName, tripName);
    res.status(200);
    res.send('Images uploaded');
  } catch (err) {
    res.status(500);
    res.json(err);
  }
}

async function getAllUserImagesByTrip(req, res) {
  const { userName, tripName } = req.params;

  if (!userName) {
    res.status(400);
    res.send('Please provide userName');
    return;
  }

  if (!tripName) {
    res.status(400);
    res.send('Please provide tripName');
    return;
  }

  try {
    const files = await getAllUserImagesByTripDB(userName, tripName);

    if (!files || files.length === 0) {
      res.status(404);
      res.send('No images found');
      return;
    }

    res.status(200);
    res.send(files);
  } catch (err) {
    res.status(500);
    res.json(err);
  }
}

async function removeImageFromTrip(req, res) {
  const { userName, tripName, imageName } = req.params;

  console.log(userName, tripName, imageName);

  if (!userName) {
    res.status(400);
    res.send('Please provide userName');
    return;
  }

  if (!tripName) {
    res.status(400);
    res.send('Please provide tripName');
    return;
  }

  if (!imageName) {
    res.status(400);
    res.send('Please provide imageName');
    return;
  }

  try {
    const answer = await removeImageFromTripDB(userName, tripName, imageName);

    if (answer === 'Image does not exist') {
      res.status(404);
      res.send(answer);
      return;
    }

    res.status(200);
    res.send(answer);
  } catch (err) {
    res.status(500);
    res.json(err);
  }
}

module.exports = {
  getTripsByUser,
  createTrip,
  updateTrip,
  deleteTrip,
  uploadImages,
  getAllUserImagesByTrip,
  removeImageFromTrip,
};
