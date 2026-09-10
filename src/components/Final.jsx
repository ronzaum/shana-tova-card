import { useState, useEffect } from "react";
import { playPress, playVictory } from "../sounds";
import PomegranateRain from "./PomegranateRain";

/* 5787 = תשפ״ז — tradition reads the letters as a wish */
const yearWish = ["תהא", "שנת", "פריחה", "וזריחה"];

export default function Final({ onReplay, onPhaseChange }) {
  const [phase, setPhase] = useState(0);

  /*
   * Phase timeline (ms) — the final video is 8 s and loops underneath.
   * Phase 3 (Shana Tova) is held for 4.2 s so it can actually be read.
   */
  useEffect(() => {
    const timers = [
      setTimeout(() => setPhase(1), 2200),
      setTimeout(() => setPhase(2), 4000),
      setTimeout(() => setPhase(3), 6200),
      setTimeout(() => setPhase(4), 10400),
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
      {/* Video is rendered at App level — overlay sits on top, darker while text is up */}
      {phase < 4 && (
        <div className={`final-video-overlay ${phase === 3 ? "dim" : ""}`} />
      )}

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

      {/* Phase 2 — 5787 — LVL 5787 UNLOCKED */}
      {phase === 2 && (
        <div className="final-unlock fade-in">
          <h2 className="final-year">5787</h2>
          <p className="final-lvl">LVL 5787 UNLOCKED</p>
          <p className="final-year-he he-body">תשפ״ז</p>
        </div>
      )}

      {/* Phase 3 — Shana Tova, boxed for readability over the video */}
      {phase === 3 && (
        <div className="final-love-msg final-pop">
          <div className="final-love-box">
            <div className="final-love-stars" aria-hidden="true">
              <span className="magen">✡</span>
              <span className="magen">✡</span>
              <span className="magen">✡</span>
            </div>
            <p className="final-love he final-glow">שנה טובה</p>
            <p className="final-love">Shana Tova</p>
            <p className="final-love-sub he-body">ומתוקה · 5787</p>
          </div>
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
              <div className="final-title-wrap">
                <span className="magen final-magen" aria-hidden="true">✡</span>
                <p className="final-love-big he final-shine">שנה טובה ומתוקה</p>
                <span className="magen final-magen" aria-hidden="true">✡</span>
              </div>
              <p className="final-love-sm">
                Shana Tova U'Metuka · Ktiva v'Chatima Tova
              </p>

              {/* The year's own message — staggered word pop, then the translation */}
              <div className="final-year-msg">
                <p className="final-year-msg-label">
                  5787 · <span className="he-body">תשפ״ז</span> · reads as
                </p>
                <p className="final-year-msg-he he-body">
                  {yearWish.map((w, i) => (
                    <span
                      key={i}
                      className="year-word"
                      style={{ animationDelay: `${1.0 + i * 0.4}s` }}
                    >
                      {w}
                    </span>
                  ))}
                </p>
                <p className="final-year-msg-en">
                  "May it be a year of blossoming and sunrise."
                </p>
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
