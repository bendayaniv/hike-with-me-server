const firebase = require('../dal/firebase.js');

async function getTripsByUser(userId) {
  const snapshot = await firebase.database.ref('trips/' + userId).once('value');
  return snapshot.val();
}

async function createTrip(trip) {
  await firebase.database
    .ref('trips/' + trip.getUserId() + '/' + trip.getId())
    .set(trip);
}

async function updateTrip(trip) {
  await firebase.database
    .ref('trips/' + trip.getUserId() + '/' + trip.getId())
    .update(trip);
}

async function deleteTrip(userId, tripId) {
  await firebase.database.ref('trips/' + userId + '/' + tripId).remove();
}

async function uploadImages(files, userName, tripName) {
  const bucket = firebase.storage.bucket();

  for (let i = 0; i < files.length; i++) {
    const file = files[i];
    const blob = bucket.file(
      userName + '/' + tripName + '/' + file.originalname,
    );
    const blobStream = blob.createWriteStream({
      metadata: {
        contentType: file.mimetype,
      },
    });

    blobStream.on('error', (err) => {
      console.error(err);
    });

    blobStream.on('finish', () => {
      console.log('Image uploaded successfully');
    });

    blobStream.end(file.buffer);
  }
}

async function getAllUserImagesByTrip(userName, tripName) {
  const bucket = firebase.storage.bucket();
  const [files] = await bucket.getFiles({
    prefix: userName + '/' + tripName,
  });

  return files;
}

module.exports = {
  getTripsByUser,
  createTrip,
  updateTrip,
  deleteTrip,
  uploadImages,
  getAllUserImagesByTrip,
};
