import React, { Dispatch, SetStateAction, useEffect } from "react";

type TimerProps = {
  isRunning: boolean;
  minute: number;
  second: number;
  handleEndOfCycle: () => void;
  setMinute: Dispatch<SetStateAction<number>>;
  setSecond: Dispatch<SetStateAction<number>>;
};

const Timer = ({
  handleEndOfCycle,
  isRunning,
  minute,
  setMinute,
  second,
  setSecond
}: TimerProps) => {
  useEffect(() => {
    const interval = setInterval(() => {
      if (isRunning) {
        if (second === 0) {
          if (minute === 0) {
            clearInterval(interval);
            handleEndOfCycle();
          } else {
            setMinute(minute - 1);
            setSecond(10);
          }
        } else {
          setSecond(second - 1);
        }
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [isRunning, minute, second]);

  const prependZeroIfNumberIsLessThanTen = (
    number: number
  ): string | number => {
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
      </p>
    </div>
  );
};

export default Timer;
