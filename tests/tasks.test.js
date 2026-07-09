const request = require('supertest');
const app = require('../server');

describe('Task Manager API', () => {
  test('GET /api/tasks returns an array', async () => {
    const res = await request(app).get('/api/tasks');
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  test('POST /api/tasks creates a task', async () => {
    const res = await request(app)
      .post('/api/tasks')
      .send({ title: 'Learn CI/CD' });
    expect(res.statusCode).toBe(201);
    expect(res.body.title).toBe('Learn CI/CD');
    expect(res.body.done).toBe(false);
  });

  test('POST /api/tasks rejects empty title', async () => {
    const res = await request(app).post('/api/tasks').send({ title: '' });
    expect(res.statusCode).toBe(400);
  });
});
