const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 3000;

const userControllers = require('./controllers/user-controllers.js');
const recommendationControllers = require('./controllers/recommendation-controllers.js');
const hazardControllers = require('./controllers/hazard-controller.js');
const routeControllers = require('./controllers/route-controllers.js');

const { database } = require('./dal/firebase.js');

app.use(express.json());
app.use(cors());

app.use('/users', userControllers);
app.use('/recommendations', recommendationControllers);
app.use('/hazards', hazardControllers);
app.use('/routes', routeControllers);

// app.post('/addUser', async (req, res) => {
//   const { name, email, password } = req.body;

//   const user = {
//     name,
//     password,
//     email,
//   };

//   const directory = (email + password).replace(/[.]/g, '');
//   //realtime database
//   await database.ref('users/' + directory).set(user);

//   res.status(200).send(user);
// });

// app.get('/friends', async (req, res) => {
//   //realtime database
//   database.ref('users/associates').on('value', (snapshot) => {
//     const data = snapshot.val();
//     res.status(200).send(data);
//   });
// });

// app.get('/friends/:name', async (req, res) => {
//   const { name } = req.params;
//   if (!name || !(name in friends)) {
//     return res.sendStatus(404);
//   }

//   //realtime database
//   const snapshot = await database.ref('users/associates/' + name).once('value');
//   const data = snapshot.val();
//   res.status(200).send(data);
// });

// app.post('/addfriend', async (req, res) => {
//   const { name, status } = req.body;

//   //realtime database
//   await database.ref('users/associates/' + name).set({
//     status,
//   });

//   // friends[name] = status
//   res.status(200).send(req.body);
// });

// app.put('/changestatus', async (req, res) => {
//   const { name, newStatus } = req.body;

//   //realtime database
//   await database.ref('users/associates/' + name).set({
//     status: newStatus,
//   });

//   // friends[name] = newStatus
//   res.status(200).send(req.body);
// });

// app.delete('/friends', async (req, res) => {
//   const { name } = req.body;

//   //realtime database
//   await database.ref('users/associates/' + name).remove();

//   res.status(200).send(req.body);
// });

app.listen(PORT, () => {
  console.log(`Express server running at http://localhost:${PORT}/`);
});
