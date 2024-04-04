const express = require("express");
const fetch = require("node-fetch");

const PORT = process.env.PORT || 3000;

let app = express();
const ALB_DNS = process.env.ALB_DNS;

app.get("/", async (req, res) => {
  fetch("http://169.254.169.254/latest/meta-data/hostname").then(
    async (response) => {
      const hostname = await response.text();
      res.send(`Hello from ${hostname}`);
    },
  );
});

app.get("/rentals", async (req, res) => {
  fetch(`http://${ALB_DNS}/rentals`).then(async (response) => {
    const data = await response.json();
    res.json(data);
  });
});

app.use((req, res) => {
  res.status(404).send("404 NOT FOUND");
});

app.listen(PORT, () => {
  console.log(`Listening on PORT ${PORT}`);
});
