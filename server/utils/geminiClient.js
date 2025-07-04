const { GoogleGenerativeAI } = require("@google/generative-ai");

// Load your key from .env
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

async function generateFlashcards(topic) {
  const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

  const prompt = `Generate 5 flashcards in the format:
Q: <question>
A: <answer>
Topic: ${topic}`;

  const result = await model.generateContent(prompt);
  const response = await result.response;
  const text = response.text();

  const flashcards = text
    .split('\n')
    .filter(line => line.startsWith('Q:') || line.startsWith('A:'))
    .reduce((acc, line, i, arr) => {
      if (line.startsWith('Q:') && arr[i + 1]?.startsWith('A:')) {
        acc.push({
          question: line.replace('Q:', '').trim(),
          answer: arr[i + 1].replace('A:', '').trim(),
        });
      }
      return acc;
    }, []);

  return flashcards;
}

module.exports = { generateFlashcards };
