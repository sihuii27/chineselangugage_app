const express = require('express');
const sql = require('mssql');
const { verifyToken } = require('../middleware/auth');
const { getPool } = require('../config/database');

const router = express.Router();

// get user profile
router.get('/profile', verifyToken, async (req, res) => {
  try {
    const pool = getPool();
    const result = await pool.request()
      .input('id', sql.Int, req.userId)
      .query('SELECT id, username, email, created_at FROM users WHERE id = @id');
    
    if (result.recordset.length === 0) {
      return res.status(404).json({ error: 'User not found.' });
    }
    const user = result.recordset[0];
    res.status(200).json({
      username: user.username,
      email: user.email,
      joinDate: user.created_at
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch profile.' });
  }
});

module.exports = router;
