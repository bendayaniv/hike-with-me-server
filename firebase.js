const { initializeApp, cert } = require('firebase-admin/app');
const { getFirestore } = require('firebase-admin/firestore');

const serviceAccount = require('./creds.json');

initializeApp({
  credential: cert(serviceAccount),
});

const firestore = getFirestore();

module.exports = { firestore };

// // Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
// // TODO: Add SDKs for Firebase products that you want to use
// // https://firebase.google.com/docs/web/setup#available-libraries

// // Your web app's Firebase configuration
// const firebaseConfig = {
//   apiKey: "AIzaSyBr1wztWdXPiVGA2OYG_4oQKezywnCxL3U",
//   authDomain: "hike-with-me-1efdd.firebaseapp.com",
//   projectId: "hike-with-me-1efdd",
//   storageBucket: "hike-with-me-1efdd.appspot.com",
//   messagingSenderId: "988854023201",
//   appId: "1:988854023201:web:18140789c4edca8fa89f60"
// };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);
