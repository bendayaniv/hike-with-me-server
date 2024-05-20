const express = require('express');
const tripsLogic = require('../bll/trips-logic.js');
const Trip = require('../models/trip.js');
const { upload } = require('../dal/firebase.js');

const router = express.Router();

router.get('/:userId', async (req, res) => {
  const { userId } = req.params;
  try {
    const trips = await tripsLogic.getTripsByUser(userId);
    const dataArray = Object.values(trips).map(
      (item) =>
        new Trip(
          item.id,
          item.name,
          item.startDate,
          item.endDate,
          item.locations,
          item.description,
          item.routeName,
          item.userId,
        ),
    );
    res.status(200).send(dataArray);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post('/createTrip', async (req, res) => {
  const {
    id,
    name,
    startDate,
    endDate,
    locations,
    description,
    routeName,
    userId,
  } = req.body;

  const trip = new Trip(
    id,
    name,
    startDate,
    endDate,
    locations,
    description,
    routeName,
    userId,
  );

  try {
    await tripsLogic.createTrip(trip);
    res.status(200).send(trip);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.put('/', async (req, res) => {
  const {
    id,
    name,
    startDate,
    endDate,
    locations,
    description,
    routeName,
    userId,
  } = req.body;

  const trip = new Trip(
    id,
    name,
    startDate,
    endDate,
    locations,
    description,
    routeName,
    userId,
  );

  try {
    await tripsLogic.updateTrip(trip);
    res.status(200).send(trip);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.delete('/:userId/:tripId', async (req, res) => {
  const { userId, tripId } = req.params;

  try {
    await tripsLogic.deleteTrip(userId, tripId);
    res.status(200).send('Trip deleted');
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post('/uplaodImages', upload.array('image'), async (req, res) => {
  try {
    const files = req.files;

    const { userName, tripName } = req.body;

    await tripsLogic.uploadImages(files, userName, tripName);
    res.status(200).send('Images uploaded');
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/downloadImages', async (req, res) => {
  console.log('downloadImages');
  const { userName, tripName } = req.body;

  console.log('userName:', userName);
  console.log('tripName:', tripName);

  try {
    const files = await tripsLogic.downloadImages(userName, tripName);
    res.status(200).send(files);
  } catch (err) {
    res.status(500).json(err);
  }
});

// const giveCurrentDataTime = () => {
//   const today = new Date();
//   const date =
//     today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
//   const time =
//     today.getHours() + ':' + today.getMinutes() + ':' + today.getSeconds();
//   const dateTime = date + ' ' + time;
//   return dateTime;
// };

module.exports = router;
