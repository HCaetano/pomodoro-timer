import React from "react";

const Timer = (props) => {
  const { minute, second } = props;

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
      </p>
    </div>
  );
};

export default Timer;
