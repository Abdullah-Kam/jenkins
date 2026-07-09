const express = require('express');
const path = require('path');

const app = express();
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// In-memory "database" — fine for a demo, swap for a real DB later
let tasks = [
  { id: 1, title: 'Set up Jenkins', done: false },
  { id: 2, title: 'Write a Jenkinsfile', done: false },
  { id: 3, title: 'Wire up GitHub webhook', done: false },
];
let nextId = 4;

// Health check — Jenkins/monitoring can hit this
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok' });
});

app.get('/api/tasks', (req, res) => {
  res.json(tasks);
});

app.post('/api/tasks', (req, res) => {
  const { title } = req.body;
  if (!title || typeof title !== 'string' || !title.trim()) {
    return res.status(400).json({ error: 'title is required' });
  }
  const task = { id: nextId++, title: title.trim(), done: false };
  tasks.push(task);
  res.status(200).json(task);
});

app.put('/api/tasks/:id', (req, res) => {
  const id = parseInt(req.params.id, 10);
  const task = tasks.find((t) => t.id === id);
  if (!task) return res.status(404).json({ error: 'task not found' });

  const { title, done } = req.body;
  if (title !== undefined) task.title = title;
  if (done !== undefined) task.done = done;

  res.json(task);
});

app.delete('/api/tasks/:id', (req, res) => {
  const id = parseInt(req.params.id, 10);
  const exists = tasks.some((t) => t.id === id);
  if (!exists) return res.status(404).json({ error: 'task not found' });

  tasks = tasks.filter((t) => t.id !== id);
  res.status(204).send();
});

// Only start the server if this file is run directly (not when required by tests)
if (require.main === module) {
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`Task manager running on http://localhost:${PORT}`);
  });
}

module.exports = app;
