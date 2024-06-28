require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 3000;

const userControllers = require('./controllers/user-controllers.js');
const recommendationControllers = require('./controllers/recommendation-controllers.js');
const hazardControllers = require('./controllers/hazard-controller.js');
const routeControllers = require('./controllers/route-controllers.js');
const tripControllers = require('./controllers/trip-controllers.js');

app.use(express.json());
app.use(cors());

app.use('/hike-with-me/users', userControllers);
app.use('/hike-with-me/recommendations', recommendationControllers);
app.use('/hike-with-me/hazards', hazardControllers);
app.use('/hike-with-me/routes', routeControllers);
app.use('/hike-with-me/trips', tripControllers);

app.listen(PORT, () => {
  console.log(`Express server running at http://localhost:${PORT}/`);
});
