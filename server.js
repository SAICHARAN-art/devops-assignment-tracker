const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;
const db = new sqlite3.Database(process.env.DB_PATH || path.join(__dirname, 'assignments.db'));

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

db.serialize(() => {
  db.run(`CREATE TABLE IF NOT EXISTS assignments (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    subject TEXT NOT NULL,
    due_date TEXT NOT NULL,
    status TEXT NOT NULL DEFAULT 'Pending'
  )`);
});

app.get('/api/health', (req, res) => res.json({ status: 'UP' }));

app.get('/api/assignments', (req, res) => {
  db.all('SELECT * FROM assignments ORDER BY due_date ASC, id DESC', [], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

app.post('/api/assignments', (req, res) => {
  const { title, subject, due_date } = req.body;
  if (!title || !subject || !due_date) {
    return res.status(400).json({ error: 'Title, subject and due date are required' });
  }
  db.run(
    'INSERT INTO assignments (title, subject, due_date, status) VALUES (?, ?, ?, ?)',
    [title, subject, due_date, 'Pending'],
    function (err) {
      if (err) return res.status(500).json({ error: err.message });
      res.status(201).json({ id: this.lastID, title, subject, due_date, status: 'Pending' });
    }
  );
});

app.put('/api/assignments/:id/toggle', (req, res) => {
  db.get('SELECT status FROM assignments WHERE id = ?', [req.params.id], (err, row) => {
    if (err) return res.status(500).json({ error: err.message });
    if (!row) return res.status(404).json({ error: 'Assignment not found' });
    const next = row.status === 'Completed' ? 'Pending' : 'Completed';
    db.run('UPDATE assignments SET status = ? WHERE id = ?', [next, req.params.id], function (err2) {
      if (err2) return res.status(500).json({ error: err2.message });
      res.json({ id: Number(req.params.id), status: next });
    });
  });
});

app.delete('/api/assignments/:id', (req, res) => {
  db.run('DELETE FROM assignments WHERE id = ?', [req.params.id], function (err) {
    if (err) return res.status(500).json({ error: err.message });
    if (!this.changes) return res.status(404).json({ error: 'Assignment not found' });
    res.status(204).send();
  });
});

if (require.main === module) {
  app.listen(PORT, () => console.log(`Assignment Tracker running on port ${PORT}`));
}

module.exports = app;
