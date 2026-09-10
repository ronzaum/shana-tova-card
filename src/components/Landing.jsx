import { useState } from "react";
import { playPress } from "../sounds";

export default function Landing({ onStart }) {
  const [pressed, setPressed] = useState(false);
  return (
    <div className="screen landing">
      <img src={`${import.meta.env.BASE_URL}landing-bg.jpg`} alt="" className="landing-bg-img" aria-hidden="true" />
      <div className="landing-overlay" />

      {/* TOP: Title + chips */}
      <div className="landing-top">
        <div className="landing-decor-bar">
          <span className="decor-chip">SYS ONLINE</span>
          <span className="decor-chip">TISHREI 1</span>
          <span className="decor-chip">YR 5787</span>
        </div>
        <h1 className="landing-title">NEW YEAR SYSTEM UPDATE</h1>
      </div>

      {/* BOTTOM: Subtitle, text, stats, button */}
      <div className="landing-bottom">
        <p className="landing-subtitle">Rosh Hashanah detected.</p>
        <p className="landing-text">
          Year 5787 is ready to install. Complete verification to unlock your
          next level.
        </p>

        <div className="landing-stats">
          <div className="stat-box">
            <span className="stat-label">THREAT</span>
            <span className="stat-value">HONEY</span>
          </div>
          <div className="stat-box">
            <span className="stat-label">YEAR</span>
            <span className="stat-value">5787</span>
          </div>
          <div className="stat-box">
            <span className="stat-label">STATUS</span>
            <span className="stat-value">SWEET</span>
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
