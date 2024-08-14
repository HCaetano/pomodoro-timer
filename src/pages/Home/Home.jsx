import classNames from "classnames";

import React, { useRef, useState } from "react";
import { Timer } from "../../components";
import styles from "./home.module.css";

const DEFAULT_POMODORO_MINUTE = 1;
const DEFAULT_POMODORO_SECOND = 6;
const DEFAULT_BREAK_MINUTE = 0;
const DEFAULT_BREAK_SECOND = 5;

function Home() {
  const [minute, setMinute] = useState(DEFAULT_POMODORO_MINUTE);
  const [second, setSecond] = useState(DEFAULT_POMODORO_SECOND);
  const [pomodoroMinute, setPomodoroMinute] = useState(DEFAULT_POMODORO_MINUTE);
  const [pomodoroSecond, setPomodoroSecond] = useState(DEFAULT_POMODORO_SECOND);
  const [breakMinute, setBreakMinute] = useState(DEFAULT_BREAK_MINUTE);
  const [breakSecond, setBreakSecond] = useState(DEFAULT_BREAK_SECOND);
  const [isRunning, setIsRunning] = useState(false);
  const [isPomodoroActive, setIsPomodoroActive] = useState(true);
  const [isBreakActive, setIsBreakActive] = useState(false);
  const [pomodoroCycles, setPomodoroCycles] = useState(0);
  const [shortBreakCycles, setShortBreakCycles] = useState(0);

  console.log(pomodoroCycles, shortBreakCycles);

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

  const resetTimer = () => {
    setIsRunning(false);
    setMinute(DEFAULT_POMODORO_MINUTE);
    setSecond(DEFAULT_POMODORO_SECOND);
    setPomodoroMinute(DEFAULT_POMODORO_MINUTE);
    setPomodoroSecond(DEFAULT_POMODORO_SECOND);
    setBreakMinute(DEFAULT_BREAK_MINUTE);
    setBreakSecond(DEFAULT_BREAK_SECOND);
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

  // useEffect(() => {
  //   if (pomodoroCycles === 2) {
  //     setMinute(0);
  //     setSecond(9);
  //   }
  // }, [pomodoroCycles]);

  const handleEndOfCycle = () => {
    playSound();
    // resetTimer();

    if (isPomodoroActive) {
      setPomodoroCycles((prevPomodoroCycles) => prevPomodoroCycles + 1);
      handleActiveInactiveButtons("break");

      setIsRunning(false);
      setMinute(DEFAULT_BREAK_MINUTE);
      setSecond(DEFAULT_BREAK_SECOND);
      setPomodoroMinute(DEFAULT_POMODORO_MINUTE);
      setPomodoroSecond(DEFAULT_POMODORO_SECOND);
      setBreakMinute(DEFAULT_BREAK_MINUTE);
      setBreakSecond(DEFAULT_BREAK_SECOND);
    } else {
      setShortBreakCycles((prevBreakCycles) => prevBreakCycles + 1);
      handleActiveInactiveButtons("pomodoro");

      setIsRunning(false);
      setMinute(DEFAULT_POMODORO_MINUTE);
      setSecond(DEFAULT_POMODORO_SECOND);
      setPomodoroMinute(DEFAULT_POMODORO_MINUTE);
      setPomodoroSecond(DEFAULT_POMODORO_SECOND);
      setBreakMinute(DEFAULT_BREAK_MINUTE);
      setBreakSecond(DEFAULT_BREAK_SECOND);
    }
  };

  // const handleEndOfCycle = () => {
  //   setIsRunning(false);

  //   if (isPomodoroActive) {
  //     setIsPomodoroActive(false);
  //     setIsBreakActive(true);
  //     setPomodoroCycles((prevPomodoroCycles) => prevPomodoroCycles + 1);
  //   } else {
  //     setMinute(2);
  //     setIsBreakActive(false);
  //     setIsPomodoroActive(true);
  //     setShortBreakCycles((prevBreakCycles) => prevBreakCycles + 1);
  //   }
  // };

  return (
    <section className="flex h-screen">
      <section className="flex h-screen w-1/2 flex-col items-center">
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
        <section className="flex items-center gap-10">
          <button className="btn w-fit" onClick={toggleTimer}>
            {isRunning ? "Pause" : "Start"}
          </button>
          <button
            className="btn w-fit"
            onClick={() => {
              resetTimer();
              setIsPomodoroActive(true);
              setIsBreakActive(false);
            }}
          >
            Stop
          </button>
          <audio ref={audioRef} src="/zen-gong.mp3" />
        </section>
        {/* <section>
          <p>Pomodoro cycles: {pomodoroCycles}</p>
          <p>Short break cycles: {shortBreakCycles}</p>
        </section> */}
      </section>
      <section className="flex h-screen w-1/2 flex-col items-center">
        {/* hi */}
        {/* <NewComponent /> */}
      </section>
    </section>
  );
}

export default Home;
