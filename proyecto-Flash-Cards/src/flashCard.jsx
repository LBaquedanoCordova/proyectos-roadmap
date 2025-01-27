import PropTypes from "prop-types"; 

export default function FlashCard({ question, answer, flipped}) {
  return (
    <div className={`flashcard ${flipped ? "flipped" : ""}`}>
      <div className="flashcard-inner">
        <div className="flashcard-front">
          <p>{question}</p>
        </div>
        <div className="flashcard-back">
          <p>{answer}</p>
        </div>
      </div>

    </div>
  );
}

FlashCard.propTypes = {
  question: PropTypes.string.isRequired,
  answer: PropTypes.string.isRequired,
  flipped: PropTypes.bool.isRequired,
//   onFlip: PropTypes.func.isRequired,
};
