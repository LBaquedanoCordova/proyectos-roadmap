import { useState } from "react";
import "./App.css";
import FlashCard from "./flashCard";
import questions from "./questions";

export default function App() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);

  const nextCard = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setFlipped(false);
    }
  };

  const prevCard = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
      setFlipped(false);
    }
  };

  const handleFlip = () => {
    setFlipped(!flipped);
  };

  const progressPercentage = Math.round(((currentIndex + 1) / questions.length) * 100);

  return (
    <div className="app">
      <h1>Flash Cards</h1>

      <div className="progress-bar-container">
        <div className="progress-bar">
          <div
            className="progress"
            style={{ width: `${progressPercentage}%` }}
          ></div>
        </div>
        <p className="progress-percentage">{progressPercentage}%</p>
      </div>

      <div className="flashcard-container">
        <FlashCard
          question={questions[currentIndex].question}
          answer={questions[currentIndex].answer}
          flipped={flipped}
          // onFlip={handleFlip}
        />
      </div>

      <div className="navigation">
        <button className="prevBtn" onClick={prevCard} disabled={currentIndex === 0}>
          Previous
        </button>

        <button className="showbtn" onClick={handleFlip}>
        {flipped ? "Hide Answer" : "Show Answer"}
      </button>

        <button className="nextBtn" onClick={nextCard} disabled={currentIndex === questions.length - 1}>
          Next
        </button>
      </div>
    </div>
  );
}

