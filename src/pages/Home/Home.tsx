import classNames from "classnames";

import React, { useRef, useState } from "react";
import Modal from "react-modal";
import { Timer } from "../../components";
import {
  alarms,
  DEFAULT_LONG_BREAK_MINUTE,
  DEFAULT_LONG_BREAK_SECOND,
  DEFAULT_POMODORO_MINUTE,
  DEFAULT_POMODORO_SECOND,
  DEFAULT_SHORT_BREAK_MINUTE,
  DEFAULT_SHORT_BREAK_SECOND
} from "../../utils/constants";
import styles from "./home.module.css";

Modal.setAppElement("#root");

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    width: "90%",
    maxWidth: "600px"
  }
};

function Home() {
  const [minute, setMinute] = useState<number>(DEFAULT_POMODORO_MINUTE);
  const [second, setSecond] = useState<number>(DEFAULT_POMODORO_SECOND);
  const [pomodoroMinute, setPomodoroMinute] = useState<number>(
    DEFAULT_POMODORO_MINUTE
  );
  const [pomodoroSecond, setPomodoroSecond] = useState<number>(
    DEFAULT_POMODORO_SECOND
  );
  const [breakMinute, setBreakMinute] = useState<number>(
    DEFAULT_SHORT_BREAK_MINUTE
  );
  const [breakSecond, setBreakSecond] = useState<number>(
    DEFAULT_SHORT_BREAK_SECOND
  );
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [isPomodoroActive, setIsPomodoroActive] = useState<boolean>(true);
  const [isBreakActive, setIsBreakActive] = useState<boolean>(false);
  const [pomodoroCycles, setPomodoroCycles] = useState<number>(0);
  const [modalIsOpen, setIsOpen] = useState<boolean>(false);
  const [alarmSource, setAlarmSource] = useState<string>(alarms[0].src);

  const audioRef = useRef<HTMLAudioElement | null>(null);

  const handleChangesPomodoroBreak = (name: string) => {
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

  const resetTimer = (nextCycleIs: string, currentCycleCounter?: number) => {
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
      setBreakMinute(DEFAULT_SHORT_BREAK_MINUTE);
      setBreakSecond(DEFAULT_SHORT_BREAK_SECOND);
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

  const playSound = (soundUrl: string = alarmSource) => {
    if (audioRef.current) {
      audioRef.current.src = soundUrl;
      audioRef.current.play();
    }
  };

  const handleEndOfCycle = () => {
    playSound();
    setIsRunning(false);

    if (isPomodoroActive) {
      setPomodoroCycles((prevPomodoroCycles) => {
        const updatedCycles = prevPomodoroCycles + 1;

        handleChangesPomodoroBreak("break");
        resetTimer("break", updatedCycles);

        return updatedCycles;
      });
    } else {
      handleChangesPomodoroBreak("pomodoro");
      resetTimer("pomodoro");
    }
  };

  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

  return (
    <section className="flex h-screen flex-col p-4">
      <button className="ml-auto" onClick={openModal}>
        <img
          src="settings-menu-icon.png"
          alt="Settings menu button"
          height={30}
          width={30}
        />
      </button>
      <section className="mx-auto mt-10 flex gap-10 sm:mt-20">
        <button
          className={classNames("btn", "flex", {
            [styles["button-active"]]: isPomodoroActive,
            [styles["button-inactive"]]: !isPomodoroActive
          })}
          onClick={() => {
            handleChangesPomodoroBreak("pomodoro");
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
            handleChangesPomodoroBreak("break");
            setBreakTimer();
          }}
        >
          Break
        </button>
        <Modal
          isOpen={modalIsOpen}
          onRequestClose={closeModal}
          style={customStyles}
        >
          <div className="relative flex flex-col items-center gap-5 sm:gap-7">
            <section className="flex items-center">
              <h2>Settings</h2>
              <button
                className="close-button absolute end-0 text-[#007bff] hover:text-[#0056b3]"
                onClick={closeModal}
              >
                X
              </button>
            </section>

            <p>Choose an alarm sound</p>
            <div className="flex w-full flex-col gap-2">
              {alarms.map((alarm, index) => (
                <div
                  className={`flex justify-between py-4 ${index !== alarms.length - 1 ? "border-b border-gray-300" : ""}`}
                  key={alarm.id}
                >
                  <p>{alarm.name}</p>
                  <div className="flex gap-2">
                    <button onClick={() => playSound(alarm.src)}>
                      <img
                        src="play-button.png"
                        alt={`Play ${alarm.name} sound`}
                        width={24}
                      />
                    </button>
                    <button
                      className="h-6 w-6"
                      onClick={() => {
                        setAlarmSource(alarm.src);
                        closeModal();
                      }}
                    >
                      <img
                        src="check-button.png"
                        alt={`Set ${alarm.name} sound as default`}
                      />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Modal>
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
          <audio ref={audioRef} src={alarmSource} />
        </section>
        <p>Pomodoro cycles: {pomodoroCycles}</p>
      </section>
      <footer className="absolute bottom-0 left-0 flex h-20 w-full flex-col items-center gap-1 bg-[#0056b3] p-3 text-xs text-white">
        <p>
          Icons by{" "}
          <a className="text-[#b3d7ff]" href="https://www.freepik.com/">
            Freepik
          </a>
        </p>
        <p>
          Alarm sounds by{" "}
          <a className="text-[#b3d7ff]" href="https://pixabay.com/">
            Pixabay
          </a>
        </p>
        <p>
          Made by{" "}
          <a
            className="text-[#b3d7ff]"
            href="https://www.linkedin.com/in/havyner-caetano/"
          >
            Havyner Caetano
          </a>
        </p>
      </footer>
    </section>
  );
}

export default Home;
