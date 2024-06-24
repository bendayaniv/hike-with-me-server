const express = require('express');

const {
  getTripsByUser,
  createTrip,
  updateTrip,
  deleteTrip,
  uploadImages
} = require('../bll/trips-logic.js');

const { upload } = require('../dal/firebase.js');

const router = express.Router();

router.get('/:userId', getTripsByUser);

router.post('/createTrip', createTrip);

router.put('/', updateTrip);

router.delete('/:userId/:tripId', deleteTrip);

router.post('/uploadImages', upload.array('image'), uploadImages);

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
