const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const authRoutes = require('./routes/auth');
const flashcardRoutes = require('./routes/flashcards');
const cors = require('cors');
require('dotenv').config();

const app = express();

app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true
}));

app.use(express.json());

// --- Add session setup ---
app.use(session({
  secret: 'your_super_secret_session_key', // put in .env for production
  resave: false,
  saveUninitialized: false,
  store: MongoStore.create({ mongoUrl: process.env.MONGO_URI }),
  cookie: { maxAge: 1000 * 60 * 60 * 24 } // 1 day
}));

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.error(err));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/flashcards', flashcardRoutes);

app.get('/', (req, res) => {
  res.send('AI Flashcards App Backend running.');
});

app.listen(5000, () => {
  console.log('Server running on port 5000');
});
