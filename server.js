const express = require('express');
const app = express();
const PORT = 3000;

const { database } = require('./firebase.js');

app.use(express.json());

app.get('/friends', async (req, res) => {
  //realtime database
  database.ref('users/associates').on('value', (snapshot) => {
    const data = snapshot.val();
    res.status(200).send(data);
  });
});

app.get('/friends/:name', async (req, res) => {
  const { name } = req.params;
  if (!name || !(name in friends)) {
    return res.sendStatus(404);
  }

  //realtime database
  const snapshot = await database.ref('users/associates/' + name).once('value');
  const data = snapshot.val();
  res.status(200).send(data);
});

app.post('/addfriend', async (req, res) => {
  const { name, status } = req.body;

  //realtime database
  await database.ref('users/associates/' + name).set({
    status,
  });

  // friends[name] = status
  res.status(200).send(friends);
});

app.put('/changestatus', async (req, res) => {
  const { name, newStatus } = req.body;

  //realtime database
  await database.ref('users/associates/' + name).set({
    status: newStatus,
  });

  // friends[name] = newStatus
  res.status(200).send(friends);
});

app.delete('/friends', async (req, res) => {
  const { name } = req.body;

  //realtime database
  await database.ref('users/associates/' + name).remove();

  res.status(200).send(friends);
});

app.listen(PORT, () => {
  console.log(`Express server running at http://localhost:${PORT}/`);
});
