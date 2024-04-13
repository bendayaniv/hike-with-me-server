const express = require('express');
const app = express();
const PORT = 3000;

const { firestore } = require('./firebase.js');

app.use(express.json());

const friends = {
  james: 'friend',
  larry: 'friend',
  lucy: 'friend',
  banana: 'enemy',
};

app.get('/friends', async (req, res) => {
  const peopleRef = firestore.collection('people').doc('associates');
  const doc = await peopleRef.get();
  if (!doc.exists) {
    return res.sendStatus(400);
  }

  res.status(200).send(doc.data());
});

app.get('/friends/:name', (req, res) => {
  const { name } = req.params;
  if (!name || !(name in friends)) {
    return res.sendStatus(404);
  }
  res.status(200).send({ [name]: friends[name] });
});

app.post('/addfriend', async (req, res) => {
  const { name, status } = req.body;
  const peopleRef = firestore.collection('people').doc('associates');
  const res2 = await peopleRef.set(
    {
      [name]: status,
    },
    { merge: true },
  );
  // friends[name] = status
  res.status(200).send(friends);
});

app.patch('/changestatus', async (req, res) => {
  const { name, newStatus } = req.body;
  const peopleRef = firestore.collection('people').doc('associates');
  const res2 = await peopleRef.set(
    {
      [name]: newStatus,
    },
    { merge: true },
  );
  // friends[name] = newStatus
  res.status(200).send(friends);
});

app.delete('/friends', async (req, res) => {
  const { name } = req.body;
  const peopleRef = firestore.collection('people').doc('associates');
  const res2 = await peopleRef.update({
    [name]: FieldValue.delete(),
  });
  res.status(200).send(friends);
});

app.get('/', (req, res) => {
  res.send('Hello from Express!');
});

app.listen(PORT, () => {
  console.log(`Express server running at http://localhost:${PORT}/`);
});
