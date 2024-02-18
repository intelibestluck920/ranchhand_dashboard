const express = require('express');
const router = express.Router();
const twilioController = require('../controllers/twilioController');
const { authenticateToken } = require('../middlewares/authMiddleware');

router.get('/sendSMS', twilioController.sendSMS);

module.exports = router;