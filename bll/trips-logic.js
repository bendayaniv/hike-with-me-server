const {
  getTripsByUserDB,
  createTripDB,
  updateTripDB,
  deleteTripDB,
  uploadImagesDB,
  getAllUserImagesByTripDB,
  removeImageFromTripDB,
} = require('../dal/trip.js');

const { getUserByIdDB } = require('../dal/user.js');

const Trip = require('../models/trip.js');
const Location = require('../models/location.js');

async function getTripsByUser(req, res) {
  const { userId } = req.params;

  if (!userId) {
    res.status(401);
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

    for (const trip in trips) {
      const user = await getUserByIdDB(trips[trip].userId);

      const imagesFiles = await getAllUserImagesByTripDB(
        user.name,
        trips[trip].name,
      );

      if (!imagesFiles || imagesFiles.length === 0) {
        console.log('No images found');
        trips[trip].imagesUrls = [];
      } else {
        console.log('Images found');
        const urls = await Promise.all(
          imagesFiles.map(async (file) => {
            const [url] = await file.getSignedUrl({
              action: 'read',
              expires: '03-17-2025',
            });
            return url;
          }),
        );

        trips[trip].imagesUrls = urls;
      }
    }

    const dataArray = Object.values(trips).map((item) => {
      return new Trip(
        item.id,
        item.name,
        item.startDate,
        item.endDate,
        item.locations,
        item.description,
        item.routesNames,
        item.userId,
        item.imagesUrls,
      );
    });

    res.status(200);
    res.send(dataArray);
  } catch (err) {
    res.status(500);
    res.send(err);
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
    res.status(401);
    res.send('Please provide id');
    return;
  }

  if (!name) {
    res.status(401);
    res.send('Please provide name');
    return;
  }

  if (!startDate) {
    res.status(401);
    res.send('Please provide startDate');
    return;
  }

  if (!endDate) {
    res.status(401);
    res.send('Please provide endDate');
    return;
  }

  let newLocation;

  if (!locations) {
    // Default location in case of no location provided
    newLocation = new Location(0.0, 0.0, null);
  } else {
    newLocation = locations;
  }

  if (!description) {
    res.status(401);
    res.send('Please provide description');
    return;
  }

  let newRoutesNames;

  if (!routesNames) {
    newRoutesNames = [];
  } else {
    newRoutesNames = routesNames;
  }

  if (!userId) {
    res.status(401);
    res.send('Please provide userId');
    return;
  }

  const newTrip = new Trip(
    id,
    name,
    startDate,
    endDate,
    newLocation,
    description,
    newRoutesNames,
    userId,
    [],
  );

  try {
    await createTripDB(newTrip);
    res.status(200);
    res.send(newTrip);
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
    res.status(401);
    res.send('Please provide id');
    return;
  }

  if (!name) {
    res.status(401);
    res.send('Please provide name');
    return;
  }

  if (!startDate) {
    res.status(401);
    res.send('Please provide startDate');
    return;
  }

  if (!endDate) {
    res.status(401);
    res.send('Please provide endDate');
    return;
  }

  if (!locations) {
    locations = [];
  }

  if (!description) {
    res.status(401);
    res.send('Please provide description');
    return;
  }

  if (!routesNames) {
    routesNames = [];
  }

  if (!userId) {
    res.status(401);
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
    res.status(401);
    res.send('Please provide userId');
    return;
  }

  if (!tripId) {
    res.status(401);
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

    console.log('files:', files);

    if (!files || files.length === 0) {
      res.status(401);
      res.send('Please provide images');
      return;
    }

    const { userName, tripName } = req.body;

    if (!userName) {
      res.status(401);
      res.send('Please provide userName');
      return;
    }

    if (!tripName) {
      res.status(401);
      res.send('Please provide tripName');
      return;
    }

    // Get existing images from the database
    const existingFiles = await getAllUserImagesByTripDB(userName, tripName);

    // Determine the starting number
    let startingNumber = 0;
    if (existingFiles.length > 0) {
      const lastFile = existingFiles[existingFiles.length - 1];
      const lastFileName = lastFile.name.split('/').pop(); // Get just the filename
      const lastNumber = parseInt(lastFileName.split('_')[0]);
      startingNumber = isNaN(lastNumber) ? 0 : lastNumber + 1;
    }

    await uploadImagesDB(files, userName, tripName, startingNumber);

    res.status(200);
    res.send('Images uploaded');
  } catch (err) {
    console.error('Error in uploadImages:', err);
    res.status(500);
    res.json({ error: err.message });
  }
}

async function getAllUserImagesByTrip(req, res) {
  const { userName, tripName } = req.params;

  if (!userName) {
    res.status(401);
    res.send('Please provide userName');
    return;
  }

  if (!tripName) {
    res.status(401);
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

  if (!userName) {
    res.status(401);
    res.send('Please provide userName');
    return;
  }

  if (!tripName) {
    res.status(401);
    res.send('Please provide tripName');
    return;
  }

  if (!imageName) {
    res.status(401);
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
