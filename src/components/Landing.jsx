import { useState } from "react";
import { playPress } from "../sounds";

/* Subtle floating Stars of David over the landing image */
const stars = [
  { top: "14%", left: "6%", size: 22, delay: "0s" },
  { top: "9%", right: "8%", size: 16, delay: "1.1s" },
  { top: "38%", right: "4%", size: 26, delay: "0.6s" },
  { top: "52%", left: "3%", size: 18, delay: "1.7s" },
  { top: "31%", left: "44%", size: 14, delay: "2.3s" },
];

export default function Landing({ onStart }) {
  const [pressed, setPressed] = useState(false);
  return (
    <div className="screen landing">
      <img src={`${import.meta.env.BASE_URL}landing-bg.jpg`} alt="" className="landing-bg-img" aria-hidden="true" />
      <div className="landing-overlay" />

      <div className="landing-stars" aria-hidden="true">
        {stars.map((s, i) => (
          <span
            key={i}
            className="magen"
            style={{ ...s, fontSize: s.size, animationDelay: s.delay }}
          >
            ✡
          </span>
        ))}
      </div>

      {/* TOP: Chips + one-line title + Hebrew greeting */}
      <div className="landing-top">
        <div className="landing-decor-bar">
          <span className="decor-chip">✡ SYS ONLINE</span>
          <span className="decor-chip he-chip">א׳ תשרי</span>
          <span className="decor-chip he-chip">תשפ״ז</span>
        </div>
        <h1 className="landing-title">NEW YEAR SYSTEM UPDATE</h1>
        <p className="landing-hebrew he">שנה טובה ומתוקה</p>
      </div>

      {/* BOTTOM: Subtitle, text, stats, button */}
      <div className="landing-bottom">
        <p className="landing-subtitle">Rosh Hashanah detected.</p>
        <p className="landing-festive he-body" aria-hidden="true">
          תפוח בדבש · רימון · שופר · חלה עגולה
        </p>
        <p className="landing-text">
          Year 5787 is ready to install. Complete verification to unlock your
          next level.
        </p>

        <div className="landing-stats">
          <div className="stat-box">
            <span className="stat-label">SHOFAR</span>
            <span className="stat-value">READY</span>
          </div>
          <div className="stat-box">
            <span className="stat-label">YEAR</span>
            <span className="stat-value">5787</span>
          </div>
          <div className="stat-box">
            <span className="stat-label">HONEY</span>
            <span className="stat-value">100%</span>
          </div>
        </div>

        <button
          className={`btn-primary btn-start ${pressed ? "btn-pressed" : ""}`}
          onTouchStart={() => setPressed(true)}
          onMouseDown={() => setPressed(true)}
          onTouchEnd={() => {
            setPressed(false);
            playPress();
            onStart();
          }}
          onMouseUp={() => {
            setPressed(false);
            playPress();
            onStart();
          }}
        >
          START UPDATE
        </button>
      </div>
    </div>
  );
}
