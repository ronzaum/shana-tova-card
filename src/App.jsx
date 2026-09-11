import { useState, useCallback, useRef } from "react";
import Landing from "./components/Landing";
import Scan from "./components/Scan";
import Question from "./components/Question";
import Final from "./components/Final";
import RetroBackground from "./components/RetroBackground";
import questions from "./data/questions";
import "./styles.css";

/*
 * Dev slide bar — visible only when the URL has ?dev.
 * IDs match slides-map.html: L, S, Q1–Q5, F0–F4.
 */
const DEV_MODE =
  typeof window !== "undefined" &&
  new URLSearchParams(window.location.search).has("dev");

const DEV_SLIDES = [
  "L",
  "S",
  ...questions.map((_, i) => `Q${i + 1}`),
  "F0",
  "F1",
  "F2",
  "F3",
  "F4",
];

export default function App() {
  const [screen, setScreen] = useState("landing");
  const [questionIndex, setQuestionIndex] = useState(0);
  const [transitioning, setTransitioning] = useState(false);

  /* Dev bar state — when devHold is true, Scan/Final timers are frozen */
  const [devHold, setDevHold] = useState(false);
  const [devFinalPhase, setDevFinalPhase] = useState(0);
  const [devSlide, setDevSlide] = useState("L");

  /*
   * Persistent video refs — always in the DOM so .play() can be called
   * synchronously in click handlers (iOS requires user gesture context).
   */
  const scanVideoRef = useRef(null);
  const finalVideoRef = useRef(null);

  /*
   * Video visibility is tracked as dedicated state, set IMMEDIATELY
   * in click handlers (not derived from screen state). This avoids
   * a 400ms gap where the video plays but is invisible.
   */
  const [scanVideoVisible, setScanVideoVisible] = useState(false);
  const [finalVideoVisible, setFinalVideoVisible] = useState(false);

  const transition = useCallback((nextScreen) => {
    setTransitioning(true);
    setTimeout(() => {
      setScreen(nextScreen);
      setTransitioning(false);
    }, 400);
  }, []);

  /* START SCAN — show + play video immediately, then transition */
  const handleStart = useCallback(() => {
    setDevHold(false);
    const vid = scanVideoRef.current;
    if (vid) {
      vid.currentTime = 0;
      vid.play();
    }
    setScanVideoVisible(true);
    transition("scan");
  }, [transition]);

  /* Scan complete — fade out video, then transition to questions */
  const handleScanComplete = useCallback(() => {
    setScanVideoVisible(false);
    transition("questions");
  }, [transition]);

  /* Answer handler — last question starts the final video and goes straight to Final */
  const handleAnswer = useCallback(() => {
    setDevHold(false);
    if (questionIndex < questions.length - 1) {
      setTransitioning(true);
      setTimeout(() => {
        setQuestionIndex((i) => i + 1);
        setTransitioning(false);
      }, 400);
    } else {
      const vid = finalVideoRef.current;
      if (vid) {
        vid.currentTime = 0;
        vid.play();
      }
      setFinalVideoVisible(true);
      transition("final");
    }
  }, [questionIndex, transition]);

  /* Final phase 4 — hide video, show photo */
  const handleFinalPhaseChange = useCallback((phase) => {
    if (phase >= 4) {
      setFinalVideoVisible(false);
    }
  }, []);

  /* Replay — hide everything, reset */
  const handleReplay = useCallback(() => {
    setDevHold(false);
    setFinalVideoVisible(false);
    setScanVideoVisible(false);
    setTransitioning(true);
    setTimeout(() => {
      setScreen("landing");
      setQuestionIndex(0);
      setTransitioning(false);
    }, 400);
  }, []);

  /* Dev jump — go straight to a slide, no fade, timers held */
  const devJump = useCallback((id) => {
    const scanVid = scanVideoRef.current;
    const finalVid = finalVideoRef.current;
    const stopAll = () => {
      scanVid?.pause();
      finalVid?.pause();
      setScanVideoVisible(false);
      setFinalVideoVisible(false);
    };

    setDevSlide(id);
    setTransitioning(false);

    if (id === "L") {
      stopAll();
      setDevHold(false);
      setQuestionIndex(0);
      setScreen("landing");
    } else if (id === "S") {
      finalVid?.pause();
      setFinalVideoVisible(false);
      if (scanVid) {
        scanVid.currentTime = 0;
        scanVid.play();
      }
      setScanVideoVisible(true);
      setDevHold(true);
      setScreen("scan");
    } else if (id.startsWith("Q")) {
      stopAll();
      setDevHold(false);
      setQuestionIndex(Number(id.slice(1)) - 1);
      setScreen("questions");
    } else if (id.startsWith("F")) {
      const phase = Number(id.slice(1));
      scanVid?.pause();
      setScanVideoVisible(false);
      if (phase < 4) {
        if (finalVid) {
          finalVid.currentTime = 0;
          finalVid.play();
        }
        setFinalVideoVisible(true);
      } else {
        finalVid?.pause();
        setFinalVideoVisible(false);
      }
      setDevFinalPhase(phase);
      setDevHold(true);
      setScreen("final");
    }
  }, []);

  return (
    <div className="app-container">
      <RetroBackground />

      {/* Persistent videos — constant z-index, only opacity toggles */}
      <video
        ref={scanVideoRef}
        className={`persistent-video ${scanVideoVisible ? "visible" : ""}`}
        src={`${import.meta.env.BASE_URL}transition.mp4`}
        playsInline
        loop
      />
      <video
        ref={finalVideoRef}
        className={`persistent-video ${finalVideoVisible ? "visible" : ""}`}
        src={`${import.meta.env.BASE_URL}identity-video.mp4`}
        playsInline
        loop
      />

      <div className={`screen-wrapper ${transitioning ? "fade-out" : "fade-in"}`}>
        {screen === "landing" && (
          <Landing onStart={handleStart} />
        )}
        {screen === "scan" && (
          <Scan onComplete={handleScanComplete} hold={devHold} />
        )}
        {screen === "questions" && (
          <Question key={questionIndex} index={questionIndex} onAnswer={handleAnswer} />
        )}
        {screen === "final" && (
          <Final
            key={devHold ? `dev-${devFinalPhase}` : "final"}
            onReplay={handleReplay}
            onPhaseChange={handleFinalPhaseChange}
            initialPhase={devHold ? devFinalPhase : 0}
            hold={devHold}
          />
        )}
      </div>

      {DEV_MODE && (
        <div className="dev-bar" aria-label="Dev slide jump">
          {DEV_SLIDES.map((id) => (
            <button
              key={id}
              type="button"
              className={`dev-btn ${devSlide === id ? "active" : ""}`}
              onClick={() => devJump(id)}
            >
              {id}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
