const axios = require('axios');

const GOOGLE_PLACES_API_URL =
  'https://maps.googleapis.com/maps/api/place/nearbysearch/json';

const GOOGLE_PLACES_API_KEY =
  /*process.env.GOOGLE_PLACES_API_KEY*/ 'AIzaSyDJNFUIJy2Bgxz2gfKSFxyvFCH99kaZ1R4';

async function getPlacesByLocation(location) {
  const response = await axios.get(GOOGLE_PLACES_API_URL, {
    params: {
      key: GOOGLE_PLACES_API_KEY,
      location: location,
      radius: 5000,
      type: 'restaurant',
    },
  });
  console.log(response.data.results.length + ' places found');
  return response.data.results;
}

// getPlacesByLocation('32.0853,34.7818').then((places) => {
//     console.log('aaaaaaaaaaaaaaa:\n' + places);
//   });

async function findPlaces(type, location, radius, countryCode) {
  const url = `${GOOGLE_PLACES_API_URL}?location=${location}&radius=${radius}&type=${type}&key=${GOOGLE_PLACES_API_KEY}&region=${countryCode}`;

  try {
    const response = await axios.get(url);
    const places = response.data.results;

    // חילוץ שמות ומיקומים של כל מקום
    const placeDetails = places.map((place) => {
      return {
        name: place.name,
        address: place.vicinity,
        lat: place.geometry.location.lat,
        lng: place.geometry.location.lng,
      };
    });

    console.log(placeDetails.length + ' places found');

    return placeDetails;
  } catch (error) {
    console.error('Error fetching places:', error);
    return [];
  }
}

// findPlaces('restaurant', '32.0853,34.7818', 5000, 'il').then((places) => {
//     console.log(places);
//   });

module.exports = {
  getPlacesByLocation,
  findPlaces,
};
