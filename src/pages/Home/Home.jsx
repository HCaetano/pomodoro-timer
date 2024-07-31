import classNames from "classnames";
import React, { useEffect, useRef, useState } from "react";
import { Timer } from "../../components/Timer";
import styles from "./home.module.css";

function Home() {
  const [minute, setMinute] = useState(2);
  const [second, setSecond] = useState(6);
  const [pomodoroMinute] = useState(2);
  const [pomodoroSecond] = useState(6);
  // const [pomodoroMinute, setPomodoroMinute] = useState(2);
  // const [pomodoroSecond, setPomodoroSecond] = useState(6);
  const [breakMinute] = useState(0);
  const [breakSecond] = useState(5);
  // const [breakMinute, setBreakMinute] = useState(2);
  // const [breakSecond, setBreakSecond] = useState(6);
  const [isRunning, setIsRunning] = useState(false);
  const [isPomodoroActive, setIsPomodoroActive] = useState(true);
  const [isBreakActive, setIsBreakActive] = useState(false);
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
        setSecond(6);

        return prevMinute - 1;
      }

      return prevMinute;
    });
  }, [minute, second]);

  const handleActiveInactiveButtons = (name) => {
    console.log(name);
    console.log("pomodoro", isPomodoroActive);
    console.log("break", isBreakActive);

    if (name === "pomodoro") {
      setIsBreakActive(true);
      setIsPomodoroActive(false);
    } else {
      setIsPomodoroActive(true);
      setIsBreakActive(false);
    }

    // handle active inactive
    // receives name of button
    // sets active inactive accordingly
  };

  const toggleTimer = () => {
    setIsRunning(!isRunning);
  };

  const stopTimer = () => {
    setIsRunning(false);
    setMinute(2);
    setSecond(6);
  };

  const handleEndOfCycle = () => {
    setIsRunning(false);

    if (isPomodoroActive) {
      setMinute(0);
      setSecond(5);
      setIsPomodoroActive(false);
    } else {
      setMinute(2);
      setSecond(6);
      setIsBreakActive(false);
    }
  };

  const setBreakTimer = () => {
    setMinute(breakMinute);
    setSecond(breakSecond);
  };

  const setPomodoroTimer = () => {
    setMinute(pomodoroMinute);
    setSecond(pomodoroSecond);
  };

  const playSound = () => {
    audioRef.current.play();
  };

  useEffect(() => {
    if (minute === 0 && second === -1) {
      handleEndOfCycle();
      playSound();
      // setIsPomodoroActive(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [minute, second]);

  return (
    <section className="flex h-screen">
      <section className="flex h-screen w-1/2 flex-col items-center">
        <section className="mt-20 flex gap-10">
          <button
            className={classNames("btn", "flex", {
              [styles["button-active"]]: isPomodoroActive,
              [styles["button-inactive"]]: !isPomodoroActive
            })}
            disabled={isPomodoroActive}
            onClick={() => {
              handleActiveInactiveButtons("pomodoro");
              setPomodoroTimer();
            }}
          >
            Pomodoro
          </button>
          <button
            className={classNames("btn", "flex", {
              [styles["button-active"]]: isBreakActive,
              [styles["button-inactive"]]: !isBreakActive
            })}
            disabled={isBreakActive}
            onClick={() => {
              handleActiveInactiveButtons("break");
              setBreakTimer();
            }}
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
