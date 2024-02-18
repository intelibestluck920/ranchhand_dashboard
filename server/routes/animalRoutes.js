const express = require('express');
const router = express.Router();
const { authenticateToken } = require('../middlewares/authMiddleware');
const animalController = require('../controllers/animalController');

router.get("/api/getAllAnimalData", authenticateToken, animalController.getAllAnimalData);
router.get("/api/getAnimalDataDate", authenticateToken, animalController.getAllAnimalDataDate);
router.get("/api/getAllAnimalId", authenticateToken, animalController.getAllAnimalId);
router.get("/api/getAnimalData/:id", authenticateToken, animalController.getAnimalDataFromId);

module.exports = router;