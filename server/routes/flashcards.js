const express = require('express');
const { generateFlashcards } = require('../utils/ai');
const Flashcard = require('../models/Flashcard');

const router = express.Router();

// routes/flashcards.js
router.post('/', async (req, res) => {
  if (!req.session.userId) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  const { text, difficulty } = req.body; // Accept difficulty

  try {
    const cards = await generateFlashcards(text);

    // Save with user's chosen difficulty or default to 'medium'
    const savedCards = await Flashcard.insertMany(
      cards.map(card => ({
        question: card.question,
        answer: card.answer,
        userId: req.session.userId,
        difficulty: difficulty || 'medium', // use provided difficulty
        nextReview: new Date(), // start with today
      }))
    );

    res.json({ cards: savedCards });
  } catch (err) {
    res.status(500).json({ error: 'AI generation failed' });
  }
});

router.put('/:id/favorite', async (req, res) => {
  const { id } = req.params;
  const { favorite } = req.body;

  try {
    const updatedCard = await Flashcard.findByIdAndUpdate(
      id,
      { favorite },
      { new: true }
    );
    res.json(updatedCard);
  } catch (err) {
    res.status(500).json({ error: 'Failed to update favorite status' });
  }
});



module.exports = router;
