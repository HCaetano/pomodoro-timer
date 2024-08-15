import classNames from "classnames";

import React, { useRef, useState } from "react";
import { Timer } from "../../components";
import styles from "./home.module.css";

const DEFAULT_POMODORO_MINUTE = 1;
const DEFAULT_POMODORO_SECOND = 6;
const DEFAULT_SHORT_BREAK_MINUTE = 0;
const DEFAULT_SHORT_BREAK_SECOND = 5;
const DEFAULT_LONG_BREAK_MINUTE = 0;
const DEFAULT_LONG_BREAK_SECOND = 10;

function Home() {
  const [minute, setMinute] = useState(DEFAULT_POMODORO_MINUTE);
  const [second, setSecond] = useState(DEFAULT_POMODORO_SECOND);
  const [pomodoroMinute, setPomodoroMinute] = useState(DEFAULT_POMODORO_MINUTE);
  const [pomodoroSecond, setPomodoroSecond] = useState(DEFAULT_POMODORO_SECOND);
  const [breakMinute, setBreakMinute] = useState(DEFAULT_SHORT_BREAK_MINUTE);
  const [breakSecond, setBreakSecond] = useState(DEFAULT_SHORT_BREAK_SECOND);
  const [isRunning, setIsRunning] = useState(false);
  const [isPomodoroActive, setIsPomodoroActive] = useState(true);
  const [isBreakActive, setIsBreakActive] = useState(false);
  const [pomodoroCycles, setPomodoroCycles] = useState(0);

  const audioRef = useRef(null);

  const handleActiveInactiveButtons = (name) => {
    setIsRunning(false);

    if (name === "pomodoro") {
      setIsPomodoroActive(true);
      setIsBreakActive(false);
      setBreakMinute(minute);
      setBreakSecond(second);
      setMinute(pomodoroMinute);
      setSecond(pomodoroSecond);
    } else {
      setIsBreakActive(true);
      setIsPomodoroActive(false);
      setPomodoroMinute(minute);
      setPomodoroSecond(second);
      setMinute(breakMinute);
      setSecond(breakSecond);
    }
  };

  const toggleTimer = () => {
    setIsRunning(!isRunning);
  };

  const resetTimer = (nextCycleIs, currentCycleCounter) => {
    setIsRunning(false);

    if (nextCycleIs === "break") {
      if (currentCycleCounter === 4) {
        setMinute(DEFAULT_LONG_BREAK_MINUTE);
        setSecond(DEFAULT_LONG_BREAK_SECOND);
        setBreakMinute(DEFAULT_LONG_BREAK_MINUTE);
        setBreakSecond(DEFAULT_LONG_BREAK_SECOND);
        setPomodoroCycles(0);
      } else {
        setMinute(DEFAULT_SHORT_BREAK_MINUTE);
        setSecond(DEFAULT_SHORT_BREAK_SECOND);
        setBreakMinute(DEFAULT_SHORT_BREAK_MINUTE);
        setBreakSecond(DEFAULT_SHORT_BREAK_SECOND);
      }
    } else {
      setMinute(DEFAULT_POMODORO_MINUTE);
      setSecond(DEFAULT_POMODORO_SECOND);
    }

    setPomodoroMinute(DEFAULT_POMODORO_MINUTE);
    setPomodoroSecond(DEFAULT_POMODORO_SECOND);
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

  const handleEndOfCycle = () => {
    playSound();
    setIsRunning(false);

    if (isPomodoroActive) {
      setPomodoroCycles((prevPomodoroCycles) => {
        const updatedCycles = prevPomodoroCycles + 1;

        handleActiveInactiveButtons("break");
        resetTimer("break", updatedCycles);

        return updatedCycles;
      });
    } else {
      handleActiveInactiveButtons("pomodoro");
      resetTimer("pomodoro");
    }
  };

  return (
    <section className="flex h-screen flex-col items-center">
      <section className="mt-20 flex gap-10">
        <button
          className={classNames("btn", "flex", {
            [styles["button-active"]]: isPomodoroActive,
            [styles["button-inactive"]]: !isPomodoroActive
          })}
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
          onClick={() => {
            handleActiveInactiveButtons("break");
            setBreakTimer();
          }}
        >
          Break
        </button>
      </section>
      <Timer
        isRunning={isRunning}
        minute={minute}
        setMinute={setMinute}
        second={second}
        setSecond={setSecond}
        handleEndOfCycle={handleEndOfCycle}
      />
      <section className="flex flex-col items-center gap-10">
        <section className="flex items-center gap-10">
          <button className="btn w-fit" onClick={toggleTimer}>
            {isRunning ? "Pause" : "Start"}
          </button>
          <button
            className="btn w-fit"
            onClick={() => {
              resetTimer("pomodoro");
              setIsPomodoroActive(true);
              setIsBreakActive(false);
              setPomodoroCycles(0);
            }}
          >
            Stop
          </button>
          <audio ref={audioRef} src="/zen-gong.mp3" />
        </section>
        <p>Pomodoro cycles: {pomodoroCycles}</p>
      </section>
    </section>
  );
}

export default Home;
