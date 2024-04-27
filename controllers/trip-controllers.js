const express = require('express');
const tripsLogic = require('../bll/trips-logic.js');

const router = express.Router();

router.get('/:userId', async (req, res) => {
  const { userId } = req.params;
  try {
    const trips = await tripsLogic.getTripsByUser(userId);
    const dataArray = Object.values(trips).map((item) => ({
      id: item.id,
      name: item.name,
      startDate: item.startDatea,
      endDate: item.endDate,
      location: item.location,
      description: item.description,
      routeName: item.routeName,
      userId: item.userId,
    }));
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
    location,
    description,
    routeName,
    userId,
  } = req.body;

  const trip = {
    id,
    name,
    startDate,
    endDate,
    location,
    description,
    routeName,
    userId,
  };

  try {
    await tripsLogic.createTrip(trip);
    res.status(200).send(trip);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.put('/', async (req, res) => {
  const trip = req.body;

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

module.exports = router;
