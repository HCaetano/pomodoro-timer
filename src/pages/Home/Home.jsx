import classNames from "classnames";
import React, { useEffect, useRef, useState } from "react";
import { Timer } from "../../components/Timer";
import styles from "./home.module.css";

function Home() {
  const [minute, setMinute] = useState(2);
  const [second, setSecond] = useState(12);
  const [isRunning, setIsRunning] = useState(false);
  const [isDisabled, setIsDisabled] = useState(true);
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
    setIsRunning(false);
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
      setIsDisabled(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [minute, second]);

  return (
    <section className="flex h-screen">
      <section className="flex h-screen w-1/2 flex-col items-center">
        <section className="mt-20 flex gap-10">
          <button
            className={classNames("btn", "flex", {
              [styles["button-enabled"]]: isDisabled,
              [styles["button-disabled"]]: !isDisabled
            })}
          >
            Pomodoro
          </button>
          <button
            className={classNames("btn", "flex", {
              [styles["button-enabled"]]: !isDisabled,
              [styles["button-disabled"]]: isDisabled
            })}
            disabled={isDisabled}
          >
            Break
          </button>
        </section>
        <Timer isRunning={isRunning} minute={minute} second={second} />
        <section className="flex items-center gap-10">
          <button className="btn w-fit" onClick={toggleTimer}>
            {isRunning ? "Pause" : "Start"}
          </button>
          <button className="btn w-fit" onClick={stopTimer}>
            Stop
          </button>
          <audio ref={audioRef} src="/zen-gong.mp3" />
        </section>
      </section>
      <section className="flex h-screen w-1/2 flex-col items-center">
        hi
      </section>
    </section>
  );
}

export default Home;
