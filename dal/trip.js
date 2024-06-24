const firebase = require('../dal/firebase.js');

async function getTripsByUserDB(userId) {
  const snapshot = await firebase.database.ref('trips/' + userId).once('value');
  return snapshot.val();
}

async function createTripDB(trip) {
  await firebase.database
    .ref('trips/' + trip.getUserId() + '/' + trip.getId())
    .set(trip);
}

async function updateTripDB(trip) {
  await firebase.database
    .ref('trips/' + trip.getUserId() + '/' + trip.getId())
    .update(trip);
}

async function deleteTripDB(userId, tripId) {
  await firebase.database.ref('trips/' + userId + '/' + tripId).remove();
}

async function uploadImagesDB(files, userName, tripName) {
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

async function getAllUserImagesByTripDB(userName, tripName) {
  const bucket = firebase.storage.bucket();
  const [files] = await bucket.getFiles({
    prefix: userName + '/' + tripName,
  });

  return files;
}

async function removeImageFromTripDB(userName, tripName, imageName) {
  const bucket = firebase.storage.bucket();
  const file = bucket.file(userName + '/' + tripName + '/' + imageName);

  try {
    await file.delete();
    return 'Image deleted successfully';
  } catch (err) {
    console.error(err.message);
    return 'Image does not exist';
  }
}

module.exports = {
  getTripsByUserDB,
  createTripDB,
  updateTripDB,
  deleteTripDB,
  uploadImagesDB,
  getAllUserImagesByTripDB,
  removeImageFromTripDB,
};
