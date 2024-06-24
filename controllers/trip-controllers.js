const express = require('express');

const {
  getTripsByUser,
  createTrip,
  updateTrip,
  deleteTrip,
} = require('../bll/trips-logic.js');

const { upload } = require('../dal/firebase.js');

const router = express.Router();

router.get('/:userId', getTripsByUser);

router.post('/createTrip', createTrip);

router.put('/', updateTrip);

router.delete('/:userId/:tripId', deleteTrip);

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
