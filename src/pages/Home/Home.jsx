import classNames from "classnames";

import React, { useRef, useState } from "react";
import Modal from "react-modal";
import { Timer } from "../../components";
import styles from "./home.module.css";

const DEFAULT_POMODORO_MINUTE = 1;
const DEFAULT_POMODORO_SECOND = 6;
const DEFAULT_SHORT_BREAK_MINUTE = 0;
const DEFAULT_SHORT_BREAK_SECOND = 5;
const DEFAULT_LONG_BREAK_MINUTE = 0;
const DEFAULT_LONG_BREAK_SECOND = 10;

Modal.setAppElement("#root");

const alarmsMap = [
  {
    id: "e3b0c442-98fc-462d-a1e8-3bf0bb407ad5",
    name: "Birds chirping",
    src: "/alarms/birds-chirping.mp3"
  },
  {
    id: "d0f5c79b-7bfb-4d1c-9837-4a7ffab39175",
    name: "Game show winner",
    src: "/alarms/game-show-winner-bell.mp3"
  },
  {
    id: "4d92517f-e30b-4f19-9e84-0047d9c94d7e",
    name: "Hotel desk bell",
    src: "/alarms/hotel-desk-bell.mp3"
  },
  {
    id: "0e7cfb6a-87a5-4374-a3cc-2a1ecbb2ef73",
    name: "Large gong",
    src: "/alarms/large-gong.mp3"
  },
  {
    id: "c84f98d7-93f0-49d2-8c58-752a767d2402",
    name: "Small gong",
    src: "/alarms/small-gong.mp3"
  },
  {
    id: "617bdd67-589f-4e27-94ad-d8d3994c1c29",
    name: "Police siren",
    src: "/alarms/police-siren.mp3"
  },
  {
    id: "89e2a07f-fc7d-4c56-bc5a-024d21bbfc57",
    name: "Train steam whistle",
    src: "/alarms/train-steam-whistle.mp3"
  }
];
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
  const [modalIsOpen, setIsOpen] = useState(false);
  const [alarmSource, setAlarmSource] = useState("/alarms/small-gong.mp3");

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

  const playSound = (soundUrl = alarmSource) => {
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

        handleActiveInactiveButtons("break");
        resetTimer("break", updatedCycles);

        return updatedCycles;
      });
    } else {
      handleActiveInactiveButtons("pomodoro");
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
              {alarmsMap.map((alarm, index) => (
                <div
                  className={`flex justify-between py-4 ${index !== alarmsMap.length - 1 ? "border-b border-gray-300" : ""}`}
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
                      onClick={() => setAlarmSource(alarm.src)}
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
      <footer>hi</footer>
    </section>
  );
}

export default Home;
