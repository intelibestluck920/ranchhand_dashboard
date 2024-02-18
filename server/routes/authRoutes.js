// authRoutes.js
const express = require('express');
const authController = require('../controllers/authController');
const { authenticateToken } = require('../middlewares/authMiddleware');

const router = express.Router();

router.post('/register', authController.register);
router.post('/login', authController.login);
router.get('/protected', authenticateToken, (req, res) => {
  const { id, username } = req.user;

  res.json({ message: 'This is a protected route', users: { id, username } });
});

module.exports = router;
