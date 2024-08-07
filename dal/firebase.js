const multer = require('multer');

const { initializeApp, cert } = require('firebase-admin/app');

const serviceAccount = require('../creds.json');

// Realtime Database
const { getDatabase } = require('firebase-admin/database');
const { getStorage } = require('firebase-admin/storage');

// const firebaseConfig = {
//   apiKey: 'AIzaSyBr1wztWdXPiVGA2OYG_4oQKezywnCxL3U',
//   authDomain: 'hike-with-me-1efdd.firebaseapp.com',
//   projectId: 'hike-with-me-1efdd',
//   storageBucket: 'hike-with-me-1efdd.appspot.com',
//   messagingSenderId: '988854023201',
//   appId: '1:988854023201:web:18140789c4edca8fa89f60',
//   databaseURL: 'https://hike-with-me-1efdd-default-rtdb.firebaseio.com/',
// };

const app = initializeApp({
  credential: cert(serviceAccount),
  databaseURL: 'https://hike-with-me-1efdd-default-rtdb.firebaseio.com/', // for Realtime Database
  storageBucket: 'gs://hike-with-me-1efdd.appspot.com', // for Storage
});

const database = getDatabase(app);
const storage = getStorage(app);

// Set up the Firebase Storage bucket
const bucket = storage.bucket();

// Set up multer for handling file uploads
const upload = multer({ storage: multer.memoryStorage() });

module.exports = {
  database,
  storage,
  upload,
};
