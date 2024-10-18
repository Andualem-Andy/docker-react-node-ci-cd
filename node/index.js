const express = require('express');
const { Pool } = require('pg');

const app = express();
const port = 3000;

// Middleware to parse JSON requests
app.use(express.json());

// Initialize PostgreSQL client
const pool = new Pool({
  // Your database configuration here
});

// Endpoint to create a table (ensure it is only called once or in a setup script)
app.get('/create-table', async (req, res) => {
  try {
    await pool.query(`
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        name VARCHAR(100),
        email VARCHAR(100),
        age INT
      )
    `);
    res.status(200).send('Table created successfully');
  } catch (error) {
    console.error('Error creating table:', error);
    res.status(500).send('Error creating table');
  }
});

// Endpoint to retrieve all users
app.get('/api/all', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM users');
    res.status(200).json(result.rows);
  } catch (error) {
    console.error('Error retrieving users:', error);
    res.status(500).send('Error retrieving users');
  }
});

// Endpoint to create a new user
app.post('/api/form', async (req, res) => {
  const { name, email, age } = req.body;
  try {
    const result = await pool.query(
      'INSERT INTO users (name, email, age) VALUES ($1, $2, $3) RETURNING *',
      [name, email, age]
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error('Error creating user:', error);
    res.status(500).send('Error creating user');
  }
});

// Start the server and export for testing
const server = app.listen(port, () => {
  console.log(`App running on port ${port}`);
});

// Export the app and server for testing
module.exports = { app, server };
