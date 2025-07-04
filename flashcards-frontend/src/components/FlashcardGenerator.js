import React, { useState } from 'react';

const FlashcardGenerator = () => {
  const [topic, setTopic] = useState('');
  const [difficulty, setDifficulty] = useState('medium'); // Default value

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch('/api/flashcards/generate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ topic, difficulty })
    });

    const data = await response.json();
    // Handle response as needed
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>Topic:</label>
      <input
        type="text"
        value={topic}
        onChange={(e) => setTopic(e.target.value)}
      />

      <label>Difficulty:</label>
      <select
        value={difficulty}
        onChange={(e) => setDifficulty(e.target.value)}
      >
        <option value="easy">Easy</option>
        <option value="medium">Medium</option>
        <option value="hard">Hard</option>
      </select>

      <button type="submit">Generate Flashcards</button>
    </form>
  );
};

export default FlashcardGenerator;
