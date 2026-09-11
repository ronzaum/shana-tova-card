import { useState, useEffect } from "react";
import { playLandingMusic, stopLandingMusic } from "../sounds";

const scanLines = [
  "Scanning honey levels…",
  "Counting pomegranate seeds…",
  "Tuning shofar…",
  "Cross-referencing Book of Life…",
  "Installing year 5787…",
];

export default function Scan({ onComplete, hold = false }) {
  const [visibleLines, setVisibleLines] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setVisibleLines((prev) => {
        if (prev >= scanLines.length) {
          clearInterval(interval);
          return prev;
        }
        return prev + 1;
      });
    }, 1400);

    return () => clearInterval(interval);
  }, []);

  /* Play retro music during scan (AudioContext unlocked by START UPDATE tap) */
  useEffect(() => {
    playLandingMusic();
    return () => stopLandingMusic();
  }, []);

  /* Wait for full video (8s) before advancing — skipped when held by the dev bar */
  useEffect(() => {
    if (hold) return undefined;
    const timeout = setTimeout(onComplete, 8000);
    return () => clearTimeout(timeout);
  }, [onComplete, hold]);

  return (
    <div className="screen scan">
      {/* Video is rendered at App level — overlay sits on top */}
      <div className="scan-video-overlay" />

      <div className="scan-content">
        <div className="scan-icon">
          <div className="scan-pulse" />
        </div>

        <div className="scan-dots" aria-hidden="true">
          <span className="scan-dot" />
          <span className="scan-dot" />
          <span className="scan-dot" />
        </div>

        <div className="scan-lines">
          {scanLines.map((line, i) => (
            <p
              key={i}
              className={`scan-line ${i < visibleLines ? "visible" : ""}`}
            >
              {line}
            </p>
          ))}
        </div>
      </div>
    </div>
  );
}
