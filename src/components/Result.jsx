import { useState, useEffect } from "react";

export default function Result({ score, total, onComplete }) {
  const [barWidth, setBarWidth] = useState(0);
  const confidence = Math.round(60 + (score / total) * 40);

  useEffect(() => {
    const timeout = setTimeout(() => setBarWidth(confidence), 100);
    return () => clearTimeout(timeout);
  }, [confidence]);

  useEffect(() => {
    const timeout = setTimeout(onComplete, 2500);
    return () => clearTimeout(timeout);
  }, [onComplete]);

  return (
    <div className="screen result">
      <h2 className="result-title">Analysis Complete</h2>
      <div className="result-stat">
        <span className="result-label">Sweetness confidence</span>
        <span className="result-value">{confidence}%</span>
      </div>
      <div className="progress-bar-track">
        <div
          className="progress-bar-fill"
          style={{ width: `${barWidth}%` }}
        />
      </div>
      <p className="result-text fade-in">Final verification in progress…</p>
    </div>
  );
}
