import React, { useEffect, useRef, useState } from "react";
import { Timer } from "../../components/Timer";

function Home() {
  const [minute, setMinute] = useState(2);
  const [second, setSecond] = useState(12);
  const [isRunning, setIsRunning] = useState(false);
  const audioRef = useRef(null);

  useEffect(() => {
    if (isRunning) {
      const decrement = () => {
        setSecond((prevSecond) => prevSecond - 1);
      };

      const intervalId = setInterval(decrement, 1000);

      return () => {
        clearInterval(intervalId);
      };
    }
  }, [isRunning, minute, second]);

  useEffect(() => {
    setMinute((prevMinute) => {
      if (second === -1) {
        setSecond(12);

        return prevMinute - 1;
      }

      return prevMinute;
    });
  }, [minute, second]);

  const toggleTimer = () => {
    setIsRunning(!isRunning);
  };

  const stopTimer = () => {
    toggleTimer();
    setMinute(24);
    setSecond(12);
  };

  const playSound = () => {
    audioRef.current.play();
  };

  useEffect(() => {
    if (minute === 0 && second === -1) {
      stopTimer();
      playSound();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [minute, second]);

  return (
    <div>
      <h1 className="text-3xl font-bold underline">hi</h1>
      <Timer isRunning={isRunning} minute={minute} second={second} />
      <button onClick={toggleTimer}>{isRunning ? "Pause" : "Start"}</button>
      <button onClick={stopTimer}>Stop</button>
      <audio ref={audioRef} src="/zen-gong.mp3" />
    </div>
  );
}

export default Home;
