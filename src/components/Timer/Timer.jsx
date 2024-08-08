import React, { useEffect } from "react";

const Timer = (props) => {
  const { handleEndOfCycle, isRunning, minute, setMinute, second, setSecond } =
    props;
  console.log(minute, second);

  // const [minutes, setMinutes] = useState(minute);
  // const [seconds, setSeconds] = useState(second);

  useEffect(() => {
    const interval = setInterval(() => {
      if (isRunning) {
        if (second === 0) {
          if (minute === 0) {
            clearInterval(interval);
            // onSessionComplete();
            handleEndOfCycle();
          } else {
            setMinute(minute - 1);
            setSecond(10);
            // setMinutes(minutes - 1);
            // setSeconds(10);
            // setSeconds(59);
          }
        } else {
          setSecond(second - 1);
        }
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [isRunning, minute, second]);
  // }, [isRunning, minutes, seconds]);

  const prependZeroIfNumberIsLessThanTen = (number) => {
    if (number < 10) {
      return `0${number}`;
    }

    return number;
  };

  return (
    <div className="flex h-52 items-center justify-center">
      <p className="text-6xl">
        {prependZeroIfNumberIsLessThanTen(minute)}:
        {prependZeroIfNumberIsLessThanTen(second)}
        {/* {prependZeroIfNumberIsLessThanTen(minutes)}:
        {prependZeroIfNumberIsLessThanTen(seconds)} */}
      </p>
    </div>
  );
};

export default Timer;
