const express = require('express');
const sql = require('mssql');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { getPool } = require('../config/database');

const router = express.Router();

// retrieve users
router.get('/users', async (req, res) => {
  try {
    const pool = getPool();
    const result = await pool.request().query('SELECT id, email, created_at FROM users');
    res.status(200).json(result.recordset);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch users' });
  }
});

// register user
router.post('/register', async (req, res) => {
  const { email, password, username } = req.body;
  if (!email || !password || !username) {
    return res.status(400).json({ error: 'Email, username, and password are required.' });
  }
  try {
    const pool = getPool();
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

// login user
router.post('/loggedin', async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ error: 'Email and password are required.' });
  }
  try {
    const pool = getPool();
    const result = await pool.request()
      .input('email', sql.VarChar, email)
      .query('SELECT * FROM users WHERE email = @email');
    
    if (result.recordset.length === 0) {
      return res.status(404).json({ error: 'Account not found.' });
    }
    const user = result.recordset[0];
    const comparepwd = await bcrypt.compare(password, user.password);
    if (comparepwd) {
      const secret = process.env.JWT_SECRET || 'secretkey';
      const token = jwt.sign({ userId: user.id }, secret, { expiresIn: '7d' });
      console.log('Token created for user:', user.id);
      return res.status(200).json({ 
        message: 'Login successful.',
        authToken: token,
        username: user.username,
        email: user.email,
        joinDate: user.created_at
      });
    }
    return res.status(401).json({ error: 'Incorrect password.' });
  } catch (error) {
    console.error('Login error:', error);
    return res.status(500).json({ error: 'An error has occurred.' });
  }
});

module.exports = router;
