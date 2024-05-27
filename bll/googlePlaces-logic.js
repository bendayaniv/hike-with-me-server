const axios = require('axios');

const GOOGLE_PLACES_API_URL_NEAR_BY_SEARCH =
  'https://maps.googleapis.com/maps/api/place/nearbysearch/json';

const GOOGLE_PLACES_API_URL_FIND_PLACE_FROM_TEXT =
  'https://maps.googleapis.com/maps/api/place/findplacefromtext/json';

const GOOGLE_PLACES_API_KEY =
  /*process.env.GOOGLE_PLACES_API_KEY*/ 'AIzaSyDJNFUIJy2Bgxz2gfKSFxyvFCH99kaZ1R4';

async function getPlacesByLocation(location) {
  const response = await axios.get(GOOGLE_PLACES_API_URL_NEAR_BY_SEARCH, {
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
  const url = `${GOOGLE_PLACES_API_URL_NEAR_BY_SEARCH}?location=${location}&radius=${radius}&type=${type}&key=${GOOGLE_PLACES_API_KEY}&region=${countryCode}`;

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

// const axios = require('axios');

// // מפתח ה-API שלך מ-Google Cloud Console
// const API_KEY = 'YOUR_GOOGLE_API_KEY';

// פונקציה לחיפוש מקום לפי שם
async function searchPlaceByName(name) {
  const url = `${GOOGLE_PLACES_API_URL_FIND_PLACE_FROM_TEXT}?input=${name}&inputtype=textquery&fields=name,types&key=${GOOGLE_PLACES_API_KEY}`;

  try {
    const response = await axios.get(url);
    const places = response.data.candidates;

    // מחזיר את הסוגים של המקומות שנמצאו
    const placeTypes = places.map((place) => place.types);

    return placeTypes;
  } catch (error) {
    console.error('Error searching place:', error);
    return [];
  }
}

// פונקציה לקבלת מקומות משני סוגים
async function getPlacesByTypes(types, location, radius) {
  const typesQuery = types.join('|');
  const url = `${GOOGLE_PLACES_API_URL_NEAR_BY_SEARCH}?location=${location}&radius=${radius}&types=${typesQuery}&key=${GOOGLE_PLACES_API_KEY}`;

  try {
    const response = await axios.get(url);
    const places = response.data.results;

    const placesDetails = places.map((place) => {
      return {
        reference: place.reference,
      };
    });

    // name: place.name,
    //     types: place.types,
    //     description: place.formatted_address,
    //     opening_hours: place.opening_hours
    //       ? place.opening_hours.weekday_text
    //       : [],

    return placesDetails;
  } catch (error) {
    console.error('Error getting places:', error);
    return [];
  }
}

// פונקציה לקבלת תיאור מקום מתוך ויקיפדיה
async function getPlaceDescription(placeName) {
  try {
    // בקשת HTTP ל-API של ויקיפדיה עם שם המקום
    const response = await axios.get(
      `https://en.wikipedia.org/api/rest_v1/page/summary/${placeName}`,
    );

    // אם הבקשה הצליחה, החזר את התיאור מהתשובה
    return response.data.extract;
  } catch (error) {
    // אם הבקשה נכשלה, החזר הודעת שגיאה
    console.error('Error getting place description:', error);
    return null;
  }
}

// פונקציה לחיפוש מקומות דומים לתיאור שנקבע
async function searchSimilarPlaces(descriptionKeywords) {
  try {
    // בקשת HTTP ל-Google Places API עם מילים מפתח לחיפוש
    const response = await axios.get(
      `https://maps.googleapis.com/maps/api/place/textsearch/json?query=${descriptionKeywords.join('+')}&key=${GOOGLE_PLACES_API_KEY}`,
    );

    // אם הבקשה הצליחה, החזר את התוצאות
    return response.data.results;
  } catch (error) {
    // אם הבקשה נכשלה, החזר הודעת שגיאה
    console.error('Error searching similar places:', error);
    return null;
  }
}

async function getTrailDifficulty(trailName) {
  try {
    // בקשת HTTP GET ל-API של OpenWeatherMap עם שם המסלול
    const response = await axios.get(
      'https://api.openweathermap.org/data/2.5/weather',
      {
        params: {
          q: trailName,
          appid: 'GOOGLE_PLACES_API_KEY', // ציין את ה-API Key שלך כאן
        },
      },
    );

    // אם הבקשה הצליחה וקיבלנו תשובה
    if (
      response.data &&
      response.data.weather &&
      response.data.weather.length > 0
    ) {
      // החזרת מידע על מזג האוויר של המקום שקשור למסלול
      return response.data.weather[0].description;
    } else {
      return null;
    }
  } catch (error) {
    console.error('Error getting trail difficulty:', error);
    return null;
  }
}

module.exports = {
  getPlacesByLocation,
  findPlaces,
  searchPlaceByName,
  getPlacesByTypes,
  getPlaceDescription,
  searchSimilarPlaces,
  getTrailDifficulty,
};
