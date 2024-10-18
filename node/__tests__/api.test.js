const request = require('supertest');
const { app, server } = require('../index');

describe('API Tests', () => {
  afterAll((done) => {
    server.close(); // Close the server after tests
    done();
  });

  it('should respond with a 200 status for the /api endpoint', async () => {
    const response = await request(app).get('/api');
    expect(response.status).toBe(200);
  });

  it('should respond with a 200 status and return all users from the /api/all endpoint', async () => {
    const response = await request(app).get('/api/all');
    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true); // Check if the response body is an array
  });

  it('should create a new user at /api/form', async () => {
    const newUser = { name: 'John Doe', email: 'john@example.com', age: 30 };
    
    const response = await request(app).post('/api/form').send(newUser);
    expect(response.status).toBe(201);
    expect(response.body.name).toBe(newUser.name);
    expect(response.body.email).toBe(newUser.email);
  });
});
