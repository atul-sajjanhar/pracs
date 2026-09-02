// display.js
const express = require("express");
// Code to display all records from the sports table in the database
const { DatabaseSync } = require("node:sqlite");

const app = express();
app.use(express.json());

let db;

try {
  // Open the existing database file
  db = new DatabaseSync("app.db");

  // Prepare and execute a SELECT query
  const stmt = db.prepare("SELECT * FROM sports");
  const sports = stmt.all();

  // Display results
  if (sports.length === 0) {
    console.log("No records found in the sports table.");
  } else {
    console.log("Sports table contents:");
    console.table(sports);
  }
} catch (err) {
  console.error("Failed to read database:", err.message);
  process.exit(1);
}

app.get("/api/sports", (req, res) => {
  const stmt = db.prepare("SELECT * FROM sports");
  const sports = stmt.all();
  res.json(sports);
});

app.post("/api/sports", (req, res) => {
  const { name } = req.body;

  if (!name || name.trim() === "") {
    return res.status(400).json({
      error: "Sport name required"
    });
  }

  const stmt = db.prepare(
    "INSERT INTO sports (name) VALUES (?)"
  );

  stmt.run(name.trim());

  res.status(201).json({
    message: "Sport added"
  });
});

app.delete("/api/sports", (req, res) => {
  db.exec("DELETE FROM sports");
  res.json({
    message: "All sports cleared"
  });
});

app.put("/api/sports/:id", (req, res) => {
  const { id } = req.params;
  const { name } = req.body;

  if (!name || name.trim() === "") {
    return res.status(400).json({
      error: "Sport name required"
    });
  }

  const stmt = db.prepare(
    "UPDATE sports SET name = ? WHERE id = ?"
  );

  const result = stmt.run(name.trim(), id);

  if (result.changes === 0) {
    return res.status(404).json({
      error: "Sport not found"
    });
  }

  res.json({
    message: "Sport updated"
  });
});