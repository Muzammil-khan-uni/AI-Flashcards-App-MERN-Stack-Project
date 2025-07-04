const { generateFlashcards } = require('../utils/geminiClient');

const getFlashcards = async (req, res) => {
  const { topic } = req.body;
  try {
    if (!topic) return res.status(400).json({ error: 'Topic is required' });
    const flashcards = await generateFlashcards(topic);
    res.json(flashcards);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: 'Failed to generate flashcards' });
  }
};

module.exports = { getFlashcards };
