const express = require('express');

const {
  getTripsByUser,
  createTrip,
  updateTrip,
  deleteTrip,
  uploadImages,
  removeImageFromTrip,
} = require('../bll/trips-logic.js');

const { upload } = require('../dal/firebase.js');

const router = express.Router();

router.get('/:userId', getTripsByUser);

router.post('/createTrip', createTrip);

router.put('/', updateTrip);

router.delete('/:userId/:tripId', deleteTrip);

router.post('/uploadImages', upload.array('image'), uploadImages);

router.delete('/:userName/:tripName/:imageName', removeImageFromTrip);

module.exports = router;
