const express = require("express");
const cors = require("cors");
const { Client } = require("pg");

const PORT = process.env.PORT || 3000;

const client = new Client({
  host: process.env.DB_HOSTNAME,
  port: process.env.DB_PORT,
  database: process.env.DB_NAME,
  user: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
});

client.connect();
const app = express();

async function initializeDatabase() {
  try {
    await client.query(`
      CREATE TABLE IF NOT EXISTS rentals (
        id SERIAL PRIMARY KEY,
        name VARCHAR(100) NOT NULL,
        info_primary TEXT,
        info_secondary TEXT,
        price FLOAT
      )
    `);

    await client.query("DELETE FROM rentals");

    // Insert initial data
    await client.query(`
      INSERT INTO rentals (name, info_primary, info_secondary, price) 
      VALUES 
        ('KAJAK', 'CHOOSE FROM DIFFERENT KAJAKS', 'SAFETY GEAR INCLUDED. ALONG WITH PADDLES.', '12'),
        ('SUP BOARD', 'DIFFERENT SIZES', 'SPECIAL: BEAST WITH 10 METERS OF LENGTH(UP TO 10 PERSONS)', '20'),
        ('BIKES', 'BIKES FOR OLD AND YOUNG', 'CHOICE BETWEEN INTERMEDIATE AND PREMIUM BIKES', '30')
    `);
    console.log("Database initialized");
  } catch (err) {
    console.error("Error initializing database:", err);
  }
}

initializeDatabase();

app.get("/", cors(), async (req, res) => {
  res.json({ message: "hello world" });
});

app.get("/rentals", cors(), async (req, res) => {
  try {
    const result = await client.query("SELECT * FROM rentals");
    res.json(result.rows);
  } catch (err) {
    console.error("Error getting rentals:", err);
    res.status(500).send("Internal Server Error");
  }
});

app.use((req, res) => {
  res.status(404).send("404 NOT FOUND");
});

app.listen(PORT, () => {
  console.log(`Listening on PORT ${PORT}`);
});
