import React, { useEffect, useState } from "react";
import "./App.css";

const App = () => {
  const [isRunning, setIsRunning] = useState(false);
  const [elapsedTime, setElapsedTime] = useState(0);

  const formatTime = (secs) => {
    const mins = Math.floor(secs / 60);
    const remainingSecs = secs % 60;
    return `${mins}:${remainingSecs < 10 ? "0" : ""}${remainingSecs}`;
  };

  const toggleTime = () => {
    setIsRunning((prevIsRunning) => !prevIsRunning);
  };

  const reset = () => {
    setIsRunning(false);
    setElapsedTime(0);
  };

  useEffect(() => {
    let intervalId;

    if (isRunning) {
      intervalId = setInterval(() => {
        setElapsedTime((prevElapsedTime) => prevElapsedTime + 1);
      }, 1000);
    } else {
      clearInterval(intervalId);
    }

    return () => {
      clearInterval(intervalId);
    };
  }, [isRunning]);

  return (
    <div className="stopwatch-container">
      <h1 className="stopwatch-title">Stopwatch</h1>
      <p className="stopwatch-time">Time: {formatTime(elapsedTime)}</p>
      <div className="stopwatch-buttons">
        <button className="stopwatch-button" onClick={toggleTime}>
          {isRunning ? "Stop" : "Start"}
        </button>
        <button
          className="stopwatch-button"
          onClick={reset}
          disabled={!isRunning && elapsedTime === 0}
        >
          Reset
        </button>
      </div>
    </div>
  );
};

export default App;
