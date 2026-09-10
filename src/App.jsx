import { useState, useCallback, useRef } from "react";
import Landing from "./components/Landing";
import Scan from "./components/Scan";
import Question from "./components/Question";
import Result from "./components/Result";
import Final from "./components/Final";
import RetroBackground from "./components/RetroBackground";
import questions from "./data/questions";
import "./styles.css";

export default function App() {
  const [screen, setScreen] = useState("landing");
  const [questionIndex, setQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [transitioning, setTransitioning] = useState(false);

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

  /* Answer handler — last question starts final video immediately */
  const handleAnswer = useCallback(
    (isCorrect) => {
      if (isCorrect) setScore((s) => s + 1);
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
        transition("result");
      }
    },
    [questionIndex, transition]
  );

  /* Final phase 4 — hide video, show photo */
  const handleFinalPhaseChange = useCallback((phase) => {
    if (phase >= 4) {
      setFinalVideoVisible(false);
    }
  }, []);

  /* Replay — hide everything, reset */
  const handleReplay = useCallback(() => {
    setFinalVideoVisible(false);
    setScanVideoVisible(false);
    setTransitioning(true);
    setTimeout(() => {
      setScreen("landing");
      setQuestionIndex(0);
      setScore(0);
      setTransitioning(false);
    }, 400);
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
          <Scan onComplete={handleScanComplete} />
        )}
        {screen === "questions" && (
          <Question key={questionIndex} index={questionIndex} onAnswer={handleAnswer} />
        )}
        {screen === "result" && (
          <Result
            score={score}
            total={questions.length}
            onComplete={() => transition("final")}
          />
        )}
        {screen === "final" && (
          <Final onReplay={handleReplay} onPhaseChange={handleFinalPhaseChange} />
        )}
      </div>
    </div>
  );
}
