// index.js
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const db = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const animalRoutes = require('./routes/animalRoutes');
const twilioRoutes = require('./routes/twilioRoutes');

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

app.use('/auth', authRoutes)
app.use('/animal', animalRoutes);
app.use('/twilio', twilioRoutes);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});