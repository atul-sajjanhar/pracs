// seed.js
// Code to seed the database with sample sports data
const { DatabaseSync } = require("node:sqlite");

// Sample data to seed
const sampleSports = [
  "Soccer",
  "Tennis",
  "Basketball",
  "Cricket",
  "Rugby",
  "Hockey"
];

let db;

try {
  // Open existing database
  db = new DatabaseSync("app.db");

  // Optional: clear existing data first
  db.exec("DELETE FROM sports");

  // Prepare insert statement once
  const stmt = db.prepare(
    "INSERT INTO sports (name) VALUES (?)"
  );

  // Insert each sport
  for (const sport of sampleSports) {
    stmt.run(sport);
  }

  console.log("Database seeded with sample sports.");
} catch (err) {
  console.error("Failed to seed database:", err.message);
  process.exit(1);
}