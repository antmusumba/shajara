import db from './db';

export function getNotes() {
  return new Promise((resolve, reject) => {
    db.all('SELECT * FROM notes', [], (err, rows) => {
      if (err) {
        reject(err);
      } else {
        resolve(rows);
      }
    });
  });
}

export function getNoteById(id) {
  return new Promise((resolve, reject) => {
    db.get('SELECT * FROM notes WHERE id = ?', [id], (err, row) => {
      if (err) {
        reject(err);
      } else {
        resolve(row);
      }
    });
  });
}

export function addNote({ title, content }) {
  return new Promise((resolve, reject) => {
    db.run(
      'INSERT INTO notes (title, content) VALUES (?, ?)',
      [title, content],
      function (err) {
        if (err) {
          reject(err);
        } else {
          resolve({ id: this.lastID, title, content });
        }
      }
    );
  });
}
