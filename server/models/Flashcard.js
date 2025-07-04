const mongoose = require('mongoose');

const FlashcardSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  question: String,
  answer: String,
  nextReview: Date,
  difficulty: { type: String, enum: ['easy', 'medium', 'hard'], default: 'medium' },
  favorite: { type: Boolean, default: false }  // <--- NEW FIELD
});

module.exports = mongoose.model('Flashcard', FlashcardSchema);
