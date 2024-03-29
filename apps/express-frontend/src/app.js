const express = require("express");
const fetch = require("node-fetch");

const PORT = process.env.PORT || 3000;

let app = express();
const APPLICATION_LOAD_BALANCER = process.env.APPLICATION_LOAD_BALANCER;

app.get("/", async (req, res) => {
  fetch("http://169.254.169.254/latest/meta-data/hostname").then(
    async (response) => {
      const hostname = await response.text();
      res.send(`Hello from ${hostname}`);
    },
  );
});

app.get("/rentals", async (req, res) => {
  fetch(`http://${APPLICATION_LOAD_BALANCER}/rentals`).then(
    async (response) => {
      const data = await response.json();
      res.send(data);
    },
  );
});

// Custom 404 route not found handler
app.use((req, res) => {
  res.status(404).send("404 not found");
});

app.listen(PORT, () => {
  console.log(`Listening on PORT ${PORT}`);
});
