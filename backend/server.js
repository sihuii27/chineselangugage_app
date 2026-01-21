const express = require('express');
const cors = require('cors');
require('dotenv').config();
const sql = require('mssql');
const bcrypt = require('bcryptjs');

const app = express();
app.use(cors());
app.use(express.json());

const config = {
  server: process.env.DB_SERVER,
  database: process.env.DB_DATABASE,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  port: parseInt(process.env.DB_PORT),
  authentication: {
    type: 'default'
  },
  options: {
    encrypt: true,
    trustServerCertificate: false,
    connectTimeout: 15000
  }
};

let pool;
sql.connect(config).then(p => {
  pool = p;
  console.log('Connected to Azure SQL Database');
}).catch(err => console.error('Database connection failed:', err));

// Get all users
app.get('/users', async (req, res) => {
  try {
    const result = await pool.request().query('SELECT id, email, created_at FROM users');
    res.status(200).json(result.recordset);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch users' });
  }
});

app.post('/register', async (req, res) => {
  const { email, password, username } = req.body;
  if (!email || !password || !username) {
    return res.status(400).json({ error: 'Email, username, and password are required.' });
  }
  try {
    const hashpwd = bcrypt.hashSync(password, 10);
    const result = await pool.request()
      .input('email', sql.VarChar, email)
      .input('username', sql.VarChar, username)
      .input('password', sql.VarChar, hashpwd)
      .query('INSERT INTO users (email, username, password) VALUES (@email, @username, @password)');
    res.status(201).json({ message: 'User registered successfully.' });
  } catch (error) {
    if (error.number === 2627) { 
      return res.status(409).json({ error: 'Username or email already exists.' });
    }
    return res.status(500).json({ error: 'An error has occurred.' });
  }
});

app.post('/loggedin', async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ error: 'Email and password are required.' });
  }
  try {
    const result = await pool.request()
      .input('email', sql.VarChar, email)
      .query('SELECT * FROM users WHERE email = @email');
    
    if (result.recordset.length === 0) {
      return res.status(404).json({ error: 'Account not found.' });
    }
    const user = result.recordset[0];
    const comparepwd = await bcrypt.compare(password, user.password);
    if (comparepwd) {
      return res.status(200).json({ message: 'Login successful.', username: user.username });
    }
    return res.status(401).json({ error: 'Incorrect password.' });
  } catch (error) {
    return res.status(500).json({ error: 'An error has occurred.' });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));