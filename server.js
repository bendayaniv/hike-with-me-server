const express = require('express');
const app = express();
const PORT = 3000;

app.get("/", (req, res) => {
  console.log("Request received!");
  res.send("Hello from Express 1212!");
});

app.listen(PORT, () => {
  console.log(`Express server running at http://localhost:${PORT}/`);
});