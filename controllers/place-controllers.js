const express = require('express');
const placesLogic = require('../bll/places-logic.js');
const Place = require('../models/place.js');

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const places = await placesLogic.getAllPlaces();
    const dataArray = places.map(
      (item) =>
        new Place(
          item.name,
          item.location,
          item.length,
          item.difiiculty,
          item.description,
          item.images,
        ),
    );
    res.status(200).send(dataArray);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/:placeName', async (req, res) => {
  const { placeName } = req.params;
  try {
    const place = await placesLogic.getPlaceByName(placeName);
    res.status(200).send(place);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
