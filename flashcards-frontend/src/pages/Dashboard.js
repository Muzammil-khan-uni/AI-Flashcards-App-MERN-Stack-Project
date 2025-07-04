import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FaHeart } from 'react-icons/fa';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export default function Dashboard() {
  const [cards, setCards] = useState([]);
  const [text, setText] = useState('');
  const [mode, setMode] = useState('view'); // view or review
  const [darkMode, setDarkMode] = useState(false);
  const [selectedDifficulty, setSelectedDifficulty] = useState('medium');

  // Fetch flashcards from backend
  const fetchCards = async () => {
    await fetch('http://localhost:5000/api/flashcards', {
  credentials: 'include' 
});

   
  };

const generate = async () => {
  const res = await fetch('http://localhost:5000/api/flashcards', {
    method: 'POST',
    headers: {'Content-Type': 'application/json' },
    credentials: 'include',
    body: JSON.stringify({text,difficulty: selectedDifficulty})
  });

  const data = await res.json();
  if (data && Array.isArray(data.cards)) {
    setCards(prev => [...prev, ...data.cards]);
  } else {
    console.error('Unexpected response format:', data);
  }
  
};

  useEffect(() => {
    fetchCards();
  }, []);

  // Chart Data for progress overview
  const countByDifficulty = { easy: 0, medium: 0, hard: 0};
  cards.forEach(c => {
    if (!c.difficulty) countByDifficulty.new++;
    else countByDifficulty[c.difficulty]++;
  });

 const chartData = {
  labels: ['Easy', 'Medium', 'Hard'],
  datasets: [
    {
      label: 'Flashcards',
      data: [
        countByDifficulty.easy,
        countByDifficulty.medium,
        countByDifficulty.hard
      ],
      backgroundColor: ['#28a745', '#ffc107', '#dc3545']
    }
  ]
};

const toggleFavorite = async (id, newFavoriteStatus) => {
  await fetch(`http://localhost:5000/api/flashcards/${id}/favorite`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    credentials: 'include',
    body: JSON.stringify({ favorite: newFavoriteStatus })
  });

  setCards(prevCards =>
    prevCards.map(card =>
      card._id === id ? { ...card, favorite: newFavoriteStatus } : card
    )
  );
};

  // CSS classes for dark mode
  const appClass = darkMode ? 'bg-dark text-light min-vh-100' : 'bg-light text-dark min-vh-100';

  return (
    <div className={`${appClass} p-4`}>
      <div className="container">
        <h2 className="mb-3">Dashboard</h2>
        <button
          className={`btn ${darkMode ? 'btn-light' : 'btn-dark'} mb-3 me-2`}
          onClick={() => setDarkMode(!darkMode)}
        >
          {darkMode ? 'Light Mode' : 'Dark Mode'}
        </button>
        <button
  onClick={() => {
    setMode(mode === 'view' ? 'favorite' : 'view');
  }}
  className="btn btn-secondary mb-3"
>
  Switch to {mode === 'view' ? 'Favorite Cards' : 'All Cards'} Mode
</button>

         <button
  className="btn btn-outline-danger float-end"
  onClick={() => {
    window.location.href = '/login';
  }}>Logout</button>


        {mode === 'view' ? (
          <>
            <div className="mb-3">
              <textarea
                value={text}
                onChange={(e) => setText(e.target.value)}
                className="form-control"
                rows="4"
                placeholder="Paste content here"
                style={{ backgroundColor: darkMode ? '#343a40' : 'white', color: darkMode ? 'white' : 'black' }}
              />
            </div>

            <div className="mb-3">
  <label htmlFor="difficultySelect" className="form-label">
    Select Difficulty for New Cards:
  </label>
  <select
    id="difficultySelect"
    value={selectedDifficulty}
    onChange={(e) => setSelectedDifficulty(e.target.value)}
    className="form-select"
  >
    <option value="easy">Easy</option>
    <option value="medium">Medium</option>
    <option value="hard">Hard</option>
  </select>
</div>

            <button onClick={generate} className="btn btn-primary mb-4">
              Generate Flashcards
            </button>
          


            <h4>Flashcard Progress</h4>
            <Bar data={chartData} options={{ responsive: true, plugins: { legend: { display: false } } }} />

            <div className="row mt-4">
  {cards.map((card, i) => {
    // Determine background color
    let bgColorClass = '';
    switch (card.difficulty) {
      case 'easy':
        bgColorClass = darkMode ? 'bg-success-subtle text-dark' : 'bg-success text-white';
        break;
      case 'medium':
        bgColorClass = darkMode ? 'bg-warning-subtle text-dark' : 'bg-warning text-dark';
        break;
      case 'hard':
        bgColorClass = darkMode ? 'bg-danger-subtle text-dark' : 'bg-danger text-white';
        break;
      default:
        bgColorClass = darkMode ? 'bg-secondary-subtle text-dark' : 'bg-secondary text-white';
    }

    return (
  <div key={i} className="col-md-6 col-lg-4 mb-3">
  <div className={`card ${bgColorClass}`}>
    <div className="card-body">
      <div className="d-flex justify-content-between align-items-start">
        <div>
          <h5 className="card-title">Q:</h5>
          <p className="card-text">{card.question}</p>
          <h6 className="card-title">A:</h6>
          <p className="card-text">{card.answer}</p>
        </div>
        <button
          className="btn btn-link p-0"
          onClick={() => toggleFavorite(card._id, !card.favorite)}
        >
          {card.favorite ? (
            <FaHeart color="red" size={24} />
          ) : (
            <FaHeart color="gray" size={24} />
          )}
        </button>
      </div>
    </div>
  </div>
</div>

    );
  })}
</div>

          </>
        ) : (
  <div className="row mt-4">
    {cards.filter(card => card.favorite).length > 0 ? (
      cards.filter(card => card.favorite).map((card, i) => {
        let bgColorClass = '';
        switch (card.difficulty) {
          case 'easy':
            bgColorClass = darkMode ? 'bg-success-subtle text-dark' : 'bg-success text-white';
            break;
          case 'medium':
            bgColorClass = darkMode ? 'bg-warning-subtle text-dark' : 'bg-warning text-dark';
            break;
          case 'hard':
            bgColorClass = darkMode ? 'bg-danger-subtle text-dark' : 'bg-danger text-white';
            break;
          default:
            bgColorClass = darkMode ? 'bg-secondary-subtle text-dark' : 'bg-secondary text-white';
        }

        return (
          <div key={i} className="col-md-6 col-lg-4 mb-3">
            <div className={`card ${bgColorClass}`}>
              <div className="card-body">
                <div className="d-flex justify-content-between align-items-start">
                  <div>
                    <h5 className="card-title">Q:</h5>
                    <p className="card-text">{card.question}</p>
                    <h6 className="card-title">A:</h6>
                    <p className="card-text">{card.answer}</p>
                  </div>
                  <button
                    className="btn btn-link p-0"
                    onClick={() => toggleFavorite(card._id, !card.favorite)}
                  >
                    {card.favorite ? (
                      <FaHeart color="red" size={24} />
                    ) : (
                      <FaHeart color="gray" size={24} />
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>
        );
      })
    ) : (
      <p className="text-muted">No favorite cards selected yet.</p>
    )}
  </div>
)}
      </div>

      <style>{`
        .flashcard-container {
          width: 100%;
          max-width: 500px;
          margin: auto;
        }
        .flashcard {
          position: relative;
          width: 100%;
          height: 150px;
          transition: transform 0.6s;
          transform-style: preserve-3d;
          box-shadow: 0 4px 8px rgba(0,0,0,0.2);
          border-radius: 8px;
          user-select: none;
          background-color: ${darkMode ? '#495057' : 'white'};
          color: ${darkMode ? 'white' : 'black'};
        }
        .flashcard.flipped {
          transform: rotateY(180deg);
        }
        .flashcard-front, .flashcard-back {
          position: absolute;
          width: 100%;
          height: 100%;
          backface-visibility: hidden;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 10px;
          box-sizing: border-box;
        }
        .flashcard-back {
          transform: rotateY(180deg);
        }
      `}</style>
    </div>
  );
}
