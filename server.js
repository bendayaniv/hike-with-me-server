const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 3000;

const userControllers = require('./controllers/user-controllers.js');
const recommendationControllers = require('./controllers/recommendation-controllers.js');
const hazardControllers = require('./controllers/hazard-controller.js');
const routeControllers = require('./controllers/route-controllers.js');
const tripControllers = require('./controllers/trip-controllers.js');

app.use(express.json());
app.use(cors());

app.use('/users', userControllers);
app.use('/recommendations', recommendationControllers);
app.use('/hazards', hazardControllers);
app.use('/routes', routeControllers);
app.use('/trips', tripControllers);

const googlePlaces = require('./bll/googlePlaces-logic.js');

// natural_feature, establishment

// googlePlaces
//   .findPlaces('natural_feature', '32.0853,34.7818', 10000, 'il')
//   .then((places) => {
//     console.log(places);
//   });

// // דוגמה לשימוש
// const placeName = 'נחל אלכסנדר'; // שם המקום שתרצה לחפש
// googlePlaces.searchPlaceByName(placeName).then((placeTypes) => {
//   console.log('Place types:', placeTypes);
// });

// const location = '31.59269186,35.38782644'; // מיקום
// const radius = 15000; // ברדיוס של 5 ק"מ
// const types = ['natural_feature', 'establishment']; // סוגי המקומות

// googlePlaces.getPlacesByTypes(types, location, radius).then((placeNames) => {
//   console.log('Place names:', placeNames);
// });

// // דוגמה לשימוש - קבלת תיאור על נחל אלכסנדר
// const placeName = 'Alexander Stream'; // שם המקום שתרצה לקבל תיאור עליו

// googlePlaces.getPlaceDescription(placeName).then((placeDescription) => {
//   if (placeDescription) {
//     console.log('Place description:', placeDescription);
//   } else {
//     console.log('Place description not found.');
//   }
// });

// // דוגמה לשימוש - חיפוש מקומות דומים לנחל אלכסנדר
// const descriptionKeywords = [
//   // 'stream',
//   // 'water',
//   // 'nature',
//   // 'beautiful',
//   // 'hiking',
//   'paths',
//   'Itineraries',
//   'nature trips',
//   'hiking trails',
//   'foot trips',
//   'day trips',
//   'Daily itineraries',
//   'A picnic in nature',
//   'hiking',
//   'Hiking trails in open areas',
// ]; // מילים מפתח בתיאור

// googlePlaces.searchSimilarPlaces(descriptionKeywords).then((similarPlaces) => {
//   if (similarPlaces) {
//     console.log('Similar places:', similarPlaces);
//   } else {
//     console.log('No similar places found.');
//   }
// });

// const trailName = 'Mount Whitney Trail'; // שם המסלול שתרצה לבדוק
// googlePlaces.getTrailDifficulty(trailName)
//   .then((difficulty) => {
//     if (difficulty) {
//       console.log('Trail difficulty:', difficulty);
//     } else {
//       console.log('Trail not found or difficulty not available.');
//     }
//   })
//   .catch((error) => {
//     console.error('Error:', error);
//   });

app.listen(PORT, () => {
  console.log(`Express server running at http://localhost:${PORT}/`);
});
