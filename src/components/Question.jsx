import { useState } from "react";
import questions, { correctFeedback, wrongFeedback } from "../data/questions";
import { playCorrect, playWrong } from "../sounds";

export default function Question({ index, onAnswer }) {
  const [selected, setSelected] = useState(null);
  const [feedback, setFeedback] = useState(null);

  const q = questions[index];

  const handleSelect = (optionIndex) => {
    if (selected !== null) return;
    setSelected(optionIndex);

    const isCorrect = optionIndex === q.correct;
    isCorrect ? playCorrect() : playWrong();
    const pool = isCorrect ? correctFeedback : wrongFeedback;
    setFeedback(pool[index % pool.length]);

    setTimeout(() => {
      onAnswer(isCorrect);
    }, 800);
  };

  return (
    <div className="screen question">
      <div className="question-counter">
        {index + 1} / {questions.length}
      </div>
      <h2 className="question-text">{q.question}</h2>
      <div className="options">
        {q.options.map((opt, i) => {
          let cls = "btn-option";
          if (selected !== null) {
            if (i === q.correct) cls += " correct";
            else if (i === selected) cls += " wrong";
          }
          return (
            <button
              key={i}
              className={cls}
              onClick={() => handleSelect(i)}
              disabled={selected !== null}
            >
              {opt}
            </button>
          );
        })}
      </div>
      {feedback && <p className="feedback fade-in">{feedback}</p>}
    </div>
  );
}
