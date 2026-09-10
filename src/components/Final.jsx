import { useState, useEffect } from "react";
import { playPress, playVictory } from "../sounds";
import { quotes } from "../data/questions";
import PomegranateRain from "./PomegranateRain";

export default function Final({ onReplay, onPhaseChange }) {
  const [phase, setPhase] = useState(0);

  /*
   * One random wish per mount — Replay remounts Final, so a new quote appears.
   * Lazy useState initializer runs exactly once and is allowed to be impure.
   */
  const [quote] = useState(
    () => quotes[Math.floor(Math.random() * quotes.length)]
  );

  useEffect(() => {
    const timers = [
      setTimeout(() => setPhase(1), 2400),
      setTimeout(() => setPhase(2), 4200),
      setTimeout(() => setPhase(3), 6200),
      setTimeout(() => setPhase(4), 8200),
    ];
    return () => timers.forEach(clearTimeout);
  }, []);

  /* Notify parent of phase changes (to hide video at phase 4) */
  useEffect(() => {
    if (onPhaseChange) onPhaseChange(phase);
  }, [phase, onPhaseChange]);

  /* Victory jingle at reveal — the aril rain is driven by <PomegranateRain active> */
  useEffect(() => {
    if (phase === 4) playVictory();
  }, [phase]);

  return (
    <div className="screen final">
      {/* Video is rendered at App level — overlay sits on top */}
      {phase < 4 && <div className="final-video-overlay" />}

      {/* Phase 0 — Installing animation */}
      {phase === 0 && (
        <div className="final-processing fade-in">
          <p className="final-processing-text">
            INSTALLING NEW YEAR<span className="final-dots">...</span>
          </p>
          <div className="final-loader-track">
            <div className="final-loader-fill" />
          </div>
        </div>
      )}

      {/* Phase 1 — UPDATE COMPLETE */}
      {phase === 1 && (
        <h1 className="final-confirmed final-pop">UPDATE COMPLETE</h1>
      )}

      {/* Phase 2 — 5787 — LVL 5787 UNLOCKED + what the year's letters spell */}
      {phase === 2 && (
        <div className="final-unlock fade-in">
          <h2 className="final-year">5787</h2>
          <p className="final-lvl">LVL 5787 UNLOCKED</p>
          <p className="final-meaning">
            5787 is written <span className="he-body">תשפ״ז</span>. Tradition
            reads the letters as a wish —{" "}
            <span className="he-body">תהא שנת פריחה וזריחה</span>, "may it be a
            year of blossoming and sunrise." It ends in 7: the number of
            completion.
          </p>
        </div>
      )}

      {/* Phase 3 — Shana Tova */}
      {phase === 3 && (
        <div className="final-love-msg fade-in">
          <p className="final-love he">שנה טובה</p>
          <p className="final-love">Shana Tova</p>
        </div>
      )}

      {/* Phase 4 — Full-screen image with text overlay + pomegranate arils */}
      <PomegranateRain active={phase === 4} />
      {phase === 4 && (
        <div className="final-reveal fade-in">
          <img
            src={`${import.meta.env.BASE_URL}reveal.jpg`}
            alt="Shana Tova"
            className="final-fullscreen-img"
          />
          <div className="final-overlay">
            <div className="final-overlay-top">
              <div className="final-orange-banner">LVL 5787 UNLOCKED</div>
            </div>
            <div className="final-overlay-bottom">
              <p className="final-love-big he">שנה טובה ומתוקה</p>
              <p className="final-love-sm">
                Shana Tova U'Metuka · Ktiva v'Chatima Tova
              </p>
              <div className="final-quote-banner">
                <span className="final-quote-he he-body">{quote.he}</span>
                <span className="final-quote-en">{quote.en}</span>
              </div>
              <p className="final-from">From Ron</p>
              {onReplay && (
                <button
                  className="btn-replay"
                  onClick={() => {
                    playPress();
                    onReplay();
                  }}
                >
                  Replay
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
