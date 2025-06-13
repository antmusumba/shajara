const sqlite3 = require('sqlite3').verbose();

const db = new sqlite3.Database('./notes.db', (err) => {
  if (err) {
    console.error(err.message);
  }
  console.log('Connected to the notes database.');
});

db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS notes (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      content TEXT NOT NULL
    )
  `);
});

export default db;