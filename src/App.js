import { useEffect, useRef, useState } from "react";

function App() {
  const [minute, setMinute] = useState(2);
  const [second, setSecond] = useState(12);
  const [isRunning, setIsRunning] = useState(false);
  const audioRef = useRef(null);

  useEffect(() => {
    if (isRunning) {
      const decrement = () => {
        setSecond((prevCount) => prevCount - 1);
      };

      const intervalId1 = setInterval(decrement, 1000);

      return () => {
        clearInterval(intervalId1);
      };
    }
  }, [isRunning, minute, second]);

  useEffect(() => {
    setMinute((prevCount) => {
      console.log("second", second);
      console.log("minute", minute);
      if (second === -1) {
        setSecond(12);

        return prevCount - 1;
      }

      return prevCount;
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

  const HandleTimer = (props) => {
    const { minute, second } = props;

    const prependZeroIfNumberIsLessThanTen = (number) => {
      if (number < 10) {
        return `0${number}`;
      }

      return number;
    };

    return (
      <div>
        {prependZeroIfNumberIsLessThanTen(minute)}:{prependZeroIfNumberIsLessThanTen(second)}
      </div>
    );
  };

  return (
    <div>
      hi <HandleTimer isRunning={isRunning} minute={minute} second={second} />
      <button onClick={toggleTimer}>{isRunning ? "Pause" : "Start"}</button>
      <button onClick={stopTimer}>Stop</button>
      <audio ref={audioRef} src="/zen-gong.mp3" />
    </div>
  );
}

export default App;
