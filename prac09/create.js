// create.js 
// Standalone code to create a new database, if it doesn't already exist
const { DatabaseSync } = require("node:sqlite");

let db;

try {
  db = new DatabaseSync("app.db");

  db.exec(`
    CREATE TABLE IF NOT EXISTS sports (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL
    )
  `);

  console.log("Sports table ready.");
} catch (err) {
  console.error("Database initialisation failed:", err.message);
  process.exit(1);
}
