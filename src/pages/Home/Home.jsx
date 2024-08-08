import classNames from "classnames";

import React, { useRef, useState } from "react";
import { Timer } from "../../components";

function Home() {
  const [minute, setMinute] = useState(1);
  const [second, setSecond] = useState(6);
  // const [pomodoroMinute, setPomodoroMinute] = useState(2);
  // const [pomodoroSecond, setPomodoroSecond] = useState(6);
  // const [breakMinute, setBreakMinute] = useState(0);
  // const [breakSecond, setBreakSecond] = useState(5);
  const [isRunning, setIsRunning] = useState(false);
  // const [isPomodoroActive, setIsPomodoroActive] = useState(true);
  // const [isBreakActive, setIsBreakActive] = useState(false);
  // const [pomodoroCycles, setPomodoroCycles] = useState(0);
  // const [shortBreakCycles, setShortBreakCycles] = useState(0);

  const audioRef = useRef(null);

  // useEffect(() => {
  //   if (isRunning) {
  //     const decrement = () => {
  //       setSecond((prevSecond) => prevSecond - 1);
  //     };

  //     const intervalId = setInterval(decrement, 1000);

  //     return () => {
  //       clearInterval(intervalId);
  //     };
  //   }
  // }, [isRunning, minute, second]);

  // useEffect(() => {
  //   setMinute((prevMinute) => {
  //     if (second === -1) {
  //       setSecond(6);

  //       return prevMinute - 1;
  //     }

  //     return prevMinute;
  //   });
  // }, [minute, second]);

  // const handleActiveInactiveButtons = (name) => {
  //   setIsRunning(false);

  //   if (name === "pomodoro") {
  //     setIsPomodoroActive(true);
  //     setIsBreakActive(false);
  //     setBreakMinute(minute);
  //     setBreakSecond(second);
  //     setMinute(pomodoroMinute);
  //     setSecond(pomodoroSecond);
  //   } else {
  //     setIsBreakActive(true);
  //     setIsPomodoroActive(false);
  //     setPomodoroMinute(minute);
  //     setPomodoroSecond(second);
  //     setMinute(breakMinute);
  //     setSecond(breakSecond);
  //   }
  // };

  const toggleTimer = () => {
    setIsRunning(!isRunning);
  };

  const resetTimer = () => {
    setIsRunning(false);
    setMinute(1);
    setSecond(6);
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

  // const setBreakTimer = () => {
  //   setMinute(breakMinute);
  //   setSecond(breakSecond);
  // };

  // const setPomodoroTimer = () => {
  //   setMinute(pomodoroMinute);
  //   setSecond(pomodoroSecond);
  // };

  const playSound = () => {
    audioRef.current.play();
  };

  // useEffect(() => {
  //   if (minute === 0 && second === -1) {
  //     handleEndOfCycle();
  //     playSound();
  //   }
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [minute, second]);

  // useEffect(() => {
  //   if (pomodoroCycles === 2) {
  //     setMinute(0);
  //     setSecond(9);
  //   }
  // }, [pomodoroCycles]);

  // /////////////
  // const handleSessionComplete = () => {
  //   if (sessionType === 'work') {
  //     setSessionType('shortBreak');
  //   } else if (sessionType === 'shortBreak') {
  //     setSessionType('work');
  //   }
  //   // Increment the key to force the Timer component to re-mount
  //   setKey(prevKey => prevKey + 1);
  // };

  const handleEndOfCycle = () => {
    playSound();
    resetTimer();
  };

  return (
    <section className="flex h-screen">
      <section className="flex h-screen w-1/2 flex-col items-center">
        <section className="mt-20 flex gap-10">
          <button
            className={classNames("btn", "flex", {
              // [styles["button-active"]]: isPomodoroActive,
              // [styles["button-inactive"]]: !isPomodoroActive
            })}
            // onClick={() => {
            //   handleActiveInactiveButtons("pomodoro");
            //   setPomodoroTimer();
            // }}
          >
            Pomodoro
          </button>
          <button
            className={classNames("btn", "flex", {
              // [styles["button-active"]]: isBreakActive,
              // [styles["button-inactive"]]: !isBreakActive
            })}
            // onClick={() => {
            //   handleActiveInactiveButtons("break");
            //   setBreakTimer();
            // }}
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
        {/* <Timer isRunning={isRunning} minute={minute} second={second} /> */}
        <section className="flex items-center gap-10">
          {/* <button className="btn w-fit">Start</button> */}
          <button className="btn w-fit" onClick={toggleTimer}>
            {isRunning ? "Pause" : "Start"}
          </button>
          {/* <button className="btn w-fit">Stop</button> */}
          <button className="btn w-fit" onClick={resetTimer}>
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
