const express = require('express');

const { getTripsByUser, createTrip } = require('../bll/trips-logic.js');

const router = express.Router();

router.get('/:userId', getTripsByUser);

router.post('/createTrip', createTrip);

router.put('/', async (req, res) => {
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
    await updateTrip(trip);
    res.status(200).send(trip);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.delete('/:userId/:tripId', async (req, res) => {
  const { userId, tripId } = req.params;

  try {
    await deleteTrip(userId, tripId);
    res.status(200).send('Trip deleted');
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post('/uplaodImages', upload.array('image'), async (req, res) => {
  try {
    const files = req.files;

    const { userName, tripName } = req.body;

    await uploadImages(files, userName, tripName);
    res.status(200).send('Images uploaded');
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/:userName/:tripName', async (req, res) => {
  const { userName, tripName } = req.params;

  try {
    const files = await getAllUserImagesByTrip(userName, tripName);
    res.status(200).send(files);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
