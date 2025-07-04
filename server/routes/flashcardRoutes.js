const express = require('express');
const { getFlashcards } = require('../controllers/flashcardController');

const router = express.Router();

// POST /api/flashcards
router.post('/', getFlashcards);

module.exports = router;
