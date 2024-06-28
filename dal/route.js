const routes = require('../dal/mockRoutes.json');

const GOOGLE_PLACES_API_URL_FIND_PLACE_FROM_TEXT =
  'https://maps.googleapis.com/maps/api/place/findplacefromtext/json';

const API_KEY = process.env.API_KEY;

async function getAllRoutesDB() {
  return routes;
}

async function getRouteDescriptionDB(placeName) {
  const apiUrl = `https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(placeName)}`;

  try {
    const response = await fetch(apiUrl);

    const data = await response.json();

    if (response.ok) {
      const description = {
        title: data.title,
        thumbnailImage: data.thumbnail ? data.thumbnail.source : null,
        image: data.originalimage ? data.originalimage.source : null,
        description: data.extract ? data.extract : 'Description not available',
      };
      return description;
    } else {
      console.log(
        'Name: ',
        placeName,
        ', Failed to retrieve place description.',
      );
      return null;
    }
  } catch (error) {
    console.error('Error fetching data:', error);
    return null;
  }
}

async function getRouteCoordinatesDB(placeName) {
  const url = `${GOOGLE_PLACES_API_URL_FIND_PLACE_FROM_TEXT}?input=${placeName}&inputtype=textquery&fields=geometry&key=${API_KEY}`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    if (data.status === 'OK') {
      const location = data.candidates[0].geometry.location;
      const newLocation = {
        latitude: location.lat,
        longitude: location.lng,
      };
      return newLocation;
    } else {
      console.log('Failed to retrieve coordinates.');
      return null;
    }
  } catch (error) {
    console.error('Error fetching data:', error);
    return null;
  }
}

module.exports = {
  getAllRoutesDB,
  getRouteDescriptionDB,
  getRouteCoordinatesDB,
};
