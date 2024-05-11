const places = require('../dal/places.json');

async function getAllPlaces() {
  return places;
}

async function getPlaceByName(placeName) {
  return places.find((place) => place.name === placeName);
}

module.exports = {
  getAllPlaces,
  getPlaceByName,
};
